import postgress from '../init/pgclient.js';

export const selectSql = async (sql) => {
    return new Promise((resolve, reject) => {
        try {
            //console.log(sql);
            postgress.query(sql, function (error, results) {
                if (error) {
                    console.log(error);
                    resolve({ status_code: 'air404', message: 'Error in query' });
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
                    resolve({ status_code: 'air404', message: error.sqlMessage });
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
                    resolve({ status_code: 'air404', message: error.sqlMessage });
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


export const callProdecure = async () => {
    return new Promise((resolve, reject) => {
        try {
            postgress.query(sql, function (error, results) {
                if (error) {
                    resolve({ status_code: 'air404', message: error.sqlMessage });
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