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
    'addFramework': {
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
    'setupKeyMember': {
        schema:
        {
            "type": "object",
            "properties": {
                "email": {"type":"string","minLength":2},
                "role_id": {"type":"number","minLength":2},
                "project_id": {"type":"number","minLength":2},
                "org_id":{"type":"number","minLength":1}
            },
            "required": ["email","role_id","project_id","org_id"],
            // "message": "Custom message"
        }
    }

   
};

Object.freeze(SCHEMAS);

export default SCHEMAS;