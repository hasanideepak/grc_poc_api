import jwt from 'jsonwebtoken';
import { insertSql, selectSql } from './pg_helper.js';


export const createAuthToken = async (user_id, schema_nm) => {
    let token = jwt.sign({ sub: user_id }, '926D96C90030DD58429D2751AC1BDBBC', { expiresIn: '60m', algorithm: 'HS512' });
    let sql = `INSERT INTO ${schema_nm}.user_session(user_id,session_time,session_timeout,recent_activity_time,token) VALUES(${user_id},NOW(),60,NOW(),'${token}')`;
    let resp = await insertSql(sql);
    return token;
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

    return [peoples.results,technology_assets.results,vendors.results,third_party_utilities.results];
}