import express from 'express';
import { createAuthToken, generateUUID } from '../utils/helper.js';
import { insertSql, selectSql, updateSql } from '../utils/pg_helper.js';
import error_resp from '../constants/errors.js'
import EmailServices from '../utils/email_service.js';
import { validateSession } from '../utils/middlewares.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const schema_nm = req.headers.schema_nm;
    if (email != undefined) {
        if (password != undefined || password != '' || password != null) {
            // let sql = `select a.user_id,a.username as email,a.org_emp_id,concat(b.first_name,' ',b.last_name) as name,b.phone,c.name as org_name,c.logo,c.org_id,
            // case coalesce(d.account_id,0) when 0 then 'N' else 'Y' end as is_onboard,au.name as access_role from ${schema_nm}.users a,${schema_nm}.org_employees b,reference.authority au,${schema_nm}.x_project_emp xpe ,${schema_nm}.orgs c left join ${schema_nm}.accounts d on c.org_id = d.org_id 
            // where a.username = '${email}' and a.passwd = '${password}' and a.org_emp_id = b.emp_id and b.emp_id = xpe.emp_id and b.org_id = c.org_id and xpe.authority_id=au.id`;
            let sql = `select a.user_id,a.username as email,a.org_emp_id,concat(b.first_name,' ',b.last_name) as name,b.phone,c.name as org_name,c.logo,c.org_id,
            case coalesce(d.account_id,0) when 0 then 'N' else 'Y' end as is_onboard, 
            case b.super_user when 'Y' then 'CISO' else 
            (select au.name from reference.authority au,${schema_nm}.x_project_emp xpe,${schema_nm}.projects p where au.id = xpe.authority_id and p.project_id = xpe.project_id and p.account_id = d.account_id) end as access_role
            from ${schema_nm}.users a,${schema_nm}.org_employees b,${schema_nm}.orgs c left join ${schema_nm}.accounts d on c.org_id = d.org_id 
            where a.username = '${email}' and a.passwd = '${password}' and a.org_emp_id = b.emp_id and b.org_id = c.org_id`
            let resp = await selectSql(sql);
            if (resp.results.length > 0) {
                let result = resp.results[0];
                let accesstoken = await createAuthToken(resp.results[0].user_id, schema_nm);
                let results = { user: result };
                results.accessToken = accesstoken;
                results.tokenType = 'Bearer';
                let response = { statusCode: 'air200', message: 'Success', results: results };
                res.status(200).send(response);
            } else {
                res.status(error_resp.Bad_Credentials.http_status_code).send(error_resp.Bad_Credentials.error_msg);
            }
        } else {
            res.status(error_resp.Invalid_Password.http_status_code).send(error_resp.Invalid_Password.error_msg);
        }
    } else {
        res.status(error_resp.Email_Required.http_status_code).send(error_resp.Email_Required.error_msg);
    }
});

router.post('/forgot_password', async (req, res) => {
    const { username } = req.body;
    const schema_nm = req.headers.schema_nm;
    let sql = `select user_id,username from ${schema_nm}.users where username = '${username}'`;
    let resp = await selectSql(sql);

    if (resp.results.length > 0) {
        let user_id = resp.results[0].user_id, email = resp.results[0].username, token = await generateUUID();;
        let app_url = `${process.env.APP_URL}resetpassword/${token}`;
        let msg = `<p>Hi,</p> <p>Please click below link to reset you password</p><p>${app_url}</p><p>Thanks</p>`;
        EmailServices.Send({ 'from': 'support@accorian.com', 'subject': `Reset Password`, 'html': msg, 'to': email });

        sql = `insert into ${schema_nm}.password_token(created_on,status,token,user_id)
               values(now(),'A','${token}',${user_id})`;
        resp = await insertSql(sql);
        res.status(200).send({ status_code: 'air200', message: 'Success' });
    } else {
        res.status(error_resp.Invalid_User.http_status_code).send(error_resp.Invalid_User.error_msg);
    }
});

router.post('/reset_password', async (req, res) => {
    const { password, token } = req.body;
    const schema_nm = req.headers.schema_nm;
    let sql = `select user_id from ${schema_nm}.password_token where token = '${token}' and status = 'A' and (EXTRACT(EPOCH FROM (now()-created_on)) < expiry_in_sec or expiry_in_sec = 0) limit 1`;
    let resp = await selectSql(sql);
    if (resp.results.length > 0) {
        if (password == undefined || password == '' || password == 'undefined') {
            res.status(error_resp.Invalid_Password.http_status_code).send(error_resp.Invalid_Password.error_msg);
        } else {
            let user_id = resp.results[0].user_id;
            sql = `update ${schema_nm}.users set passwd = md5('${password}') where user_id = ${user_id}`;
            resp = await updateSql(sql);
            sql = `update ${schema_nm}.password_token set status = 'I' where token = '${token}'`;
            let resp1 = await updateSql(sql);
            res.status(200).send(resp);
        }
    } else {
        res.status(error_resp.Token_Expired.http_status_code).send(error_resp.Token_Expired.error_msg);
    }
});

router.post('/changePassword', validateSession, async (req, res) => {
    const user_id = req.headers.user_id, schema_nm = req.headers.schema_nm;
    const { current_password, new_password } = req.body;
    let sql = `select password from ${schema_nm}.users where user_id = ${user_id}`;
    let resp = await selectSql(sql);
    if (resp.results.length > 0) {
        if (current_password == resp.results[0].password) {
            sql = `update ${schema_nm}.users set password = md5('${new_password}') where user_id = ${user_id}`;
            resp = await updateSql(sql);
            res.status(200).send(resp);
        } else {
            res.status(error_resp.Current_Password_Wrong.http_status_code).send(error_resp.Current_Password_Wrong.error_msg);
        }
    } else {
        res.status(error_resp.Invalid_Token.http_status_code).send(error_resp.Invalid_Token.error_msg);
    }
})
export default router;
