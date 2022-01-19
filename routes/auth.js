import express from 'express';
import { createAuthToken } from '../utils/helper.js';
import { selectSql } from '../utils/pg_helper.js';
import error_resp from '../constants/errors.js'

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const schema_nm = req.headers.schema_nm;
    if (email != undefined) {
        if (password != undefined || password != '' || password != null) {
            let sql = `select a.user_id,a.email,a.org_emp_id,concat(b.first_name,' ',b.last_name) as name,b.phone,c.name as org_name,c.logo,c.org_id,case coalesce(d.account_id,0) when 0 then 'N' else 'Y' end as is_onboard,dept.name as access_role from ${schema_nm}.users a,${schema_nm}.org_employees b,reference.departments dept,${schema_nm}.x_org_dept_emp org_dept,${schema_nm}.orgs c left join ${schema_nm}.accounts d on c.org_id = d.org_id 
            where a.username = '${email}' and a.password = '${password}' and a.org_emp_id = b.emp_id and b.org_id = c.org_id and b.emp_id = org_dept.emp_id and org_dept.dept_id = dept.id`;
            
            let resp = await selectSql(sql);
            if (resp.results.length > 0) {
                let result = resp.results[0];
                let accesstoken = await createAuthToken(resp.results[0].user_id,schema_nm);
                let results = { user: result };
                results.accessToken = accesstoken;
                results.tokenType = 'Bearer';
                let response = { statusCode: 'air200', message: 'Success', results: results };
                res.status(200).send(response);
            } else {
                res.status(error_resp.Bad_Credentials.status_code).send(error_resp.Bad_Credentials.error_msg);
            }
        } else {
            res.status(error_resp.Invalid_Password.status_code).send(error_resp.Invalid_Password.error_msg);
        }
    } else {
        res.status(error_resp.Email_Required.status_code).send(error_resp.Email_Required.error_msg);
    }
});
export default router;
