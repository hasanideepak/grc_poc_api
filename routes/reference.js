import express from 'express';
import { selectSql,insertSql } from '../utils/pg_helper.js';

const router = express.Router();

router.get('/getFrameworks', async (req,res) => {
    let sql = `select id,name from reference.frameworks where source = 'standard'`;
    let resp = await selectSql(sql);
    res.send(resp);
})
router.get('/getAuthorities/:is_management', async (req,res) => {
    const {is_management} = req.params;
    let sql = `select id,name from reference.authority where is_management = '${is_management}'`;
    let resp = await selectSql(sql);
    res.send(resp);
})

router.get('/getOrgTypes', async (req,res) => {
    let sql = `select id,type from reference.org_types`;
    let resp = await selectSql(sql);
    res.send(resp);
})

router.get('/getRoles', async (req,res) => {
    let sql = `select id,name from reference.roles`;
    let resp = await selectSql(sql);
    res.send(resp);
})

router.get('/getThirdPartyConnectors', async (req,res) => {
    let sql = `select id,name as value from reference.third_party_connectors where status ='A'`;
    let resp = await selectSql(sql);
    res.send(resp);
})

router.get('/getModules', async (req,res) => {
    let sql = `select module_id,module_name,status from reference.modules where status ='A'`;
    let resp = await selectSql(sql);
    res.send(resp);
})

router.get('/getControlDomains', async (req,res) => {
    let sql = `select id,name,status from reference.domains where status ='A'`;
    let resp = await selectSql(sql);
    res.send(resp);
})

router.get('/getControlCriteria', async (req,res) => {
    let sql = `select id,name, status from reference.criteria where status ='A'`;
    let resp = await selectSql(sql);
    res.send(resp);
})

export default router;