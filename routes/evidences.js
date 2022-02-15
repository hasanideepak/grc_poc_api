import express from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import { generateUUID } from '../utils/helper.js';
import path from 'path';
import error_resp from '../constants/errors.js'
import { insertSql, selectSql } from '../utils/pg_helper.js';

const router = express.Router();

let storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '');
    }
});

let multipleUpload = multer({ storage: storage }).any();
let upload = multer({ storage: storage }).single('file');

const BUCKET_NAME = process.env.S3_BUCKET;
const IAM_USER_KEY = process.env.S3_KEY;
const IAM_USER_SECRET = process.env.S3_SECRET;

router.post('/uploadEvidence/:evidence_type/:project_task_id', multipleUpload, async (req, res) => {
    const file = req.files;
    const { evidence_type, project_task_id } = req.params;
    const schema_nm = req.headers.schema_nm, user_id = req.headers.user_id;
    let ResponseData = [];

    let s3 = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        // Bucket: 'BUCKET_NAME'
    });

    file.map(async (item) => {
        let file_name = await generateUUID();
        let ext = path.extname(item.originalname);
        let original_file_name = item.originalname;
        let myKey = `${file_name}${ext}`;
        let params = {
            Bucket: BUCKET_NAME,
            Key: myKey,
            Body: item.buffer
        };

        s3.upload(params, async function (err, data) {
            if (err) {
                res.status(error_resp.File_Upload_Error.http_status_code).send(error_resp.File_Upload_Error.error_msg);
            } else {
                ResponseData.push(data);
                let sql = `insert into ${schema_nm}.project_task_evidence(project_task_id,evidence_type_id,collection_type,evidence_value,original_file_name,status,created_on,created_by)
                               values(${project_task_id},${evidence_type},'manual','${myKey}','${original_file_name}','A',now(),'${user_id}')`;
                let resp = await insertSql(sql);
                if (ResponseData.length == file.length) {
                    res.status(200).send({ status_code: 'air200', message: 'Success' });
                }
            }
        })
    })
});
router.get('/listEvidences/:project_id', async (req,res) => {
    const { project_id } = req.params;
    const schema_nm = req.headers.schema_nm,api_url = process.env.API_URL;
    let project_id_cond = '';
    project_id_cond = project_id == '-1' ? '' : ` and pt.project_id = ${project_id}`;
    let sql = `select pt.project_task_id, pte.original_file_name as file_name, to_char(pte.created_on ,'Mon DD, YYYY') as uploaded_on,concat(oe.first_name,' ',oe.last_name) as uploaded_by,
    concat('${api_url}','evidences/getEvidence/',split_part(pte.evidence_value,'.',1)) as evidence_url, etype.name as evidence_type 
    from ${schema_nm}.project_tasks pt , ${schema_nm}.project_task_evidence pte, ${schema_nm}.users u , ${schema_nm}.org_employees oe, reference.evidence_type etype 
    where pt.project_task_id = pte.project_task_id ${project_id_cond} and u.org_emp_id = oe.emp_id and cast(pte.created_by as integer) = u.user_id and pte.evidence_type_id = etype.id`
    let resp = await selectSql(sql);
    res.send(resp);
})
router.get('/getEvidence/:file', async (req, res) => {
    const { file } = req.params;
    const schema_nm = req.headers.schema_nm;
    let sql = `SELECT split_part(pte.evidence_value,'.',2) AS ext,pte.evidence_value as file_name FROM ${schema_nm}.project_task_evidence pte where evidence_value like '${file}.%'`
    let resp = await selectSql(sql);
    if (resp.results.length > 0) {
        let file_name = resp.results[0].file_name, ext = resp.results[0].ext;
        let s3 = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET,
            // region: process.env.AWS_REGION,
        });
        let params = { Bucket: BUCKET_NAME, Key: file_name };
        let output = await new Promise((resolve, reject) => {
            s3.getObject(params, function (err, data) {
                if (!err)
                    return resolve(data.Body);
            });
        });
        // console.log(ext);
        if (ext == 'pdf') {
            res.setHeader('Content-Type', 'application/pdf');
        } else if (ext == 'doc') {
            res.setHeader('Content-Type', 'application/msword');
        } else if (ext == 'docx') {
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        } else {
            res.setHeader('Content-Type', `image/${ext}`);
        }
        // res.setHeader('Content-Disposition', 'attachment');
        res.status(200).send(output);
    }
})
export default router;