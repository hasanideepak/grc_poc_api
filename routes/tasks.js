import express from 'express';
import error_resp from '../constants/errors.js'
import { getAuthorityDetails, getScopeDetails } from '../utils/helper.js';
import { selectSql } from '../utils/pg_helper.js';

const router = express.Router();

router.post('/listTasks', async (req, res) => {
    const user_id = req.headers.user_id, schema_nm = req.headers.schema_nm;
    const { project_id, authority, start_date, end_date, task_status } = req.body;
    let auth_condition = '', task_status_condition = ''
    let [authority_id, is_management] = await getAuthorityDetails(authority);
    if (authority_id == 0) {
        res.status(error_resp.Not_Authorized.http_status_code).send(error_resp.Not_Authorized.error_msg);
    } else {
        if (is_management == 'N') {
            auth_condition = ` and pt.responsible_authority = ${authority_id} `;
        }
        if (task_status != 'all') {
            task_status_condition = ` and pt.task_status = '${task_status}'`;
        }
        let sql = `select pt.project_task_id,pt.task_status,to_char(pt.created_on,'Mon DD, YYYY') as created_at,t.title,t.description,pt.ref_task_id from ${schema_nm}.project_tasks pt,reference.tasks t 
                   where pt.ref_task_id = t.id and t.status = 'A' and pt.project_id = ${project_id} and (pt.created_on::timestamp::date between '${start_date}' and '${end_date}') ${task_status_condition} ${auth_condition}`;
        let resp = await selectSql(sql);
        res.send(resp);
    }
});

router.get('/getTaskDetails/:project_task_id', async (req, res) => {
    const { project_task_id } = req.params;
    const schema_nm = req.headers.schema_nm, user_id = req.headers.user_id;
    let task = '', applicable_assets = '', evidence_needed = '', control_mapping = '', project_id = '';
    let sql = `select pt.project_task_id as task_id,pt.framework_id as auc_id,t.title,t.description,pt.task_status,pt.project_id,0 as completion_pct,'-' as due_date 
    from ops_1.project_tasks pt,reference.tasks t where pt.ref_task_id = t.id and pt.project_task_id = ${project_task_id} `
    task = await selectSql(sql);
    if (task.results.length > 0) {
        project_id = task.results[0].project_id;
        //get applicable assets
        let [peoples, technology_assets, vendors, third_party_utilities] = await getScopeDetails(user_id, schema_nm, project_id);
        applicable_assets = { peoples: peoples, technology_assets: technology_assets, vendors: vendors, third_party_utilities: third_party_utilities };
        //get evidence needed
        sql = `select et.name as evidence_name from ops_1.project_tasks pt,reference.evidence_type et where pt.project_task_id = ${project_task_id} and et.id = any (pt.evidence_type_id)`
        evidence_needed = await selectSql(sql);
        res.send({
            status_code: 'air200', message: 'Success',
            task: task.results,
            applicable_assets: applicable_assets,
            evidence_needed : evidence_needed.results
        })
    } else {
        res.status(error_resp.No_Record.http_status_code).send(error_resp.No_Record.error_msg)
    }
});
export default router;