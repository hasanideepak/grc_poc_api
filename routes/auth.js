import express from 'express';
import { createAuthToken } from '../utils/helper.js';
import { selectSql } from '../utils/pg_helper.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (email != undefined) {
        if (password != undefined || password != '' || password != null) {
            let sql = `select a.user_id,a.email,a.org_emp_id,b.name,b.phone,c.name as org_name,c.logo,c.org_id,case coalesce(d.account_id,0) when 0 then 'N' else 'Y' end as is_onboard,dept.name as access_role from master.users a,master.org_employees b,reference.departments dept,master.x_org_dept_emp org_dept,master.orgs c left join master.accounts d on c.org_id = d.org_id 
            where a.username = '${email}' and a.password = '${password}' and a.org_emp_id = b.emp_id and b.org_id = c.org_id and b.emp_id = org_dept.emp_id and org_dept.dept_id = dept.id`;
            let resp = await selectSql(sql);
            if (resp.results.length > 0) {
                let result = resp.results[0];
                let accesstoken = await createAuthToken(resp.results[0].user_id);
                let results = { user: result };
                results.accessToken = accesstoken;
                results.tokenType = 'Bearer';
                let response = { statusCode: 'air200', message: 'Success', results: results };
                res.status(200).send(response);
            } else {
                res.status(404).send({ statusCode: 'air404', message: 'Bad credentials' });
            }
        } else {
            res.status(404).send({ statusCode: 'air404', message: 'Valid password required..!' });
        }
    } else {
        res.status(404).send({ statusCode: 'air404', message: 'Email required..!' });
    }
});
export default router;
