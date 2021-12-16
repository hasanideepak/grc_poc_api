import express from 'express';
import { selectSql } from '../utils/pg_helper.js';

const router = express.Router();

router.get('/getOrgs', async (req,res) => {
    let sql = `select org_id,name,logo from master.orgs`;
    let resp = await selectSql(sql);
    res.send(resp);
})
export default router;