import express from 'express';
import { selectSql,insertSql } from '../utils/pg_helper.js';

const router = express.Router();

router.post('/setupAccount', async (req,res) => {
  const  {account_name,project_name,org_id} = req.body;
    const  user_id = req.headers.user_id
    let sql = `CALL master.ups_setup_account('${account_name}','${project_name}',${org_id},${user_id})`;
    let resp = await selectSql(sql);
    res.send(resp);
    
})

router.post('/addFramework', async (req,res) => {
  const  {project_id,framework_ids} = req.body;
    const configType = 'framework';
    const status = 'A';
    const user_id = req.headers.user_id;
    let frameworkIds = JSON.stringify(framework_ids);
    let sql = `insert into master.project_config (project_id,config_type,config_value,status,created_on,created_by)
    values (${project_id},'${configType}','${frameworkIds}','${status}',NOW(),${user_id})`;
    let resp = await insertSql(sql);
    res.send(resp);
    
})

router.post('/setupKeyMember', async (req,res) => {
  const  {email,org_id,project_id,role_id} = req.body;
    const  user_id = req.headers.user_id
    let sql = `CALL master.ups_setup_keymember('${email}',${org_id},${project_id},${role_id},${user_id})`;
    let resp = await selectSql(sql);
    res.send(resp);
    
})



export default router;