import express from 'express';
import { selectSql, insertSql, updateSql } from '../utils/pg_helper.js';
const router = express.Router();

router.post('/setupAccount', async (req, res) => {
  const { account_name, project_name, org_id } = req.body;
  const user_id = req.headers.user_id,schema_nm = req.headers.schema_nm;
  let sql = `CALL ${schema_nm}.usp_setup_account('${account_name}','${project_name}',${org_id},${user_id},'${schema_nm}')`;
  let resp = await selectSql(sql);
  sql = `select project_id from ${schema_nm}.projects where account_id = (select account_id from ${schema_nm}.accounts where org_id = ${org_id} order by account_id desc limit 1) order by project_id desc limit 1`
  let resp1 = await selectSql(sql);
  resp.project_id = resp1.results[0].project_id;
  delete resp.results;
  res.send(resp);
});

router.post('/addProjectFrameworks', async (req, res) => {
  const { project_id, framework_ids } = req.body;
  const configType = 'framework';
  const status = 'A';
  const user_id = req.headers.user_id, schema_nm = req.headers.schema_nm;
  
  let frameworkIds = JSON.stringify(framework_ids), resp = '';
  let updateQuery = `update ${schema_nm}.project_config set status = 'D' where project_id = ${project_id} and config_type = '${configType}'`
  let respUpdate = await updateSql(updateQuery)
  
  framework_ids.forEach(async (item) => {
    let sql = `insert into ${schema_nm}.project_config (project_id,config_type,config_value,status,created_on,created_by)
      values (${project_id},'${configType}','${item}','${status}',NOW(),${user_id}) on duplicate key status = '${status}' 
      on conflict (project_id,config_type,config_value) do update set status ='${status}',last_upd_on = NOW(),last_upd_by = ${user_id}`;
    resp = await insertSql(sql);
  });
  res.send({ status_code: 'air200', message: 'Success' });

})

router.post('/addKeyMember', async (req, res) => {
  const { email, org_id, project_id, department_id } = req.body;
  const user_id = req.headers.user_id, schema_nm = req.headers.schema_nm;
  let sql = `CALL ${schema_nm}.usp_setup_keymember('${email}',${org_id},${project_id},${department_id},${user_id},'${schema_nm}')`;
  let resp = await selectSql(sql);
  sql = `select emp_id from ${schema_nm}.org_employees where email = '${email}'`
  let resp1 = await selectSql(sql);
  resp.emp_id = resp1.results[0].emp_id;
  delete resp.results;
  res.send(resp);

})

router.post('/addServicePartner', async (req, res) => {
  const { email, full_name, project_id } = req.body;
  const user_id = req.headers.user_id, schema_nm = req.headers.schema_nm;
  let sql = `CALL ${schema_nm}.usp_add_service_partner('${email}','${full_name}',${project_id},${user_id},'${schema_nm}')`;
  let resp = await selectSql(sql);
  sql = `select emp_id from ${schema_nm}.org_employees where email = '${email}'`
  let resp1 = await selectSql(sql);
  resp.emp_id = resp1.results[0].emp_id;
  delete resp.results;
  res.send(resp);

})

router.post('/addTaskOwner', async (req, res) => {
  const { email, first_name, last_name, org_id, project_id, department_id } = req.body;
  const user_id = req.headers.user_id, schema_nm = req.headers.schema_nm;
  let sql = `CALL ${schema_nm}.usp_add_task_owner('${email}','${first_name}','${last_name}',${org_id},${project_id},${department_id},${user_id},'${schema_nm}')`;
  let resp = await selectSql(sql);
  sql = `select emp_id from ${schema_nm}.org_employees where email = '${email}'`
  let resp1 = await selectSql(sql);
  resp.emp_id = resp1.results[0].emp_id;
  delete resp.results;
  res.send(resp);

})

router.post('/addThirdPartyConnector', async (req, res) => {
  const { project_id, connector_ids } = req.body;
  const configType = 'third_party_connector';
  const status = 'A';
  const user_id = req.headers.user_id, schema_nm = req.headers.schema_nm;


  connector_ids = JSON.stringify(connector_ids)
  let resp = '';
  let updateQuery = `update ${schema_nm}.project_config set status = 'D' where project_id = ${project_id} and config_type = '${configType}'`
  let respUpdate = await updateSql(updateQuery)
  
  connector_ids.forEach(async (item) => {
    let sql = `insert into ${schema_nm}.project_config (project_id,config_type,config_value,status,created_on,created_by)
      values (${project_id},'${configType}','${item}','${status}',NOW(),${user_id}) on duplicate key status = '${status}' 
      on conflict (project_id,config_type,config_value) do update set status ='${status}',last_upd_on = NOW(),last_upd_by = ${user_id}`;
    resp = await insertSql(sql);
  });
  res.send({ status_code: 'air200', message: 'Success' });

})

router.post('/deleteKeyMember', async (req, res) => {
  const { org_id, emp_id, project_id } = req.body;
  const schema_nm = req.headers.schema_nm;
  let sql = `CALL ${schema_nm}.usp_delete_keymember(${org_id},${emp_id},${project_id},'${schema_nm}')`;
  let resp = await selectSql(sql);
  res.send(resp);
})

router.post('/deleteTaskOwner', async (req, res) => {
  const { org_id, emp_id, project_id } = req.body;
  const schema_nm = req.headers.schema_nm;
  let sql = `CALL ${schema_nm}.usp_delete_task_owner(${org_id},${emp_id},${project_id},'${schema_nm}')`;
  let resp = await selectSql(sql);
  res.send(resp);
})

router.post('/deleteServicePartner', async (req, res) => {
  const { org_id, emp_id, project_id } = req.body;
  const schema_nm = req.headers.schema_nm;
  let sql = `CALL ${schema_nm}.usp_delete_service_partner(${org_id},${emp_id},${project_id},'${schema_nm}')`;
  let resp = await selectSql(sql);
  res.send(resp);
})

router.get('/getConfiguration/:org_id/:account_id?/:project_id?', async (req, res) => {

  const { org_id, project_id, account_id } = req.params;
  const schema_nm = req.headers.schema_nm;

  let resp_project_account = ''
  let resp_keymemebers = ''
  let resp_taskowner = ''
  let resp_frameworks = ''
  let resp_servicePartner = ''
  let resp_thirdPartyConnector = ''
  let pro_id = ''

  if (typeof project_id == 'undefined') {
    let sql = `select a.name as account_name,b.name as project_name,b.project_id from ${schema_nm}.accounts a,${schema_nm}.projects b where a.org_id = ${org_id} and a.account_id = b.account_id order by b.project_id desc limit 1`;
    resp_project_account = await selectSql(sql);
    pro_id = resp_project_account.results[0].project_id;
  } else {
    let sql = `select a.name as account_name,b.name as project_name from ${schema_nm}.accounts a,${schema_nm}.projects b where a.org_id = ${org_id} and a.account_id = b.account_id and b.project_id = ${project_id}`;
    resp_project_account = await selectSql(sql);
    pro_id = project_id;
  }
  let keymember_sql = `select a.emp_id,a.email,c.name as department_name from ${schema_nm}.org_employees a,${schema_nm}.x_org_dept_emp b,reference.departments c,${schema_nm}.x_project_emp d
    where a.org_id = ${org_id} and a.emp_id = b.emp_id and b.dept_id = c.id and c.is_management = 'Y' and d.emp_id = a.emp_id and d.project_id = ${pro_id}`
  resp_keymemebers = await selectSql(keymember_sql);

  let taskOwner_sql = `select a.emp_id,a.email,a.first_name,a.last_name,c.name as department_name from ${schema_nm}.org_employees a,${schema_nm}.x_org_dept_emp b,reference.departments c,${schema_nm}.x_project_emp d
    where a.org_id = ${org_id} and a.emp_id = b.emp_id and b.dept_id = c.id and c.is_management = 'N' and d.emp_id = a.emp_id and d.project_id = ${pro_id}`
  resp_taskowner = await selectSql(taskOwner_sql);

  let framework_sql = `SELECT a.id,a.name,case coalesce(b.config_value,'') when '' then 'N' else 'Y' end as is_selected from ${schema_nm}.project_config b right join reference.frameworks a on cast(b.config_value as integer) = a.id and b.project_id = ${pro_id} and b.config_type = 'framework' and b.status ='A'`
  resp_frameworks = await selectSql(framework_sql);

  let servicePartner_sql = `select b.config_value as partner_id,c.emp_id,c.emp_id,c.first_name as full_name,c.email from ${schema_nm}.orgs a,${schema_nm}.project_config b, ${schema_nm}.org_employees c 
  where b.project_id = ${pro_id} and b.config_type = 'service_partner' and a.org_id = c.org_id and cast(b.config_value as integer) = c.org_id`
  resp_servicePartner = await selectSql(servicePartner_sql);

  let thirdPartyConnector_sql = `SELECT a.id,a.name,case coalesce(b.config_value,'') when '' then 'N' else 'Y' end as is_selected,case coalesce(b.additional_info,'') when '' then 'N' else 'Y' end as is_token_added,coalesce(right(b.additional_info,3),'') as token from ${schema_nm}.project_config b right join reference.third_party_connectors a on cast(b.config_value as integer) = a.id and b.project_id = ${pro_id} and b.config_type = 'third_party_connector' and b.status = 'A'`
  resp_thirdPartyConnector = await selectSql(thirdPartyConnector_sql);

  res.send({ status_code : 'air200',message:'Success', 
    accounts_and_projects: resp_project_account.results,
    keymembers: resp_keymemebers.results,
    task_owners: resp_taskowner.results,
    frameworks: resp_frameworks.results,
    service_partners: resp_servicePartner.results,
    third_party_connectors: resp_thirdPartyConnector.results
  });

})

router.post('/addThirdPartyConnectorToken', async (req, res) => {
  const { project_id, connector_id, token } = req.body;
  const schema_nm = req.headers.schema_nm;
  const connectorType = 'third_party_connector'
  let sql = `update ${schema_nm}.project_config set additional_info = '${token}' where project_id = ${project_id} and config_value = '${connector_id}' and config_type = '${connectorType}'`;
  let resp = await selectSql(sql);
  res.send(resp);
});

router.get('/getThirdPartyConnectors/:project_id', async (req,res) => {
  const {project_id} = req.params;
  const schema_nm = req.headers.schema_nm;
  let sql = `select a.config_value as connector_id,b.name from ${schema_nm}.project_config a,reference.third_party_connectors b where a.project_id = ${project_id} and a.config_type = 'third_party_connector' and a.status = 'A' and cast(a.config_value as integer) = b.id`;
  let resp = await selectSql(sql);
  res.send(resp);
})



export default router;