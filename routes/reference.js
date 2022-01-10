import express from 'express';
import { selectSql,insertSql } from '../utils/pg_helper.js';

const router = express.Router();

router.get('/getFrameworks', async (req,res) => {
    let sql = `select id,name from reference.frameworks`;
    let resp = await selectSql(sql);
    res.send(resp);
})
router.get('/getDepartments', async (req,res) => {
    let sql = `select id,name from reference.departments`;
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

router.post('/addFramework', async (req,res) => {
    const { framework_name } = req.body;
    let sql = `insert into reference.frameworks (name) values ('${framework_name}')`;
    let resp = await insertSql(sql);
    res.send(resp);
})
export default router;