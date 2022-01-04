import jwt from 'jsonwebtoken';
import { insertSql } from './pg_helper.js';


export const createAuthToken = async (user_id) => {
    let token = jwt.sign({ sub: user_id }, '926D96C90030DD58429D2751AC1BDBBC', { expiresIn: '60m', algorithm: 'HS512' });
    let sql = `INSERT INTO master.user_session(user_id,session_time,session_timeout,recent_activity_time,token) VALUES(${user_id},NOW(),60,NOW(),'${token}')`;
    let resp = await insertSql(sql);
    return token;
}