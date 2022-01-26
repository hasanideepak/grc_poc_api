const error = {
    Bad_Credentials: { http_status_code: 404, error_msg: { statusCode: 'air404', message: 'Bad credentials' } },
    Invalid_Password: { http_status_code: 404, error_msg: { statusCode: 'air404', message: 'Valid password required..!' } },
    Email_Required: { http_status_code: 404, error_msg: { statusCode: 'air404', message: 'Email required..!' } },
    Invalid_Token: { http_status_code: 500, error_msg: { status_code: 'air500', message: 'Invalid token' } },
    Invalid_APIKEY: { http_status_code: 500, error_msg: { status_code: 'air500', message: 'Invalid apikey' } },
    Schema_Error: { http_status_code: 401, error_msg: { status_code: 'air401', message: 'Error occured in schema validation' } },
    Query_Error: { http_status_code: 404, error_msg: { status_code: 'air404', message: 'There is some technical issue, please try after some time' } },
    Invalid_Org_ID: { http_status_code: 404, error_msg: { statusCode: 'air404', message: 'Invalid Organization ID'} },
    Token_Expired: { http_status_code: 404, error_msg: { status_code: 'air404', message: 'Token is expired !' }},
    Vendor_Exists: { http_status_code: 404, error_msg: { status_code: 'air404', message: 'Vendor already exists' }},
    Invalid_User: { http_status_code: 404, error_msg: { status_code: 'air404', message: 'No user found..!' }}
}

Object.freeze(error);

export default error;