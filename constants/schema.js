const SCHEMAS = {
    // Start Order Route Schema
    'login': {
        schema:
        {
            "type": "object",
            "properties": {
                "email": {"type":"string","minLength":4},
                "password": {"type": "sring","minLength": 1}
            },
            "required": ["email", "password"],
            // "message": "Custom message"
        }
    },
    'addProjectFrameworks': {
        schema:
        {
            "type": "object",
            "properties": {
                "project_id": {"type":"number","minLength":1},
                "framework_ids": {"type":"array"}
            },
            "required": ["project_id","framework_ids"],
            // "message": "Custom message"
        }
    },
    'setupAccount': {
        schema:
        {
            "type": "object",
            "properties": {
                "account_name": {"type":"string","minLength":2},
                "project_name": {"type":"string","minLength":2},
                "org_id":{"type":"number","minLength":1}
            },
            "required": ["account_name","project_name","org_id"],
            // "message": "Custom message"
        }
    },
    'addKeyMember': {
        schema:
        {
            "type": "object",
            "properties": {
                "email": {"type":"string","minLength":2},
                "project_id": {"type":"number","minLength":1},
                "org_id":{"type":"number","minLength":1},
                "authority_id":{"type":"number","minLength":1}
            },
            "required": ["email","project_id","org_id"],
            // "message": "Custom message"
        }
    },
    'addServicePartner': {
        schema:
        {
            "type": "object",
            "properties": {
                "email": {"type":"string","minLength":2},
                "project_id": {"type":"number","minLength":1},
                "full_name":{"type":"string","minLength":3}
            },
            "required": ["email","project_id","full_name"],
            // "message": "Custom message"
        }
    },
    'addTaskOwner': {
        schema:
        {
            "type": "object",
            "properties": {
                "email": {"type":"string","minLength":2},
                "first_name": {"type":"string","minLength":2},
                "last_name": {"type":"string","minLength":2},
                "project_id": {"type":"number","minLength":1},
                "org_id":{"type":"number","minLength":1},
                "authority_id":{"type":"number","minLength":1},
            },
            "required": ["email","project_id","org_id","first_name","last_name","authority_id"],
            // "message": "Custom message"
        }
    },
    'addThirdPartyConnector': {
        schema:
        {
            "type": "object",
            "properties": {
                "project_id": {"type":"number","minLength":1},
                "connector_ids": {"type":"array"}
            },
            "required": ["connector_ids","project_id"],
            // "message": "Custom message"
        }
    },
    'deleteKeyMember': {
        schema:
        {
            "type": "object",
            "properties": {
                "org_id": {"type":"number","minLength":1},
                "emp_id": {"type":"number","minLength":1}
            },
            "required": ["org_id","emp_id"],
            // "message": "Custom message"
        }
    },
    'deleteTaskOwner': {
        schema:
        {
            "type": "object",
            "properties": {
                "org_id": {"type":"number","minLength":1},
                "emp_id": {"type":"number","minLength":1}
            },
            "required": ["org_id","emp_id"],
            // "message": "Custom message"
        }
    },
    'deleteServicePartner': {
        schema:
        {
            "type": "object",
            "properties": {
                "org_id": {"type":"number","minLength":1},
                "emp_id": {"type":"number","minLength":1}
            },
            "required": ["org_id","emp_id"],
            // "message": "Custom message"
        }
    },
    'addThirdPartyConnectorToken':{
        schema:
        {
            "type": "object",
            "properties": {
                "project_id": {"type":"number","minLength":1},
                "connector_id": {"type":"number","minLength":1},
                "token": {"type":"string","minLength":1}
            },
            "required": ["project_id","connector_id","token"],
            // "message": "Custom message"
        }
    },
    'forgot_password':{
        schema:
        {
            "type": "object",
            "properties": {
                "username": {"type":"string","minLength":1}
            },
            "required": ["username"],
            // "message": "Custom message"
        }
    },
    'reset_password':{
        schema:
        {
            "type": "object",
            "properties": {
                "password": {"type":"string","minLength":1},
                "token": {"type":"string","minLength":1}
            },
            "required": ["password","token"],
            // "message": "Custom message"
        }
    }

   
};

Object.freeze(SCHEMAS);

export default SCHEMAS;