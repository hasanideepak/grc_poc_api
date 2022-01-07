import jwt from 'jsonwebtoken';
import { selectSql } from './pg_helper.js';

const PUBLIC_API = '';//process.env.PUBLIC_API;

export const validateSession = async (req, res, next) => {
    let headers = req.headers;
    // console.log(req.path);
    let api_path = req.path.replace('/', '');
    if (api_path.includes('/')) {
        api_path = api_path.substring(0, api_path.indexOf("/"));
    }
    if (PUBLIC_API.includes(api_path)) {
        next();
    } else {
        let token = headers.authorization, api_key = headers.apikey;
        if (api_key != undefined) {

            let sql = `select issue_to,api_key as apikey,api_services from api_key where api_key = '${api_key}'`;
            let resp = await selectSql(sql);
            if (resp.results.length > 0) {
                let apikey = resp.results[0].apikey;
                let api_service = resp.results[0].api_services
                if (api_key == apikey) {
                    if (api_service.includes(`,${api_path},`)) {
                        next();
                    } else {
                        res.status(500).send({ status_code: 'air500', message: 'You are not authorized to use this service' });
                    }
                } else {
                    res.status(500).send({ status_code: 'air500', message: 'Invalid APIKEY' });
                }
            } else {
                res.status(500).send({ status_code: 'air500', message: 'Invalid APIKEY' });
            }
        } else {
            if (token != undefined) {
                token = token.replace('Bearer ', '');
                // let decoded = jwt.decode(token, '926D96C90030DD58429D2751AC1BDBBC');
                let decoded = jwt.decode(token);
                // console.log('decoded', decoded);
                if (decoded == null) {
                    res.status(500).send({ status_code: 'air500', message: 'Invalid token' });
                } else {
                    let user_id = decoded.sub;
                    let sql = `select user_id,token,id from master.user_session where user_id = ${user_id} and token = '${token}' and status = 'A' order by id desc limit 1`;
                    let resp = await selectSql(sql);
                    if (resp.results.length > 0) {
                     next();
                    } else {
                        res.status(500).send({ status_code: 'air500', message: 'Invalid token' });
                    }
                }
            } else {
                res.status(500).send({ status_code: 'air500', message: 'Invalid token' });
            }
        }
    }
}