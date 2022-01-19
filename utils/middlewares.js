import jwt from 'jsonwebtoken';
import { selectSql } from './pg_helper.js';
import { schemaValidator } from './validator_helper.js';
import error_resp from '../constants/errors.js'

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
        let token = headers.authorization;
        if (token != undefined) {
            token = token.replace('Bearer ', '');
            // let decoded = jwt.decode(token, '926D96C90030DD58429D2751AC1BDBBC');
            let decoded = jwt.decode(token);
            // console.log('decoded', decoded);
            if (decoded == null) {
                res.status(error_resp.Invalid_Token.status_code).send(error_resp.Invalid_Token.error_msg);
            } else {
                let user_id = decoded.sub;
                req.headers.user_id = user_id;
                let sql = `select user_id,token,id from ${req.headers.schema_nm}.user_session where user_id = ${user_id} and token = '${token}' and status = 'A' order by id desc limit 1`;
                let resp = await selectSql(sql);
                if (resp.results.length > 0) {
                    next();
                } else {
                    res.status(error_resp.Invalid_Token.status_code).send(error_resp.Invalid_Token.error_msg);
                }
            }
        } else {
            res.status(error_resp.Invalid_Token.status_code).send(error_resp.Invalid_Token.error_msg);
        }

    }
}
export const saasValidation = async (req, res, next) => {
    const api_key = req.headers.apikey
    let schema_nm = '';
    //check api key for SaaS implementation
    if (api_key != undefined) {

        let sql = `select client_code,client_name,schema from saasmaster.client where api_key = '${api_key}' and status = 'A'`;
        let resp = await selectSql(sql);
        if (resp.results.length > 0) {
            schema_nm = resp.results[0].schema;
            req.headers.schema_nm = schema_nm;
            next()
        } else {
            res.status(error_resp.Invalid_APIKEY.status_code).send(error_resp.Invalid_APIKEY.error_msg);
        }
    } else {
        res.status(error_resp.Invalid_APIKEY.status_code).send(error_resp.Invalid_APIKEY.error_msg);
    }
}
export const schemaValidation = async (req, res, next) => {

    if (req.method == 'POST') {
        let resp = await schemaValidator(req);
        if (resp.status_code == 'air200') {
            next();
        } else {
            res.status(401).send(resp);
        }
    } else {
        next();
    }

}