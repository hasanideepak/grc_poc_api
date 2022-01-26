import express from 'express';
import error_resp from '../constants/errors.js'
import { getAuthorityDetails } from '../utils/helper.js';
import { selectSql } from '../utils/pg_helper.js';

const router = express.Router();

router.post('/listTasks', async (req, res) => {
    const user_id = req.headers.user_id, schema_nm = req.headers.schema_nm;
    const { project_id, authority, start_date, end_date, task_status } = req.body;
    let auth_condition = '',task_status_condition = ''
    let [authority_id, is_management] = await getAuthorityDetails(authority);
    if (authority_id == 0) {
        res.status(error_resp.Not_Authorized.http_status_code).send(error_resp.Not_Authorized.error_msg);
    } else {
        if(is_management == 'N'){
            auth_condition = ` and pt.responsible_authority = ${authority_id} `;
        }
        if(task_status != 'all'){
            task_status_condition = ` and pt.task_status = '${task_status}'`;
        }
        let sql = `select pt.project_task_id,pt.task_status,to_char(pt.created_on,'DD Mon YYYY') as created_at,t.title,pt.ref_task_id from ${schema_nm}.project_tasks pt,reference.tasks t 
                   where pt.ref_task_id = t.id and t.status = 'A' and pt.project_id = ${project_id} and (pt.created_on::timestamp::date between '${start_date}' and '${end_date}') ${task_status_condition} ${auth_condition}`;
        let resp = await selectSql(sql);
        res.send(resp);           
    }
})
export default router;