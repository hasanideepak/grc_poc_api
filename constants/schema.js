const SCHEMAS = {
    // Start Order Route Schema
    'addToCart': {
        schema:
        {
            "type": "object",
            "properties": {
                "order_entity": ["I"],
                "order_entity_id": {"type": "number","minLength": 1},
                "usage_type": {
                    "enum": ["C", "B"]
                },
                "package_id": { "type": "number", "minLength": 1 },
                "service_id": { "type": "number", "minLength": 1 },
                "order_detail_amount": { "type": "number", "minLength": 1 },
            },
            "required": ["order_entity", "order_entity_id", "usage_type", "package_id", "service_id", "order_detail_amount"],
            "message": "Custom message"
        }
    },

    'getCartDetails': {
        schema:
        {
            "type": "object",
            "properties": {
                "order_entity": ["I"],
                "order_entity_id": { "type": "number", "minLength": 1 },
            },
            "required": ["order_entity", "order_entity_id"]
        }
    },

    'getCartTotal': {
        schema:
        {
            "type": "object",
            "properties": {
                "order_entity": ["I"],
                "order_entity_id": { "type": "number", "minLength": 1 },
            },
            "required": ["order_entity", "order_entity_id"]
        }
    },

    'checkout': {
        schema:
        {
            "type": "object",
            "properties": {
                "order_id": { "type": "number", "minLength": 1 },
                "institution_id": { "type": "number", "minLength": 1 },
                "card_id": { "type": "string", "minLength": 10 },
            },
            "required": ["order_id", "institution_id", "card_id"]
        }
    },

    'manualCharge': {
        schema:
        {
            "type": "object",
            "properties": {
                "customer_id": { "type": "string"},
                "card_id": { "type": "string" },
                "amount": { "type": "string" },

            },
            "required": ["customer_id", "card_id", "amount"]
        }
    },

    'oneTimeCharge': {
        schema:
        {
            "type": "object",
            "properties": {
                "card_number": { "type": "number", "minLength": 16, "maxLength": 20 },
                "cvc": { "type": "number", "minLength": 3, "maxLength": 4 },
                "amount": { "type": "number", "minLength": 1 },

            },
            "required": ["card_number", "cvc", "amount"]
        }
    },
    // End Order Route Schema


    // Start Applicant Route Schema
    'addNote': {
        schema:
        {
            "type": "object",
            "properties": {
                "notes": { "type": "string", "minLength": 1 },
                "applicant_id": { "type": "number", "minLength": 1 },
                "job_id": { "type": "number", "minLength": 1 },
                "institution_id": { "type": "number", "minLength": 1 },
                "created_by": { "type": "number", "minLength": 1 },
            },
            "required": ["notes", "job_id", "applicant_id", "institution_id","created_by"]
        }
    },


    'editNote': {
        schema:
        {
            "type": "object",
            "properties": {
                "notes": { "type": "string", "minLength": 1 },
                "applicant_id": { "type": "number", "minLength": 1 },
                "job_id": { "type": "number", "minLength": 1 },
                "institution_id": { "type": "number", "minLength": 1 },
            },
            "required": ["notes", "job_id", "applicant_id", "institution_id"]
        }
    },

    'sendMessage': {
        schema:
        {
            "type": "object",
            "properties": {
                "message": { "type": "string", "minLength": 1 },
                "applicant_id": { "type": "number", "minLength": 1 },
                "job_id": { "type": "number", "minLength": 1 },
                "institution_id": { "type": "number", "minLength": 1 },
            },
            "required": ["message", "job_id", "applicant_id", "institution_id"]
        }
    },

    'sendMessageReply': {
        schema:
        {
            "type": "object",
            "properties": {
                "message": { "type": "string", "minLength": 1 },
                "from": {
                    "enum": ["I", "P"]
                },
                "message_id": { "type": "number", "minLength": 1 },
            },
            "required": ["message", "message_id","from"]
        }
    },

    'editApplicantRating': {
        schema:
        {
            "type": "object",
            "properties": {
                "rating": { "type": "string", "minLength": 1 },
                "applicant_id": { "type": "number", "minLength": 1 },
            },
            "required": ["rating", "applicant_id"]
        }
    },

    'updateApplicantStatus': {
        schema:
        {
            "type": "object",
            "properties": {
                "applicant_status": { "type": "string", "minLength": 1 },
                "applicant_id": { "type": "number", "minLength": 1 },
            },
            "required": ["applicant_status", "applicant_id"]
        }
    },
    // End Applicant Route Schema

    // Start Credential Route Schema
    'addCredential': {
        schema:
        {
            "type": "object",
            "properties": {
                "institution_id": { "type": "number", "minLength": 1 },
                "name": { "type": "string", "minLength": 1 },
                "slug": { "type": "string", "minLength": 1 },
                "credential_type": { "type": "string", "minLength": 1 },
                "requirement": { "type": "string", "minLength": 1 },
                "description": { "type": "string", "minLength": 1 },
                "credential_id": { "type": "number", "minLength": 1 },
                "class": { "type": "string", "minLength": 1 },
                "document_image": { "type": "string", "minLength": 1 },
            },
            "required": ["institution_id", "name", "slug", "credential_type", "requirement", "description", "credential_id", "class", "document_image"]
        }
    },

    'editCredential': {
        schema:
        {
            "type": "object",
            "properties": {
                "institution_id": { "type": "number", "minLength": 1 },
                "name": { "type": "string", "minLength": 1 },
                "slug": { "type": "string", "minLength": 1 },
                "credential_type": { "type": "string", "minLength": 1 },
                "requirement": { "type": "string", "minLength": 1 },
                "description": { "type": "string", "minLength": 1 },
                "credential_id": { "type": "number", "minLength": 1 },
                "class": { "type": "string", "minLength": 1 },
            },
            "required": ["institution_id", "name", "slug", "credential_type", "requirement", "description", "credential_id", "class"]
        }
    },

    'addAuthorisedCredential': {
        schema:
        {
            "type": "object",
            "properties": {
                "institution_id": { "type": "number", "minLength": 1 },
                "credential_id": { "type": "string", "minLength": 1 },
            },
            "required": ["institution_id", "credential_id"]
        }
    },

    'addCredentialSuggestion': {
        schema:
        {
            "type": "object",
            "properties": {
                "credential_name": { "type": "string", "minLength": 1 },
                "issuer_name": { "type": "string", "minLength": 1 }
            },
            "required": ["credential_name", "issuer_name"]
        }
    },
    // End Credential Route Schema

    // Start Setting Route Schema

    'getCredentialCheck': {
        schema:
        {
            "type": "object",
            "properties": {
                "institution_id": { "type": "number", "minLength": 1 },
                "profile_id": { "type": "number", "minLength": 1 },
            },
            "required": ["institution_id", "profile_id", "credentials"]
        }
    },
    // End Setting Route Schema

    // Start Post Job Route Schema

    'toggleProperties': {
        schema:
        {
            "type": "object",
            "properties": {
                "id": { "type": "number", "minLength": 1 },
                "value": {
                    "enum": ["Y", "N"]
                },
                "type": {
                    "enum": ["is_xmlfeed", "display_in_widget"]
                },
            },
            "required": ["id", "value", "type"]
        }
    },

    'updateSyndicateJob': {
        schema:
        {
            "type": "object",
            "properties": {
                "job_id": { "type": "number", "minLength": 1 },
                "card_id": { "type": "string", "minLength": 10 },
                "budget_id": { "type": "number", "minLength": 1 },
            },
            "required": ["card_id", "budget_type", "budget_amount", "budget_id"]
        }
    },

    'editJob': {
        schema:
        {
            "type": "object",
            "properties": {
                "job_title": { "type": "string", "minLength": 5 },
                "job_description": { "type": "string", "minLength": 10 },
                "ats_url":{ "type": "string", "minLength": 1 },
                "city": { "type": "string", "minLength": 3 },
                "state": { "type": "string", "minLength": 3 },
                "country": { "type": "string", "minLength": 3 },
                "is_xmlfeed": { "type": "string", "minLength": 1 },
                "display_in_widget": { "type": "string", "minLength": 1 },
                "status": { "type": "string", "minLength": 3 },
            },
        }
    },

    // End Post Job Route Schema

    // Start Resume Route Schema

    'resumeParser': {
        schema:
        {
            "type": "object",
            "properties": {
                "profile_id": { "type": "number", "minLength": 1 },
                "filename": { "type": "string", "minLength": 1 },
                "url": { "type": "string", "minLength": 10, "format": "uri" },
            },
            "required": ["profile_id", "filename", "url"]
        }
    },
    // End Resume Route Schema

    // Start Institution Route Schema

    'editProfile': {
        schema:
        {
            "type": "object",
            "properties": {
                "id": { "type": "number", "minLength": 1 },
                "name": { "type": "string", "minLength": 1 },
                "tagLine": { "type": "string" },
                "companySize": { "type": "string" },
                "industry": { "type": "string", "minLength": 1 },
                "website": { "type": "string" },
                "logo": { "type": "string" },
            },
            "required": ["id"]
        }
    },

    'addWidget': {
        schema:
        {
            "type": "object",
            "properties": {
                "institution_id": { "type": "number", "minLength": 1 },
                "widget_name": { "type": "string", "minLength": 1 },
                "headline": { "type": "string", "minLength": 1 },
                "total_jobs": { "type": "number", "minLength": 1 },
                "desc_chars": { "type": "string", "maxLength": 500 },
            },
            "required": ["institution_id", "widget_name", "headline", "total_jobs", "desc_chars"]
        }
    },

    'editWidget': {
        schema:
        {
            "type": "object",
            "properties": {
                "institution_id": { "type": "number", "minLength": 1 },
                "widget_name": { "type": "string", "minLength": 1 },
                "headline": { "type": "string", "minLength": 1 },
                "total_jobs": { "type": "number", "minLength": 1 },
                "desc_chars": { "type": "string", "maxLength": 500 },
            },
            "required": ["institution_id", "widget_name", "headline", "total_jobs", "desc_chars"]
        }
    },


    'addAwardee': {
        schema:
        {
            "type": "object",
            "properties": {
                "institution_id": { "type": "number", "minLength": 1 },
                "first_name": { "type": "string", "minLength": 1 },
                "last_name": { "type": "string", "minLength": 1 },
                "email": { "type": "string", "format": "email" },
                "dob": { "type": "string", "pattern": "(0[1-9]|1[012])/(0[1-9]|1[0-9]|2[0-9]|3[01])/[0-9]{4}" },
                "ssn": { "type": "number", "minLength": 4, "maxLength": 4 },
                "licence_number": { "type": "number", "minLength": 8 },
                "awardee_type": { "type": "string", "minLength": 1 },
                "issue_date": { "type": "string", "pattern": "(0[1-9]|1[012])/(0[1-9]|1[0-9]|2[0-9]|3[01])/[0-9]{4}" },
                "expire_date": { "type": "string", "pattern": "(0[1-9]|1[012])/(0[1-9]|1[0-9]|2[0-9]|3[01])/[0-9]{4}" },
                "credential_id": { "type": "number", "minLength": 1 },
            },
            "required": ["institution_id", "first_name", "last_name", "email", "dob", "ssn", "licence_number", "issue_date", "expire_date", "credential_id", "awardee_type"]
        }
    },

    'addBackgroundCheck': {
        schema:
        {
            "type": "object",
            "properties": {
                "first_name": { "type": "string", "minLength": 1 },
                "last_name": { "type": "string", "minLength": 1 },
                "email": { "type": "string", "format": "email" },
                "company": { "type": "string", "minLength": 1 },
                "package_id": { "type": "number", "minLength": 1 },
                "card_number": { "type": "number", "minLength": 16, "maxLength": 20 },
                "cvc": { "type": "number", "minLength": 3, "maxLength": 4 },
                "service_ids": { "type": "string" },
            },
            "required": ["first_name", "last_name", "email", "company", "package_id", "card_number", "cvc", "expiry_date"]
        }
    },
    // End Institution Route Schema

    // Start professional Route Schema

    'updateProfileLocation': {
        schema:
        {
            "type": "object",
            "properties": {
                "city": { "type": "string", "minLength": 3 },
                "state": { "type": "string", "minLength": 2 },
                "country": { "type": "string", "minLength":2 },
                "zipcode": { "type": "string", "minLength": 4},
            },
            "required": ["city", "state", "country", "zipcode"]
        }
    },


    // 'updateIndustry': {
    //     schema:
    //     {
    //         "type": "object",
    //         "properties": {
    //             "profile_id": { "type": "number", "minLength": 1},
    //             "industry_id": { "type": "number", "minLength": 1},
    //         },
    //         "required": ["profile_id", "industry_id"]
    //     }
    // },


    'updateProfile': {
        schema:
        {
            "type": "object",
            "properties": {
                "secondary_email": { "type": "string", "format": "email" },
            },
        }
    },


    'checkProfile': {
        schema:
        {
            "type": "object",
            "properties": {
                "first_name": { "type": "string", "minLength": 1 },
                "last_name": { "type": "string", "minLength": 1 },
                "email": { "type": "string", "format": "email" },
                "city": { "type": "string", "minLength": 3 },
                "state": { "type": "string" },
                "country": { "type": "string", "minLength":2 },
                "zip": { "type": "string", "minLength": 4},
                "dob": { "type": "string" },//, "pattern": "(0[1-9]|1[012])/(0[1-9]|1[0-9]|2[0-9]|3[01])/[0-9]{4}" },
                "ssn": { "type": "number","maxLength": 4 },
                
            },
            "required": ["first_name", "last_name", "email", "city", "country", "zip"]
        }
    },

    'applyjob': {
        schema:
        {
            "type": "object",
            "properties": {
                "job_id": { "type": "number", "minLength": 1},
                "profile_id": { "type": "number", "minLength": 1},
                "cover": { "type": "string", "minLength": 1},
                "phone_type": { "type": "string", "minLength": 1},
                "phone_number": { "type": "string", "minLength": 8,"maxLength": 20},
                
            },
            "required": ["job_id","profile_id","cover","phone_type","phone_number"]
        }
    },
    'getProfileByExternalProfileId': {
        schema:
        {
            "type": "object",
            "properties": {
                "external_profile_id": { "type": "string", "minLength": 1}
            },
            "required": ["external_profile_id"]
        }
    },

    // End professional Route Schema

    // Start Job Search Route Schema

    'search': {
        schema:
        {
            "type": "object",
            "properties": {
                "search_by": { "type": "string"},
                "city": { "type": "string"},
                "state": { "type": "string"},
                "country": { "type": "string"},
                "pro_title": { "type": "string"},
                "skills": { "type": "string"},
                "referencenumber": { "type": "string"},
                "company": { "type": "string"},
                "job_type": { "type": "string"},
            },
        }
    },

    // End Job Search Route Schema



    // Start Accounting Route Schema

    'listPaymentsHistory': {
        schema:
        {
            "type": "object",
            "properties": {
                "institution_id": { "type": "number", "minLength": 1 },
                "start_date": { "type": "string","format": "date"},
                "end_date": { "type": "string","format": "date"},
            },
            "required": ["institution_id","start_date","end_date"]
        }
    },

    'getTotalPayment': {
        schema:
        {
            "type": "object",
            "properties": {
                "institution_id": { "type": "number", "minLength": 1 },
                "start_date": { "type": "string","format": "date"},
                "end_date": { "type": "string","format": "date"},
            },
            "required": ["institution_id","start_date","end_date"]
        }
    },
    'addSubscriber': {
        schema:
        {
            "type": "object",
            "properties": {
                "email": { "type": "string", "format": "email" }
                },
            "required": ["email"]
        }
    },
    'assignCredentials': {
        schema:
        {
            "type": "object",
            "properties": {
                "name": { "type": "string", "minLength": 1 },
                "issuedBy": { "type": "string"},
                "type": { "type": "string"},
                "license_number": { "type": "string"},
                "issueDate": { "type": "string"},
                "credentialsId": { "type": "number"},
                "expirationDate": { "type": "string"},
                "profilesId": { "type": "number"},
                "status": { "type": "string"},
            },
            "required": ["name","type","profilesId"]
        }
    },
    'editAssignedCredential': {
        schema:
        {
            "type": "object",
            "properties": {
                "license_number": { "type": "string"},
                "issue_date": { "type": "string"},
                "credential_id": { "type": "number"},
                "profile_id": { "type": "number"},
                "status": { "type": "string"},
            },
            "required": ["credential_id","profile_id"]
        }
    },
    'addPaymentMethod': {
        schema:
        {
            "type": "object",
            "properties": {
                "CardType": { "type": "string"},
                "firstName": { "type": "string"},
                "lastName": { "type": "string"},
                "cardNumber": { "type": "string"},
                "expDate": { "type": "string"},
                "securityCode": { "type": "string"},
                "country": { "type": "string"},
                "postalCode": { "type": "string"},
                "isDefault": { "type": "string"},
            },
            "required": ["firstName","lastName","cardNumber","expDate","securityCode","isDefault"]
        }
    },
    'updateCard': {
        schema:
        {
            "type": "object",
            "properties": {
                "card_id": { "type": "string"},
                "customer_id": { "type": "string"},
                "first_name": { "type": "string"},
                "last_name": { "type": "string"},
                "country": { "type": "string"},
                "zip": { "type": "string"},
                "expiry_date": { "type": "string"},
                "isDefault": { "type": "string"},
            },
            "required": ["first_name","last_name","isDefault"]
        }
    },
    'addEducation': {
        schema:
        {
            "type": "object",
            "properties": {
                "school": { "type": "string"},
                "degree": { "type": "string"},
                "studyField": { "type": "string"},
                "startYear": { "type": "string"},
                "endYear": { "type": "string"},
                "grade": { "type": "string"},
                "degree_image": { "type": "string"},
            },
            "required": ["school","degree","studyField","startYear","endYear"]
        }
    },
    'updateEducation': {
        schema:
        {
            "type": "object",
            "properties": {
                "school": { "type": "string"},
                "degree": { "type": "string"},
                "studyField": { "type": "string"},
                "startYear": { "type": "string"},
                "endYear": { "type": "string"},
                "grade": { "type": "string"},
                "degree_image": { "type": "string"},
            },
            "required": ["school","degree","studyField","startYear","endYear"]
        }
    },
    'login': {
        schema:
        {
            "type": "object",
            "properties": {
                "email": { "type": "string"},
                "password": { "type": "string"}
            },
            "required": ["email","password"]
        }
    },
    'signup': {
        schema:
        {
            "type": "object",
            "properties": {
                "email": { "type": "string"},
                "password": { "type": "string"},
                "firstName": { "type": "string"},
                "lastName": { "type": "string"},
                "role": { "type": "string"},
                "dob": { "type": "string"}
            },
            "required": ["email","password","firstName","lastName","role","dob"]
        }
    },
    'change_password': {
        schema:
        {
            "type": "object",
            "properties": {
                "old_password": { "type": "string"},
                "password": { "type": "string"}
            },
            "required": ["old_password","password"]
        }
    },
    'forgot_password': {
        schema:
        {
            "type": "object",
            "properties": {
                "username": { "type": "string"}
            },
            "required": ["username"]
        }
    },
    'reset_password': {
        schema:
        {
            "type": "object",
            "properties": {
                "token": { "type": "string"},
                "password": { "type": "string"}
            },
            "required": ["token","password"]
        }
    },
    'shareDocument': {
        schema:
        {
            "type": "object",
            "properties": {
                "professional_doc_ids": { "type": "string","minLength": 1},
                "receiver": { "type": "string","minLength": 5}
            },
            "required": ["professional_doc_ids","receiver"]
        }
    },
    'updateProfileSubscription': {
        schema:
        {
            "type": "object",
            "properties": {
                "plan_id": { "type": "string","minLength": 1}
            },
            "required": ["plan_id"]
        }
    },
    'submitProfileQuestionnaire': {
        schema:
        {
            "type": "object",
            "properties": {
                "question_ids": {
                    "type":"list"
                },
                "answers": {
                    "type":"list"
                },
                "dates": {
                    "type":"list"
                },
                "additional_info": {
                    "type":"list"
                },
            },
            "required": ["question_ids","answers","dates","additional_info"]
        }
    },
};

Object.freeze(SCHEMAS);

export default SCHEMAS;