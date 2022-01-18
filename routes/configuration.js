import express from 'express';
import { selectSql, insertSql } from '../utils/pg_helper.js';

const router = express.Router();

router.post('/setupAccount', async (req, res) => {
  const { account_name, project_name, org_id } = req.body;
  const user_id = req.headers.user_id
  let sql = `CALL master.usp_setup_account('${account_name}','${project_name}',${org_id},${user_id})`;
  let resp = await selectSql(sql);
  sql = `select project_id from master.projects where account_id = (select account_id from master.accounts where org_id = ${org_id} order by account_id desc limit 1) order by project_id desc limit 1`
  let resp1 = await selectSql(sql);
  resp.project_id = resp1.results[0].project_id;
  delete resp.results;
  res.send(resp);
});

router.post('/addProjectFrameworks', async (req, res) => {
  const { project_id, framework_ids } = req.body;
  const configType = 'framework';
  const status = 'A';
  const user_id = req.headers.user_id;
  let frameworkIds = JSON.stringify(framework_ids), resp = '';

  framework_ids.forEach(async (item) => {
    let sql = `insert into master.project_config (project_id,config_type,config_value,status,created_on,created_by)
      values (${project_id},'${configType}','${item}','${status}',NOW(),${user_id})`;
    resp = await insertSql(sql);
  });
  res.send({ status_code: 'air200', message: 'Success' });

})

router.post('/addKeyMember', async (req, res) => {
  const { email, org_id, project_id, department_id } = req.body;
  const user_id = req.headers.user_id
  let sql = `CALL master.usp_setup_keymember('${email}',${org_id},${project_id},${department_id},${user_id})`;
  let resp = await selectSql(sql);
  res.send(resp);

})

router.post('/addServicePartner', async (req, res) => {
  const { email, full_name, project_id } = req.body;
  const user_id = req.headers.user_id
  let sql = `CALL master.usp_add_service_partner('${email}','${full_name}',${project_id},${user_id})`;
  let resp = await selectSql(sql);
  res.send(resp);

})

router.post('/addTaskOwner', async (req, res) => {
  const { email, first_name, last_name, org_id, project_id, department_id } = req.body;
  const user_id = req.headers.user_id
  let sql = `CALL master.usp_add_task_owner('${email}','${first_name}','${last_name}',${org_id},${project_id},${department_id},${user_id})`;
  let resp = await selectSql(sql);
  res.send(resp);

})

router.post('/addThirdPartyConnector', async (req, res) => {
  const { project_id, connector_id } = req.body;
  const configType = 'third_party_connector';
  const status = 'A';
  const user_id = req.headers.user_id;

  let sql = `insert into master.project_config (project_id,config_type,config_value,status,created_on,created_by)
      values (${project_id},'${configType}','${connector_id}','${status}',NOW(),${user_id})`;
  let resp = await insertSql(sql);
  res.send(resp);


})

router.post('/deleteKeyMember', async (req, res) => {
  const { org_id, emp_id } = req.body;
  let sql = `CALL master.usp_delete_keymember(${org_id},${emp_id})`;
  let resp = await selectSql(sql);
  res.send(resp);
})

router.post('/deleteTaskOwner', async (req, res) => {
  const { org_id, emp_id } = req.body;
  let sql = `CALL master.usp_delete_task_owner(${org_id},${emp_id})`;
  let resp = await selectSql(sql);
  res.send(resp);
})

router.post('/deleteServicePartner', async (req, res) => {
  const { org_id, emp_id } = req.body;
  let sql = `CALL master.usp_delete_service_partner(${org_id},${emp_id})`;
  let resp = await selectSql(sql);
  res.send(resp);
})

router.get('/onBoarding', async (req, res) => {

  const { org_id, project_id, account_id } = req.headers;
  let resp_project_account = ''
  let resp_keymemebers = ''
  let resp_taskowner = ''
  let resp_frameworks = ''
  let resp_servicePartner = ''
  let resp_thirdPartyConnector = ''

  if (typeof account_id == 'undefined' && typeof project_id == 'undefined' && org_id !== '') {
    let sql = `SELECT master.accounts.account_id,master.accounts.name as account_name,master.projects.name as project_name,master.projects.project_id FROM master.accounts JOIN master.projects USING (account_id) where master.accounts.org_id = ${org_id} ORDER BY master.accounts.account_id DESC limit 1`;
    resp_project_account = await selectSql(sql);
    let keymember_sql = `SELECT * from master.org_employees JOIN master.x_org_dept_emp using (emp_id)  where master.org_employees.org_id = ${org_id} AND master.x_org_dept_emp.dept_id IN (
      SELECT id
      FROM reference.departments
      WHERE is_management = 'Y'
    )`
    resp_keymemebers = await selectSql(keymember_sql);
    let taskOwner_sql = `SELECT * from master.org_employees JOIN master.x_org_dept_emp using (emp_id)  where master.org_employees.org_id = ${org_id} AND master.x_org_dept_emp.dept_id IN (
      SELECT id
      FROM reference.departments
      WHERE is_management = 'N'
    )`
    resp_taskowner = await selectSql(taskOwner_sql);

    let framework_sql = `SELECT master.accounts.org_id,master.accounts.account_id,master.project_config.project_id,config_type,config_value from master.accounts JOIN master.projects using (account_id) JOIN master.project_config using (project_id) where master.project_config.config_type = 'framework' AND master.accounts.org_id = ${org_id} order by master.accounts.account_id DESC
    `
    resp_frameworks = await selectSql(framework_sql);

    let servicePartner_sql = `SELECT org_id,master.orgs.type as org_type,master.orgs.name as org_name,master.orgs.logo as org_logo,emp_id,org_employees.name as full_name
    ,org_employees.email as email, org_employees.status as status FROM master.orgs JOIN master.org_employees using (org_id) 
    where master.orgs.org_id = ${org_id} 
    and master.orgs.type in ((SELECT id::text FROM reference.org_types where reference.org_types.type = 'service partner'))
    `
    resp_servicePartner = await selectSql(servicePartner_sql);

    let thirdPartyConnector_sql = `SELECT project_id,account_id,org_id,config_id,config_value,config_type from master.accounts 
    join master.projects using (account_id)
    join master.project_config using (project_id)
    where master.project_config.config_type = 'third_party_connector' AND master.accounts.org_id = ${org_id}  order by master.accounts.account_id DESC`
    resp_thirdPartyConnector = await selectSql(thirdPartyConnector_sql);

  } else if (typeof org_id == 'undefined' && typeof project_id == 'undefined') {
    let sql = `SELECT master.accounts.account_id,master.accounts.name as account_name,master.projects.name as project_name,master.projects.project_id FROM master.accounts JOIN master.projects USING (account_id) where master.accounts.account_id = ${account_id} ORDER BY master.accounts.account_id DESC limit 1`;
    resp_project_account = await selectSql(sql);
    let keymember_sql = `SELECT * from master.org_employees JOIN master.accounts using (org_id) JOIN master.x_org_dept_emp using (emp_id) where master.x_org_dept_emp.dept_id IN (
      SELECT id
      FROM reference.departments
      WHERE is_management = 'Y'
    ) AND master.accounts.account_id = ${account_id}`
    resp_keymemebers = await selectSql(keymember_sql);
    let taskOwner_sql = `SELECT * from master.org_employees JOIN master.accounts using (org_id) JOIN master.x_org_dept_emp using (emp_id) where master.x_org_dept_emp.dept_id IN (
      SELECT id
      FROM reference.departments
      WHERE is_management = 'N'
    ) AND master.accounts.account_id = ${account_id}
    `
    resp_taskowner = await selectSql(taskOwner_sql);
    let framework_sql = `SELECT master.accounts.org_id,master.accounts.account_id,master.project_config.project_id,config_type,config_value from master.accounts JOIN master.projects using (account_id) JOIN master.project_config using (project_id) where master.project_config.config_type = 'framework' AND master.accounts.account_id = ${account_id} order by master.accounts.account_id DESC
    `
    resp_frameworks = await selectSql(framework_sql);

    let servicePartner_sql = `SELECT org_id,master.orgs.type as org_type,master.orgs.name as org_name,master.orgs.logo as org_logo,emp_id,org_employees.name as full_name
    ,org_employees.email as email, org_employees.status as status FROM master.orgs 
    JOIN master.org_employees using (org_id) 
    JOIN master.accounts using (org_id)
    where master.accounts.account_id = ${account_id} 
    and master.orgs.type in ((SELECT id::text FROM reference.org_types where reference.org_types.type = 'service partner'))
    `
    resp_servicePartner = await selectSql(servicePartner_sql);

    let thirdPartyConnector_sql = `SELECT project_id,account_id,org_id,config_id,config_value,config_type from master.accounts 
    join master.projects using (account_id)
    join master.project_config using (project_id)
    where master.project_config.config_type = 'third_party_connector' AND master.accounts.account_id = ${account_id}  order by master.accounts.account_id DESC`
    resp_thirdPartyConnector = await selectSql(thirdPartyConnector_sql);

  } else if (typeof org_id == 'undefined' && typeof account_id == 'undefined' && project_id !== '') {
    let sql = `SELECT master.accounts.account_id,master.accounts.name as account_name,master.projects.name as project_name,master.projects.project_id FROM master.accounts JOIN master.projects USING (account_id) where master.projects.project_id = ${project_id}`;
    resp_project_account = await selectSql(sql);
    let keymember_sql = `SELECT * from master.org_employees LEFT JOIN master.accounts using (org_id) JOIN master.projects USING (account_id) JOIN master.x_org_dept_emp using (emp_id) where master.x_org_dept_emp.dept_id IN (
      SELECT id
      FROM reference.departments
      WHERE is_management = 'Y'
    ) AND master.projects.project_id = ${project_id}`
    resp_keymemebers = await selectSql(keymember_sql);
    let taskOwner_sql = `SELECT * from master.org_employees LEFT JOIN master.accounts using (org_id) JOIN master.projects USING (account_id) JOIN master.x_org_dept_emp using (emp_id) where master.x_org_dept_emp.dept_id IN (
      SELECT id
      FROM reference.departments
      WHERE is_management = 'N'
    ) AND master.projects.project_id = ${project_id}
    `
    resp_taskowner = await selectSql(taskOwner_sql);

    let framework_sql = `SELECT master.accounts.org_id,master.accounts.account_id,master.project_config.project_id,config_type,config_value from master.accounts JOIN master.projects using (account_id) JOIN master.project_config using (project_id) where master.project_config.config_type = 'framework' AND master.projects.project_id = ${project_id} order by master.accounts.account_id DESC
    `
    resp_frameworks = await selectSql(framework_sql);

    let servicePartner_sql = `SELECT org_id,master.orgs.type as org_type,master.orgs.name as org_name,master.orgs.logo as org_logo,emp_id,org_employees.name as full_name
    ,org_employees.email as email, org_employees.status as status FROM master.orgs 
    JOIN master.org_employees using (org_id) 
    JOIN master.accounts using (org_id)
    JOIN master.projects using (account_id)
    where master.projects.project_id = ${project_id} 
    and master.orgs.type in ((SELECT id::text FROM reference.org_types where reference.org_types.type = 'service partner'))
    `
    resp_servicePartner = await selectSql(servicePartner_sql);

    let thirdPartyConnector_sql = `SELECT project_id,account_id,org_id,config_id,config_value,config_type from master.accounts 
    join master.projects using (account_id)
    join master.project_config using (project_id)
    where master.project_config.config_type = 'third_party_connector' AND master.projects.project_id = ${project_id}  order by master.accounts.account_id DESC`
    resp_thirdPartyConnector = await selectSql(thirdPartyConnector_sql);

  }



  res.send({
    "accounts_and_projects": resp_project_account.results,
    "keymembers": resp_keymemebers.results,
    "task_owners": resp_taskowner.results,
    "frameworks": resp_frameworks.results,
    "service_partners": resp_servicePartner.results,
    "third_part_connectors": resp_thirdPartyConnector.results
  });


})



export default router;