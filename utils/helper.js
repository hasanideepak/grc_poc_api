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
        return [0,0];
    } else {
        return [resp.results[0].id, resp.results[0].is_management];
    }
}