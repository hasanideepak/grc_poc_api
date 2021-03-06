import schema from '../constants/schema.js';
import Validator from 'jsonschema';
const validatorObj = new Validator.Validator();
import error_resp from '../constants/errors.js'

export const schemaValidator = async (req) => {
    return new Promise((resolve, reject) => {
        try {
            let subApiName = req.path.replace('/','');
            subApiName = subApiName.split('/')[0];

            if(subApiName == 'uploadEvidence' || subApiName == 'logout'){
                resolve({ status_code: 'air200',message:'Success'});
            }

            if(schema[subApiName] != undefined){

                let schemaObj = schema[subApiName].schema;
                
                try {
                    validatorObj.validate(req.body, schemaObj, { required: true, "throwError": true });
                    resolve({ status_code: 'air200',message:'Success'});
                } catch (error) {
                    // console.log(error)
                    resolve({ status_code: 'air401', message: error['path'] + ' ' + error.message });
                }
        }else{
            resolve(error_resp.Schema_Error.error_msg);
        }

        } catch (error) {
            console.log(error);
            reject('')
            console.error(`Error occured in schema validation ${error}`);
        }
    })
}