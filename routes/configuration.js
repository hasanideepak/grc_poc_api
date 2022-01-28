import express from 'express';
import { selectSql, insertSql, updateSql, RecordExist } from '../utils/pg_helper.js';
const router = express.Router();
import error_resp from '../constants/errors.js'
import { getScopeDetails } from '../utils/helper.js';

router.post('/setupAccount', async (req, res) => {
  const { account_name, project_name, org_id } = req.body;
  const user_id = req.headers.user_id, schema_nm = req.headers.schema_nm;
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
      values (${project_id},'${configType}','${item}','${status}',NOW(),${user_id}) 
      on conflict (project_id,config_type,config_value) do update set status ='${status}',last_upd_on = NOW(),last_upd_by = ${user_id}`;
    resp = await insertSql(sql);
    //insert into project tasks
    let project_task_sql = `insert into ${schema_nm}.project_tasks(project_id,framework_control_id,framework_id,criteria_id,control_category,domain_id,ref_task_id,frequency_duration,frequency_unit,
    evidence_type_id,is_redo,responsible_authority,approval_authority,status,task_status,task_source,created_on,created_by)
    select ${project_id},fc2.framework_control_id,fc2.framework_id,fc2.criteria_id,fc2.control_category,fc2.domain_id,fc2.task_id,fc2.frequency_duration,fc2.frequency_unit,
    fc2.evidence_type_id,fc2.is_redo,fc2.responsible_authority,fc2.approval_authority,fc2.status,'pending','internal',now(),${user_id} from reference.framework_controls fc2 where fc2.framework_control_id in (select xfc.int_framework_control_id
    from reference.framework_controls fc, reference.x_framework_controls xfc where fc.framework_id = ${item} and xfc.ext_framework_control_id = fc.framework_control_id )`
    await insertSql(project_task_sql);

  });

  res.send({ status_code: 'air200', message: 'Success' });

})

router.post('/addKeyMember', async (req, res) => {
  const { email, org_id, project_id, authority_id, first_name, last_name } = req.body;
  const user_id = req.headers.user_id, schema_nm = req.headers.schema_nm;
  let sql = `CALL ${schema_nm}.usp_setup_keymember('${email}',${org_id},${project_id},${authority_id},${user_id},'${first_name}','${last_name}','${schema_nm}')`;
  let resp = await selectSql(sql);
  sql = `select emp_id from ${schema_nm}.org_employees where email = '${email}'`
  let resp1 = await selectSql(sql);
  resp.emp_id = resp1.results[0].emp_id;
  delete resp.results;
  res.send(resp);

})

router.post('/addServicePartner', async (req, res) => {
  const { email, first_name, last_name, project_id } = req.body;
  const user_id = req.headers.user_id, schema_nm = req.headers.schema_nm;
  let sql = `CALL ${schema_nm}.usp_add_service_partner('${email}','${first_name}','${last_name}',${project_id},${user_id},'${schema_nm}')`;
  let resp = await selectSql(sql);
  sql = `select emp_id from ${schema_nm}.org_employees where email = '${email}'`
  let resp1 = await selectSql(sql);
  resp.emp_id = resp1.results[0].emp_id;
  delete resp.results;
  res.send(resp);

})

router.post('/addTaskOwner', async (req, res) => {
  const { email, first_name, last_name, org_id, project_id, authority_id } = req.body;
  const user_id = req.headers.user_id, schema_nm = req.headers.schema_nm;
  let sql = `CALL ${schema_nm}.usp_add_task_owner('${email}','${first_name}','${last_name}',${org_id},${project_id},${authority_id},${user_id},'${schema_nm}')`;
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


  let connectorIds = JSON.stringify(connector_ids)
  let resp = '';
  let updateQuery = `update ${schema_nm}.project_config set status = 'D' where project_id = ${project_id} and config_type = '${configType}'`
  let respUpdate = await updateSql(updateQuery)

  connector_ids.forEach(async (item) => {
    let sql = `insert into ${schema_nm}.project_config (project_id,config_type,config_value,status,created_on,created_by)
      values (${project_id},'${configType}','${item}','${status}',NOW(),${user_id}) 
      on conflict (project_id,config_type,config_value) do update set status ='${status}',last_upd_on = NOW(),last_upd_by = ${user_id}`;
    resp = await insertSql(sql);
  });
  res.send({ status_code: 'air200', message: 'Success' });

})

router.delete('/deleteKeyMember', async (req, res) => {
  const { org_id, emp_id, project_id } = req.body;
  const schema_nm = req.headers.schema_nm;
  let sql = `CALL ${schema_nm}.usp_delete_keymember(${org_id},${emp_id},${project_id},'${schema_nm}')`;
  let resp = await selectSql(sql);
  res.send(resp);
})

router.delete('/deleteTaskOwner', async (req, res) => {
  const { org_id, emp_id, project_id } = req.body;
  const schema_nm = req.headers.schema_nm;
  let sql = `CALL ${schema_nm}.usp_delete_task_owner(${org_id},${emp_id},${project_id},'${schema_nm}')`;
  let resp = await selectSql(sql);
  res.send(resp);
})

router.delete('/deleteServicePartner', async (req, res) => {
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

  let org_exist = await RecordExist('org_id', org_id, 'orgs', schema_nm);
  if (!org_exist) {
    res.status(error_resp.Invalid_Org_ID.http_status_code).send(error_resp.Invalid_Org_ID.error_msg);
  }

  if (typeof project_id == 'undefined') {
    let sql = `select a.name as account_name,b.name as project_name,b.project_id from ${schema_nm}.accounts a,${schema_nm}.projects b where a.org_id = ${org_id} and a.account_id = b.account_id order by b.project_id desc limit 1`;
    resp_project_account = await selectSql(sql);
    if (resp_project_account.results.length == 0) {
      res.status(error_resp.No_Record.http_status_code).send(error_resp.No_Record.error_msg);
    } else {
      pro_id = resp_project_account.results[0].project_id;
    }

  } else {
    let sql = `select a.name as account_name,b.name as project_name from ${schema_nm}.accounts a,${schema_nm}.projects b where a.org_id = ${org_id} and a.account_id = b.account_id and b.project_id = ${project_id}`;
    resp_project_account = await selectSql(sql);
    pro_id = project_id;
  }
  let keymember_sql = `select a.emp_id,a.email,c.name as department_name,a.first_name,a.last_name from ${schema_nm}.org_employees a ,reference.authority c, ${schema_nm}.x_project_emp d
  where d.authority_id = c.id and c.is_management = 'Y' and d.emp_id = a.emp_id and d.project_id = ${pro_id} group by a.emp_id,c.name`
  resp_keymemebers = await selectSql(keymember_sql);

  let taskOwner_sql = `select a.emp_id,a.email,c.name as department_name,a.first_name,a.last_name from ${schema_nm}.org_employees a ,reference.authority c, ${schema_nm}.x_project_emp d
  where d.authority_id = c.id and c.is_management = 'N' and d.emp_id = a.emp_id and d.project_id = ${pro_id} group by a.emp_id,c.name`
  resp_taskowner = await selectSql(taskOwner_sql);

  let framework_sql = `SELECT a.id,a.name,case coalesce(b.config_value,'') when '' then 'N' else 'Y' end as is_selected from ${schema_nm}.project_config b right join reference.frameworks a on cast(b.config_value as integer) = a.id and b.project_id = ${pro_id} and b.config_type = 'framework' and b.status ='A' where a.source = 'standard'`
  resp_frameworks = await selectSql(framework_sql);

  let servicePartner_sql = `select b.config_value as partner_id,c.emp_id,c.emp_id,c.email,c.first_name,c.last_name from ${schema_nm}.orgs a,${schema_nm}.project_config b, ${schema_nm}.org_employees c 
  where b.project_id = ${pro_id} and b.config_type = 'service_partner' and a.org_id = c.org_id and cast(b.config_value as integer) = c.org_id`
  resp_servicePartner = await selectSql(servicePartner_sql);

  let thirdPartyConnector_sql = `SELECT a.id,a.name,case coalesce(b.config_value,'') when '' then 'N' else 'Y' end as is_selected,case coalesce(b.additional_info,'') when '' then 'N' else 'Y' end as is_token_added,coalesce(right(b.additional_info,3),'') as token from ${schema_nm}.project_config b right join reference.third_party_connectors a on cast(b.config_value as integer) = a.id and b.project_id = ${pro_id} and b.config_type = 'third_party_connector' and b.status = 'A'`
  resp_thirdPartyConnector = await selectSql(thirdPartyConnector_sql);

  res.send({
    status_code: 'air200', message: 'Success',
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

router.get('/getThirdPartyConnectors/:project_id', async (req, res) => {
  const { project_id } = req.params;
  const schema_nm = req.headers.schema_nm;
  let sql = `select a.config_value as connector_id,b.name from ${schema_nm}.project_config a,reference.third_party_connectors b where a.project_id = ${project_id} and a.config_type = 'third_party_connector' and a.status = 'A' and cast(a.config_value as integer) = b.id`;
  let resp = await selectSql(sql);
  res.send(resp);
});

router.post('/addPeople', async (req, res) => {
  const { project_id, employees, consultants } = req.body;
  const schema_nm = req.headers.schema_nm, user_id = req.headers.user_id;
  let sql = `select config_value from ${schema_nm}.project_config where config_type = 'employees' and project_id = ${project_id}`;
  let resp = await selectSql(sql);
  if (resp.results.length > 0) {
    sql = `update ${schema_nm}.project_config set config_value = '${employees}',last_upd_on = now(), last_upd_by = '${user_id}' where config_type = 'employees' and project_id = ${project_id}`;
    resp = await updateSql(sql);
    sql = `update ${schema_nm}.project_config set config_value = '${consultants}',last_upd_on = now(), last_upd_by = '${user_id}' where config_type = 'consultants' and project_id = ${project_id}`;
    resp = await updateSql(sql);
  } else {
    sql = `insert into ${schema_nm}.project_config(project_id,config_type,config_value,status,created_on,created_by)
            values(${project_id},'employees','${employees}','A',now(),'${user_id}'),
            (${project_id},'consultants','${consultants}','A',now(),'${user_id}')`;
    resp = await insertSql(sql);
  }
  res.send(resp);
});

router.post('/addTechnologyAssets', async (req, res) => {
  const { project_id, endpoints, servers, mobile_devices } = req.body;
  const schema_nm = req.headers.schema_nm, user_id = req.headers.user_id;
  let sql = `select config_value from ${schema_nm}.project_config where config_type = 'endpoints' and project_id = ${project_id}`;
  let resp = await selectSql(sql);
  if (resp.results.length > 0) {
    sql = `update ${schema_nm}.project_config set config_value = '${endpoints}',last_upd_on = now(), last_upd_by = '${user_id}' where config_type = 'endpoints' and project_id = ${project_id}`;
    resp = await updateSql(sql);
    sql = `update ${schema_nm}.project_config set config_value = '${servers}',last_upd_on = now(), last_upd_by = '${user_id}' where config_type = 'servers' and project_id = ${project_id}`;
    resp = await updateSql(sql);
    sql = `update ${schema_nm}.project_config set config_value = '${mobile_devices}',last_upd_on = now(), last_upd_by = '${user_id}' where config_type = 'mobile_devices' and project_id = ${project_id}`;
    resp = await updateSql(sql);
  } else {
    sql = `insert into ${schema_nm}.project_config(project_id,config_type,config_value,status,created_on,created_by)
            values(${project_id},'endpoints','${endpoints}','A',now(),'${user_id}'),
            (${project_id},'servers','${servers}','A',now(),'${user_id}'),
            (${project_id},'mobile_devices','${mobile_devices}','A',now(),'${user_id}')`;
    resp = await insertSql(sql);
  }
  res.send(resp);
});

router.post('/addVendor', async (req, res) => {
  const { project_id, vendor } = req.body;
  const schema_nm = req.headers.schema_nm, user_id = req.headers.user_id;
  let sql = `select config_value from ${schema_nm}.project_config where config_type = 'vendor' and config_value = '${vendor}' and project_id = ${project_id}`;
  let resp = await selectSql(sql);
  if (resp.results.length > 0) {
    res.status(error_resp.Vendor_Exists.http_status_code).send(error_resp.Vendor_Exists.error_msg);
  } else {
    sql = `insert into ${schema_nm}.project_config(project_id,config_type,config_value,status,created_on,created_by)
            values(${project_id},'vendor','${vendor}','A',now(),'${user_id}')`;
    resp = await insertSql(sql);
    res.send(resp);
  }
});

router.get('/getThirdPartyUtilities/:project_id', async (req, res) => {
  const { project_id } = req.params;
  const user_id = req.headers.user_id, schema_nm = req.headers.schema_nm;
  let sql = `SELECT a.id,a.name,case coalesce(b.config_value,'') when '' then 'N' else 'Y' end as is_selected from ${schema_nm}.project_config b right join reference.third_party_utilities a on cast(b.config_value as integer) = a.id and b.project_id = ${project_id} and b.config_type = 'third_party_utility' and b.status = 'A' where (a.source = 'standard' or a.created_by = '${user_id}')`;
  let resp = await selectSql(sql);
  res.send(resp);
});

router.post('/createThirdPartyUtility', async (req, res) => {
  const { utility_name } = req.body;
  const user_id = req.headers.user_id;
  let sql = `insert into reference.third_party_utilities(name,status,source,created_on,created_by) values('${utility_name}','A','custom',now(),'${user_id}')`;
  let resp = await insertSql(sql);
  res.send(resp);
});

router.post('/addThirdPartyUtilities', async (req, res) => {
  const { project_id, utility_ids } = req.body;
  const configType = 'third_party_utility';
  const status = 'A';
  const user_id = req.headers.user_id, schema_nm = req.headers.schema_nm;


  let utilityIds = JSON.stringify(utility_ids)
  let resp = '';
  let updateQuery = `update ${schema_nm}.project_config set status = 'D' where project_id = ${project_id} and config_type = '${configType}'`
  let respUpdate = await updateSql(updateQuery)

  utility_ids.forEach(async (item) => {
    let sql = `insert into ${schema_nm}.project_config (project_id,config_type,config_value,status,created_on,created_by)
      values (${project_id},'${configType}','${item}','${status}',NOW(),${user_id}) 
      on conflict (project_id,config_type,config_value) do update set status ='${status}',last_upd_on = NOW(),last_upd_by = ${user_id}`;
    resp = await insertSql(sql);
  });
  res.send({ status_code: 'air200', message: 'Success' });
});

router.get('/getScopeDetails/:project_id', async (req, res) => {
  const { project_id } = req.params;
  const user_id = req.headers.user_id, schema_nm = req.headers.schema_nm;

  let [peoples, technology_assets, vendors, third_party_utilities] = await getScopeDetails(user_id, schema_nm, project_id)
  res.send({
    status_code: 'air200', message: 'Success',
    peoples: peoples,
    technology_assets: technology_assets,
    vendors: vendors,
    third_party_utilities: third_party_utilities
  });
});

router.delete('/deleteVendorById/:id', async (req, res) => {
  const { id } = req.params;
  const schema_nm = req.headers.schema_nm;

  let sql = `delete from ${schema_nm}.project_config where config_id = ${id}`;
  let resp = await updateSql(sql);
  res.send(resp);
})


export default router;