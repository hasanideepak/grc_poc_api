import express from 'express';
import error_resp from '../constants/errors.js'
import { getAuthorityDetails, getScopeDetails } from '../utils/helper.js';
import { selectSql,updateSql } from '../utils/pg_helper.js';

const router = express.Router();

router.post('/listTasks', async (req, res) => {
    const user_id = req.headers.user_id, schema_nm = req.headers.schema_nm;
    const { project_id, authority, start_date, end_date, task_status, date_criteria, priority } = req.body;
    let auth_condition = '', task_status_condition = '', date_condition = '';
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
        date_condition = date_criteria == 'start_date' ? ` and (pt.task_start_date::timestamp::date between '${start_date}' and '${end_date}')` : ` and (pt.task_end_date::timestamp::date between '${start_date}' and '${end_date}')`
        let sql = `select pt.project_task_id,pt.task_status,to_char(pt.task_start_date,'Mon DD, YYYY') as created_at,t.title,t.description,pt.ref_task_id,to_char(pt.task_end_date,'Mon DD, YYYY') as due_date,pt.priority from ${schema_nm}.project_tasks pt,reference.tasks t 
                   where pt.ref_task_id = t.id and t.status = 'A' and pt.project_id = ${project_id} and priority = '${priority}' ${date_condition} ${task_status_condition} ${auth_condition}`;
        // console.log(sql);
        let resp = await selectSql(sql);
        res.send(resp);
    }
});

router.get('/getTaskDetails/:project_task_id', async (req, res) => {
    const { project_task_id } = req.params;
    const schema_nm = req.headers.schema_nm, user_id = req.headers.user_id, api_url = process.env.API_URL;
    let task = '', applicable_assets = '', evidence_needed = '', control_mapping = '', project_id = '';
    let sql = `select pt.project_task_id as task_id,pt.framework_id as auc_id,t.title,t.description,pt.task_status,pt.project_id,0 as completion_pct,to_char(pt.task_end_date,'Mon DD, YYYY') as due_date,
    pt.priority ,case pt.task_owner_id when -1 then '-' else (select concat(oe.first_name,' ',oe.last_name) from ${schema_nm}.org_employees oe where oe.emp_id = pt.task_owner_id) end as task_owner,
    case pt.task_owner_id when -1 then '-' else (select name from reference.authority join ops_1.x_project_emp on reference.authority.id = ops_1.x_project_emp.authority_id
        join ops_1.project_tasks on ops_1.x_project_emp.project_id = ops_1.project_tasks.project_id 
        where ops_1.x_project_emp.project_id = pt.project_id AND ops_1.x_project_emp.emp_id = pt.task_owner_id AND ops_1.project_tasks.project_task_id = ${project_task_id}) end as authority,
        case pt.project_task_id when -1 then '-' else (select CASE
            WHEN ops_1.project_tasks.frequency_duration = 1 AND ops_1.project_tasks.frequency_unit = 'year' THEN 'Yearly'
            WHEN ops_1.project_tasks.frequency_duration = 1 AND ops_1.project_tasks.frequency_unit = 'month' THEN 'Monthly'
            WHEN ops_1.project_tasks.frequency_duration = 7 AND ops_1.project_tasks.frequency_unit = 'day' THEN 'Weekly'
            ELSE '-' END from ops_1.project_tasks where ops_1.project_tasks.project_task_id = ${project_task_id}
        ) end as task_frequency
    from ${schema_nm}.project_tasks pt,reference.tasks t where pt.ref_task_id = t.id and pt.project_task_id = ${project_task_id} `
    task = await selectSql(sql);

    if (task.results.length > 0) {
        project_id = task.results[0].project_id;
        //get applicable assets
        let [peoples, technology_assets, vendors, third_party_utilities] = await getScopeDetails(user_id, schema_nm, project_id);
        applicable_assets = { peoples: peoples, technology_assets: technology_assets, vendors: vendors, third_party_utilities: third_party_utilities };
        //get evidence needed
        sql = `select et.name as evidence_name,et.id as evidence_type_id from ${schema_nm}.project_tasks pt,reference.evidence_type et where pt.project_task_id = ${project_task_id} and et.id = any (pt.evidence_type_id)`
        evidence_needed = await selectSql(sql);
        for (let i = 0; i < evidence_needed.results.length; i++) {
            sql = `select evidence_id as task_evidence_id,collection_type,evidence_value as file_name,concat('${api_url}','evidences/getEvidence/',split_part(evidence_value,'.',1)) as evidence_url from ${schema_nm}.project_task_evidence where project_task_id = ${project_task_id} and evidence_type_id = ${evidence_needed.results[i].evidence_type_id}`;
            let resp = await selectSql(sql);
            evidence_needed.results[i].evidence_uploaded = resp.results;
        }
        res.send({
            status_code: 'air200', message: 'Success',
            task: task.results,
            applicable_assets: applicable_assets,
            evidence_needed: evidence_needed.results
        })
    } else {
        res.status(error_resp.No_Record.http_status_code).send(error_resp.No_Record.error_msg)
    }
});

router.post('/updateTaskDetails/:project_task_id',async(req,res)=>{
    const user_id = req.headers.user_id, schema_nm = req.headers.schema_nm;
    const { data } = req.body;
    const task_id = req.params.project_task_id

    
    
    if(Object.keys(data).length !== 0) {
        let sql = 'UPDATE ops_1.project_tasks SET '
        let i = 1;
        for (let [key, value] of Object.entries(data)) {
            sql += ` ${key} = ${value}`
            if(i === Object.keys(data).length){
                sql += ``
            }else{
                sql += `, `
            }
            i++;
          }
          sql += ` where ops_1.project_tasks.project_task_id =${task_id}`
          let resp = await updateSql(sql,);
          res.send(resp);
        }else{
            res.send({ status_code: 'air200', message: 'No data updated.'});
        }

    
     

})
export default router;