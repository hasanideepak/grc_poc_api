import jwt from 'jsonwebtoken';
import { insertSql, selectSql } from './pg_helper.js';
import email_service from './email_service.js';


export const createAuthToken = async (user_id, schema_nm) => {
    let token = jwt.sign({ sub: user_id }, '926D96C90030DD58429D2751AC1BDBBC', { expiresIn: '60m', algorithm: 'HS512' });
    let sql = `INSERT INTO ${schema_nm}.user_session(user_id,session_time,session_timeout,recent_activity_time,token) VALUES(${user_id},NOW(),60,NOW(),'${token}')`;
    let resp = await insertSql(sql);
    return token;
}

export const generateOTP = async (user_id, email, user_name, schema_nm) => {
    let otp = Math.floor(100000 + Math.random() * 900000);
    let sql = `insert into ${schema_nm}.password_token(created_on,status,token,user_id,type)
    values(now(),'A','${otp}',${user_id},'otp')`;
    let resp = await insertSql(sql);
    await sendOTP(otp,email,user_name,schema_nm);
    return otp;
}

export const sendOTP = async (otp,email,user_name,schema_nm) => {
    let sql = `select nt.subject,nt.body from ${schema_nm}.notification_templates nt where nt.template_name = 'auth_otp' and nt.status = 'A'`;
    let resp = await selectSql(sql);
    let msg = resp.results[0].body, subject = resp.results[0].subject;
    msg = msg.replace('[user]', user_name);
    msg = msg.replace('[OTP]', otp);
    email_service.Send({ 'from': 'support@accorian.com', 'subject': subject, 'html': msg, 'to': email })
}

export const generateUUID = async () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const getAuthorityDetails = async (authority) => {
    let sql = `select id,is_management from reference.authority where name = '${authority}'`;
    let resp = await selectSql(sql);
    if (resp.results.length == 0) {
        return [0, 0];
    } else {
        return [resp.results[0].id, resp.results[0].is_management];
    }
}

export const getScopeDetails = async (user_id, schema_nm, project_id) => {
    let peoples = '', technology_assets = '', vendors = '', third_party_utilities = '';

    let sql = `select * from (select coalesce((select config_value from ${schema_nm}.project_config where config_type = 'employees' and status = 'A' and project_id = ${project_id} ),'') as employees,
  coalesce((select config_value from ${schema_nm}.project_config where config_type = 'consultants' and status = 'A' and project_id = ${project_id}),'') as consultants ) as t  where t.employees <> '' and t.consultants <> ''`
    peoples = await selectSql(sql);

    sql = `select * from (select (select config_value from ${schema_nm}.project_config where config_type = 'endpoints' and status = 'A' and project_id = ${project_id} ) as endpoints,
  (select config_value from ${schema_nm}.project_config where config_type = 'servers' and status = 'A' and project_id = ${project_id}) as servers,
  (select config_value from ${schema_nm}.project_config where config_type = 'mobile_devices' and status = 'A' and project_id = ${project_id}) as mobile_devices ) as t  where t.endpoints <> '' and t.servers <> '' and t.mobile_devices <> ''`
    technology_assets = await selectSql(sql);

    sql = `select config_id as id,config_value as vendor from ${schema_nm}.project_config where config_type = 'vendor' and status = 'A' and project_id = ${project_id}`;
    vendors = await selectSql(sql);

    sql = `SELECT a.id,a.name,case coalesce(b.config_value,'') when '' then 'N' else 'Y' end as is_selected from ${schema_nm}.project_config b right join reference.third_party_utilities a on cast(b.config_value as integer) = a.id and b.project_id = ${project_id} and b.config_type = 'third_party_utility' and b.status = 'A' where (a.source = 'standard' or a.created_by = '${user_id}')`
    third_party_utilities = await selectSql(sql);

    return [peoples.results, technology_assets.results, vendors.results, third_party_utilities.results];
}

export const sendNewUserEmail = async (is_exists, emp_id, project_id, email, user_name, schema_nm, template_type) => {
    console.log('sending email to ', email);
    let app_url = process.env.APP_URL;
    let sql = `select (select p.name from ${schema_nm}.projects p where p.project_id = ${project_id}) as project_name,
    (select o.name from ${schema_nm}.projects p2,${schema_nm}.orgs o,${schema_nm}.accounts a where p2.account_id = a.account_id and a.org_id = o.org_id and p2.project_id = ${project_id}) as org_name`;
    let resp = await selectSql(sql);
    let project_name = resp.results[0].project_name, org_name = resp.results[0].org_name;
    sql = `select nt.subject,nt.body from ${schema_nm}.notification_templates nt where nt.template_name = '${template_type}' and nt.status = 'A'`;
    resp = await selectSql(sql);
    if (resp.results.length > 0) {
        let msg = resp.results[0].body, subject = resp.results[0].subject;
        msg = msg.replace('[user]', user_name);
        msg = msg.replace('[client_name]', org_name);
        msg = msg.replace('[project_name]', project_name);
        msg = msg.replace('[user_email]', email);
        console.log('is_exists', is_exists);
        if (is_exists == 'Y') {
            msg = msg.replace('[link]', `${app_url}login`);
        } else {
            let token = await generateUUID();
            app_url = `${app_url}resetpassword/${token}`;
            msg = msg.replace('[link]', app_url);
            sql = `insert into ${schema_nm}.password_token(created_on,status,token,user_id,expiry_in_sec)
            select now(),'A','${token}',u.user_id,0 from ${schema_nm}.users u where u.org_emp_id = ${emp_id}`;
            resp = await insertSql(sql);
        }
        console.log('sending email with subject ', subject);
        email_service.Send({ 'from': 'support@accorian.com', 'subject': subject, 'html': msg, 'to': email })
    }
}

