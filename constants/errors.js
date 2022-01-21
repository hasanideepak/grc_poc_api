const error = {
    Bad_Credentials: { status_code: 404, error_msg: { statusCode: 'air404', message: 'Bad credentials' } },
    Invalid_Password: { status_code: 404, error_msg: { statusCode: 'air404', message: 'Valid password required..!' } },
    Email_Required: { status_code: 404, error_msg: { statusCode: 'air404', message: 'Email required..!' } },
    Invalid_Token: { status_code: 500, error_msg: { status_code: 'air500', message: 'Invalid token' } },
    Invalid_APIKEY: { status_code: 500, error_msg: { status_code: 'air500', message: 'Invalid apikey' } },
    Schema_Error: { status_code: 401, error_msg: { status_code: 'air401', message: 'Error occured in schema validation' } },
    Query_Error: { status_code: 404, error_msg: { status_code: 'air404', message: 'There is some technical issue, please try after some time', error:'<error_msg>' } },
    Invalid_Org_ID: { status_code: 404, error_msg: { statusCode: 'air404', message: 'Invalid Organization ID'} },
    Token_Expired: { status_code: 404, error_msg: { status_code: 'air404', message: 'Token is expired !' }}
}

Object.freeze(error);

export default error;