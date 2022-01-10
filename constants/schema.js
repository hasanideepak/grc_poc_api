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
                "framework_name": {"type":"string","minLength":2}
            },
            "required": ["framework_name"],
            // "message": "Custom message"
        }
    },

   
};

Object.freeze(SCHEMAS);

export default SCHEMAS;