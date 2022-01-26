const error = {
    Bad_Credentials: { http_status_code: 401, error_msg: { statusCode: 'air401', message: 'Bad credentials' } },
    Invalid_Password: { http_status_code: 400, error_msg: { statusCode: 'air400', message: 'Valid password required..!' } },
    Email_Required: { http_status_code: 400, error_msg: { statusCode: 'air400', message: 'Email required..!' } },
    Invalid_Token: { http_status_code: 401, error_msg: { status_code: 'air401', message: 'Invalid token' } },
    Invalid_APIKEY: { http_status_code: 401, error_msg: { status_code: 'air401', message: 'Invalid apikey' } },
    Schema_Error: { http_status_code: 422, error_msg: { status_code: 'air422', message: 'Error occured in schema validation' } },
    Query_Error: { http_status_code: 502, error_msg: { status_code: 'air502', message: 'There is some technical issue, please try after some time' } },
    Invalid_Org_ID: { http_status_code: 400, error_msg: { statusCode: 'air400', message: 'Invalid Organization ID'} },
    Token_Expired: { http_status_code: 401, error_msg: { status_code: 'air401', message: 'Token is expired !' }},
    Vendor_Exists: { http_status_code: 409, error_msg: { status_code: 'air409', message: 'Vendor already exists' }},
    Invalid_User: { http_status_code: 404, error_msg: { status_code: 'air404', message: 'No user found..!' }},
    No_Record: { http_status_code: 404, error_msg: { status_code: 'air404', message: 'No record found..!' }}
}

Object.freeze(error);

export default error;