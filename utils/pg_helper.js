import postgress from '../init/pgclient.js';
import error_resp from '../constants/errors.js'

export const selectSql = async (sql) => {
    return new Promise((resolve, reject) => {
        try {
            //console.log(sql);
            postgress.query(sql, function (error, results) {
                if (error) {
                    console.log(error);
                    resolve(error_resp.Query_Error.error_msg.toString().replace('<error_msg>', error.detail));
                } else {
                    resolve({ status_code: 'air200', message: 'Success', results: results.rows });
                }
            });
        } catch (error) {
            reject('')
            console.error(`Error occured in select query ${error}`);
        }
    })
}

export const updateSql = async (sql) => {
    return new Promise((resolve, reject) => {
        try {
            postgress.query(sql, function (error, results) {
                if (error) {
                    resolve(error_resp.Query_Error.error_msg.toString().replace('<error_msg>', error.detail));
                } else {
                    resolve({ status_code: 'air200', message: 'Success', rows_affected: results.affectedRows });
                }
            });
        } catch (error) {
            reject('')
            console.error(`Error occured in addLocation ${error}`);
        }
    })
}

export const insertSql = async (sql) => {
    return new Promise((resolve, reject) => {
        try {
            postgress.query(sql, function (error, results) {
                if (error) {
                    resolve(error_resp.Query_Error.error_msg.toString().replace('<error_msg>', error.detail));
                } else {
                    // console.log(results)
                    resolve({ status_code: 'air200', message: 'Success', message_id: results.rows[0] });
                }
            });
        } catch (error) {
            reject('')
            console.error(`Error occured in addLocation ${error}`);
        }
    })
}


export const callProdecure = async () => {
    return new Promise((resolve, reject) => {
        try {
            postgress.query(sql, function (error, results) {
                if (error) {
                    resolve(error_resp.Query_Error.error_msg.toString().replace('<error_msg>', error.detail));
                } else {
                    console.log(results)
                    resolve({ status_code: 'air200', message: 'Success', message_id: results.rows[0] });
                }
            });
        } catch (error) {
            reject('')
            console.error(`Error occured in addLocation ${error}`);
        }
    })
}

export const RecordExist = async (fieldName, fieldValue,tableName,schema_nm) => {
    return new Promise((resolve, reject) => {
        try {
            postgress.query(`select * from ${schema_nm}.${tableName} where ${fieldName} = ${fieldValue}`, function (error, results) {
                if (error) {
                    resolve(error_resp.Query_Error.error_msg.toString().replace('<error_msg>', error.detail));
                } else {
                    if(results.rows.length > 0){
                        resolve(results.rows)
                    }else{
                        resolve(false);
                    }
                    
                }
            });
        } catch (error) {
            reject('')
            console.error(`Error occured ${error}`);
        }
    })
}