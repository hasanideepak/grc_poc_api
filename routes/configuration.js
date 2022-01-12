import express from 'express';
import { selectSql, insertSql } from '../utils/pg_helper.js';

const router = express.Router();

router.post('/setupAccount', async (req, res) => {
  const { account_name, project_name, org_id } = req.body;
  const user_id = req.headers.user_id
  let sql = `CALL master.usp_setup_account('${account_name}','${project_name}',${org_id},${user_id})`;
  let resp = await selectSql(sql);
  res.send(resp);

})

router.post('/addProjectFrameworks', async (req, res) => {
  const { project_id, framework_ids } = req.body;
  const configType = 'framework';
  const status = 'A';
  const user_id = req.headers.user_id;
  let frameworkIds = JSON.stringify(framework_ids);

  framework_ids.forEach(async (item) => {
    let sql = `insert into master.project_config (project_id,config_type,config_value,status,created_on,created_by)
      values (${project_id},'${configType}','${item}','${status}',NOW(),${user_id})`;
    let resp = await insertSql(sql);
    res.send(resp);
  });


})

router.post('/addKeyMember', async (req, res) => {
  const { email, org_id, project_id } = req.body;
  const user_id = req.headers.user_id
  let sql = `CALL master.usp_setup_keymember('${email}',${org_id},${project_id},${user_id})`;
  let resp = await selectSql(sql);
  res.send(resp);

})

router.post('/addServicePartner', async (req, res) => {
  const { email, full_name, project_id} = req.body;
  const user_id = req.headers.user_id
  let sql = `CALL master.usp_add_service_partner('${email}','${full_name}',${project_id},${user_id})`;
  let resp = await selectSql(sql);
  res.send(resp);

})

router.post('/addTaskOwner', async (req, res) => {
  const { email, first_name, last_name,org_id, project_id} = req.body;
  const user_id = req.headers.user_id
  let sql = `CALL master.usp_add_task_owner('${email}','${first_name}','${last_name}',${org_id},${project_id},${user_id})`;
  let resp = await selectSql(sql);
  res.send(resp);

})



export default router;