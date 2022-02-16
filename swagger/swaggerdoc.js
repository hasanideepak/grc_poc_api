const SwaggerModels = () => {
  const baseURL = process.env.API_BASE_URL;

  return {

    // swagger paths and endpoints
    paths: {
      '/auth/login': {
        post: {
          tags: [
            'Auth',
          ],
          summary: 'Login',
          description: `
            Description     : Login api
            Sample Url      : ${baseURL}auth/login`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide email and password to login',
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    example: 'test@test.com',
                    required: true
                  },
                  password: {
                    type: 'string',
                    example: 'test_password',
                    required: true
                  }
                }
              }
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  statusCode: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  },
                  results: {
                    type: 'object',
                    properties: {
                      user: {
                        type: 'object',
                        properties: {
                          user_id: {
                            type: 'integer'
                          },
                          email: {
                            type: 'string'
                          },
                          org_emp_id: {
                            type: 'integer'
                          },
                          name: {
                            type: 'string'
                          },
                          phone: {
                            type: 'integer'
                          },
                          org_name: {
                            type: 'string'
                          },
                          logo: {
                            type: 'string'
                          },
                          is_onboard: {
                            type: 'string'
                          }
                        }
                      },
                      accessToken: {
                        type: 'string',
                        description: 'This token is to be provided in all api\'s post login in request header Authorization'
                      },
                      tokenType: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      'forgot_password': {
        post: {
          tags: [
            'Auth',
          ],
          summary: 'Forgot Password',
          description: `
            Description     : Forgot Password api
            Sample Url      : ${baseURL}auth/forgot_password`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide username',
              schema: {
                type: 'object',
                properties: {
                  username: {
                    type: 'string',
                    example: 'shahidajmeri786',
                    required: true
                  }
                }
              }
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  statusCode: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      'reset_password': {
        post: {
          tags: [
            'Auth',
          ],
          summary: 'Reset Password',
          description: `
            Description     : Reset Password api
            Sample Url      : ${baseURL}auth/reset_password`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide password and token.',
              schema: {
                type: 'object',
                properties: {
                  password: {
                    type: 'string',
                    example: 'dd65467r',
                    required: true
                  },
                  token: {
                    type: 'string',
                    example: 'dd65467rdsd54545dsasdfr',
                    required: true
                  }
                }
              }
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  statusCode: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/reference/getFrameworks': {
        get: {
          tags: [
            'Reference',
          ],
          summary: 'Get All Frameworks',
          description: `
            Description     : Get All Frameworks
            Sample Url      : ${baseURL}reference/getFrameworks`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  },
                  results: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'number',
                          description: 'Framework ID'
                        },
                        name: {
                          type: 'string',
                          description: 'Framework Name'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/reference/getAuthorities/:is_management': {
        get: {
          tags: [
            'Reference',
          ],
          summary: 'Get All Authorities',
          description: `
            Description     : Get All Authorities
            Sample Url      : ${baseURL}reference/getAuthorities`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  },
                  results: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'number',
                          description: 'Authority ID'
                        },
                        name: {
                          type: 'string',
                          description: 'Authority Name'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/reference/getRoles': {
        get: {
          tags: [
            'Reference',
          ],
          summary: 'Get All Roles',
          description: `
            Description     : Get All Roles
            Sample Url      : ${baseURL}reference/getRoles`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  },
                  results: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'number',
                          description: 'Role ID'
                        },
                        name: {
                          type: 'string',
                          description: 'Role Name'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/setupAccount': {
        post: {
          tags: [
            'Configuration',
          ],
          summary: 'Setup Account',
          description: `
            Description     : Setup Account and Project
            Sample Url      : ${baseURL}configuration/setupAccount`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide account name, project name and organaisation id.',
              schema: {
                type: 'object',
                properties: {
                  account_name: {
                    type: 'string',
                    example: 'Account A',
                    required: true
                  },
                  project_name: {
                    type: 'string',
                    example: 'Project A',
                    required: true
                  },
                  org_id: {
                    type: 'number',
                    example: '12',
                    required: true
                  }
                }
              }
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  },
                  results: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        account_id: {
                          type: 'number',
                          description: 'Account ID'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/addProjectFrameworks': {
        post: {
          tags: [
            'Configuration'
          ],
          summary: 'Add Project Frameworks',
          description: `
            Description     : Add Project Frameworks
            Sample Url      : ${baseURL}configuration/addProjectFrameworks`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide Project id and Framework ids.',
              schema: {
                type: 'object',
                properties: {
                  project_id: {
                    type: 'number',
                    example: 1,
                    required: true
                  },
                  framework_ids: {
                    type: 'array',
                    example: [1, 2, 3],
                    required: true
                  }
                }
              }
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/addKeyMember': {
        post: {
          tags: [
            'Configuration',
          ],
          summary: 'Add Keymember',
          description: `
            Description     : Add Keymember
            Sample Url      : ${baseURL}configuration/addKeyMember`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide email, project id and organaisation id.',
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    example: 'example@example.com',
                    required: true
                  },
                  project_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  },
                  org_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  },
                  authority_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  }
                }
              }
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/addServicePartner': {
        post: {
          tags: [
            'Configuration'
          ],
          summary: 'Add Service Partner',
          description: `
            Description     : Add Service Partner
            Sample Url      : ${baseURL}configuration/addServicePartner`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide email, full name and project id.',
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    example: 'example@example.com',
                    required: true
                  },
                  full_name: {
                    type: 'string',
                    example: 'John Doe',
                    required: true
                  },
                  project_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  }
                }
              }
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/addTaskOwner': {
        post: {
          tags: [
            'Configuration',
          ],
          summary: 'Add Task Owner',
          description: `
            Description     : Add Task Owner
            Sample Url      : ${baseURL}configuration/addTaskOwner`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide email, first name, last name, project id and organaisation id.',
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    example: 'example@example.com',
                    required: true
                  },
                  first_name: {
                    type: 'string',
                    example: 'John',
                    required: true
                  },
                  last_name: {
                    type: 'string',
                    example: 'Doe',
                    required: true
                  },
                  project_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  },
                  org_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  },
                  authority_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  }
                }
              }
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/reference/getThirdPartyConnectors': {
        get: {
          tags: [
            'Reference',
          ],
          summary: 'Get Third Party Connectors',
          description: `
            Description     : Get All Frameworks
            Sample Url      : ${baseURL}reference/getThirdPartyConnectors`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  },
                  results: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'number',
                          description: 'Connector ID'
                        },
                        name: {
                          type: 'string',
                          description: 'Connector Name'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/addThirdPartyConnector': {
        post: {
          tags: [
            'Configuration',
          ],
          summary: 'Add Third Party Connectors',
          description: `
            Description     : Add Third Party Connectors
            Sample Url      : ${baseURL}configuration/addThirdPartyConnector`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide email, first name, last name, project id and organaisation id.',
              schema: {
                type: 'object',
                properties: {
                  project_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  },
                  connector_ids: {
                    type: 'array',
                    example: [12, 16],
                    required: true
                  }
                }
              }
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/deleteKeyMember': {
        delete: {
          tags: [
            'Configuration',
          ],
          summary: 'Delete Keymember',
          description: `
            Description     : Delete Keymember
            Sample Url      : ${baseURL}configuration/deleteKeyMember`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide Organization ID and Employee ID',
              schema: {
                type: 'object',
                properties: {
                  org_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  },
                  emp_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  },
                  project_id: {
                    type: 'number',
                    example: 15,
                    required: true
                  }
                }
              }
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/deleteTaskOwner': {
        delete: {
          tags: [
            'Configuration',
          ],
          summary: 'Delete Task Owner',
          description: `
            Description     : Delete Task Owner
            Sample Url      : ${baseURL}configuration/deleteTaskOwner`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide Organization ID and Employee ID',
              schema: {
                type: 'object',
                properties: {
                  org_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  },
                  emp_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  },
                  project_id: {
                    type: 'number',
                    example: 15,
                    required: true
                  }
                }
              }
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/deleteServicePartner': {
        delete: {
          tags: [
            'Configuration',
          ],
          summary: 'Delete Service Partner',
          description: `
            Description     : Delete Service Partner
            Sample Url      : ${baseURL}configuration/deleteServicePartner`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide Organization ID and Employee ID',
              schema: {
                type: 'object',
                properties: {
                  org_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  },
                  emp_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  },
                  project_id: {
                    type: 'number',
                    example: 15,
                    required: true
                  }
                }
              }
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/getConfiguration': {
        get: {
          tags: [
            'Configuration',
          ],
          summary: 'Get On Boarding Data by either Organization ID OR Account ID OR Project ID.',
          description: `
            Description     : Get On Boarding Data by either Organization ID OR Account ID OR Project ID.
            Sample Url      : ${baseURL}configuration/getConfiguration`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation.',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'parameter',
              name: 'org_id',
              schema: {
                type: 'number',
              },
              required: 'false',
              description: 'Organaisation ID',
              example: 2
            },
            {
              in: 'parameter',
              name: 'account_id',
              schema: {
                type: 'number',
              },
              required: 'false',
              description: 'Account ID',
              example: 10
            },
            {
              in: 'parameter',
              name: 'project_id',
              schema: {
                type: 'number',
              },
              required: 'false',
              description: 'Project ID',
              example: 10
            }

          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  },
                  results: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        accounts_and_projects: {
                          type: 'object',
                          description: 'Account and Project Data'
                        },
                        keymembers: {
                          type: 'object',
                          description: 'Keymembers Data'
                        },
                        task_owners: {
                          type: 'object',
                          description: 'Task Owners Data'
                        },
                        frameworks: {
                          type: 'object',
                          description: 'Frameworks Data'
                        },
                        service_partners: {
                          type: 'object',
                          description: 'Service Partners Data'
                        },
                        third_part_connectors: {
                          type: 'object',
                          description: 'Third Party Connectors'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/addThirdPartyConnectorToken': {
        post: {
          tags: [
            'Configuration',
          ],
          summary: 'Add Third Party Connectors tokens',
          description: `
            Description     : Add Third Party Connectors tokens
            Sample Url      : ${baseURL}configuration/addThirdPartyConnectorToken`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide project id, connector id, and token details.',
              schema: {
                type: 'object',
                properties: {
                  project_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  },
                  connector_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  },
                  token: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.',
                    required: true
                  }
                }
              }
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/addPeople': {
        post: {
          tags: [
            'Configuration',
          ],
          summary: 'Add People',
          description: `
            Description     : Add People
            Sample Url      : ${baseURL}configuration/addPeople`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide project id, connector id, and token details.',
              schema: {
                type: 'object',
                properties: {
                  project_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  },
                  employees: {
                    type: 'string',
                    example: '12',
                    required: true
                  },
                  consultants: {
                    type: 'string',
                    example: '5',
                    required: true
                  }
                }
              }
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/addTechnologyAssets': {
        post: {
          tags: [
            'Configuration',
          ],
          summary: 'Add Technology assests',
          description: `
            Description     : Add Technology assests
            Sample Url      : ${baseURL}configuration/addTechnologyAssets`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide project id, connector id, and token details.',
              schema: {
                type: 'object',
                properties: {
                  project_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  },
                  endpoints: {
                    type: 'string',
                    example: '12',
                    required: true
                  },
                  servers: {
                    type: 'string',
                    example: '5',
                    required: true
                  },
                  mobile_devices: {
                    type: 'string',
                    example: '5',
                    required: true
                  }
                }
              }
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/addVendor': {
        post: {
          tags: [
            'Configuration',
          ],
          summary: 'Add Vendor',
          description: `
            Description     : Add Vendor
            Sample Url      : ${baseURL}configuration/addVendor`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide project id, connector id, and token details.',
              schema: {
                type: 'object',
                properties: {
                  project_id: {
                    type: 'number',
                    example: 12,
                    required: true
                  },
                  vendor: {
                    type: 'string',
                    example: 'adinfinitum',
                    required: true
                  }
                }
              }
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/createThirdPartyUtility': {
        post: {
          tags: [
            'Configuration',
          ],
          summary: 'Create Third Party Utilities',
          description: `
            Description     : Create Third Party Utilities
            Sample Url      : ${baseURL}configuration/createThirdPartyUtility`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide project id, connector id, and token details.',
              schema: {
                type: 'object',
                properties: {
                  utility_name: {
                    type: 'string',
                    example: 'adinfinitum',
                    required: true
                  }
                }
              }
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/addThirdPartyUtilities': {
        post: {
          tags: [
            'Configuration',
          ],
          summary: 'Add Third Party Utilities',
          description: `
            Description     : Add Third Party Utilities
            Sample Url      : ${baseURL}configuration/addThirdPartyUtilities`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation. ',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide project id, connector id, and token details.',
              schema: {
                type: 'object',
                properties: {
                  project_id: {
                    type: 'string',
                    example: 15,
                    required: true
                  },
                  utilities_ids: {
                    type: 'array',
                    example: [15, 16],
                    required: true
                  }
                }
              }
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/getThirdPartyConnectors': {
        get: {
          tags: [
            'Configuration',
          ],
          summary: 'Get Third Party connectors by Project ID.',
          description: `
            Description     : Get Third Party connectors by Project ID.
            Sample Url      : ${baseURL}configuration/getThirdPartyConnectors`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation.',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'parameter',
              name: 'project_id',
              schema: {
                type: 'number',
              },
              required: 'true',
              description: 'Project ID',
              example: 2
            }],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/getThirdPartyUtilities': {
        get: {
          tags: [
            'Configuration',
          ],
          summary: 'Get Third Party utilities by Project ID.',
          description: `
            Description     : Get Third Party utilities by Project ID.
            Sample Url      : ${baseURL}configuration/getThirdPartyUtilities`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation.',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'parameter',
              name: 'project_id',
              schema: {
                type: 'number',
              },
              required: 'true',
              description: 'Project ID',
              example: 2
            }],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/getScopeDetails': {
        get: {
          tags: [
            'Configuration',
          ],
          summary: 'Get Third Party utilities by Project ID.',
          description: `
            Description     : Get Scope details by Project ID.
            Sample Url      : ${baseURL}configuration/getScopeDetails`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation.',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'parameter',
              name: 'project_id',
              schema: {
                type: 'number',
              },
              required: 'true',
              description: 'Project ID',
              example: 2
            }],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  },
                  results: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        peoples: {
                          type: 'object',
                          description: 'Peoples Data'
                        },
                        technology_assets: {
                          type: 'object',
                          description: 'Technology assets Data'
                        },
                        vendors: {
                          type: 'object',
                          description: 'Vendors Data'
                        },
                        third_party_utilities: {
                          type: 'object',
                          description: 'Thirdparty utilities Data'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/configuration/deleteVendorById': {
        delete: {
          tags: [
            'Configuration',
          ],
          summary: 'Delete vendor by ID.',
          description: `
            Description     : Delete vendor by ID.
            Sample Url      : ${baseURL}configuration/deleteVendorById`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation.',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'parameter',
              name: 'id',
              schema: {
                type: 'number',
              },
              required: 'true',
              description: 'Vendor ID',
              example: 2
            }],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/tasks/listTasks': {
        get: {
          tags: [
            'Tasks',
          ],
          summary: 'Get list of tasks.',
          description: `
            Description     : Get list of tasks.
            Sample Url      : ${baseURL}tasks/listTasks`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide project id, connector id, and token details.',
              schema: {
                type: 'object',
                properties: {
                  project_id: {
                    type: 'number',
                    example: 15,
                    required: true
                  },
                  authority: {
                    type: 'string',
                    example: 'System Admin',
                    required: true
                  },
                  start_date: {
                    type: 'string',
                    example: '01/24/2022',
                    required: true
                  },
                  end_date: {
                    type: 'string',
                    example: '01/24/2022',
                    required: true
                  },
                  task_status: {
                    type: 'string',
                    example: 'pending',
                    required: true
                  }
                }
              }
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/tasks/getTaskDetails': {
        get: {
          tags: [
            'Tasks',
          ],
          summary: 'Get task details.',
          description: `
            Description     : Get task details
            Sample Url      : ${baseURL}tasks/getTaskDetails`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'parameter',
              name: 'project_task_id',
              schema: {
                type: 'number',
              },
              required: 'true',
              description: 'Task ID',
              example: 700073
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  },
                  task: {
                    type: 'object'
                  },
                  applicable_assets: {
                    type: 'object'
                  },
                  evidence_needed: {
                    type: 'object'
                  }
                }
              }
            }
          }
        }
      },
      '/tasks/updateTaskDetails': {
        post: {
          tags: [
            'Tasks',
          ],
          summary: 'Update task details.',
          description: `
            Description     : Update task details.
            Sample Url      : ${baseURL}tasks/updateTaskDetails`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'parameter',
              name: 'project_task_id',
              schema: {
                type: 'number',
              },
              required: 'true',
              description: 'Task ID',
              example: 700074
            },
            {
              in: 'body',
              name: 'Request Body',
              description: 'Provide project id, connector id, and token details.',
              schema: {
                type: 'object',
                properties: {
                  data: {
                    type: 'object',
                    example:
                      { "priority": "'low'", "task_owner_id": "400051", "task_end_date": "2022-03-01 09:26:19.18+00", "task_status": "pending" }
                    ,
                    required: true
                  }
                }
              }
            }
          ],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/reference/getModules': {
        get: {
          tags: [
            'Reference',
          ],
          summary: 'Get All Modules',
          description: `
            Description     : Get All Modules.
            Sample Url      : ${baseURL}reference/getModules`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation.',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            }],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/reference/getControlDomains': {
        get: {
          tags: [
            'Reference',
          ],
          summary: 'Get All Control Domains',
          description: `
            Description     : Get All Control Domains.
            Sample Url      : ${baseURL}reference/getControlDomains`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation.',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            }],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      '/reference/getControlCriteria': {
        get: {
          tags: [
            'Reference',
          ],
          summary: 'Get All Control Criterias',
          description: `
            Description     : Get All Control Criterias.
            Sample Url      : ${baseURL}reference/getControlCriteria`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            },
            {
              in: 'header',
              name: 'apikey',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'API key provided for SAAS implementation.',
              example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
            }],
          responses: {
            '200': {
              description: 'Success!',
              'schema': {
                type: 'object',
                properties: {
                  status_code: {
                    type: 'string',
                    example: 'air200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  }
                }
              }
            }
          }
        }
      },
      // '/reference/getOrgTypes': {
      //   get: {
      //     tags: [
      //       'Reference',
      //     ],
      //     summary: 'Get All Organizations',
      //     description: `
      //       Description     : Get All Organizations
      //       Sample Url      : ${baseURL}reference/getOrgTypes`,
      //     produces: [
      //       'application/json'
      //     ],
      //     parameters : [
      //       {
      //         in: 'header',
      //         name: 'Authorization',
      //         schema: {
      //           type: 'string',
      //         },
      //         required: 'true',
      //         description: 'accessToken provided in the response of login api',
      //         example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
      //       }
      //     ],
      //     responses: {
      //       '200': {
      //         description: 'Success!',
      //         'schema': {
      //           type: 'object',
      //           properties: {
      //             status_code: {
      //               type: 'string',
      //               example: 'air200'
      //             },
      //             message: {
      //               type: 'string',
      //               example: 'Success'
      //             },
      //             results: {
      //               type: 'array',
      //               items: {
      //                 type: 'object',
      //                 properties: {
      //                   id: {
      //                     type: 'number',
      //                     description:'Type ID'
      //                   },
      //                   name: {
      //                     type: 'string',
      //                     description:'Type Name'
      //                   }
      //                 }
      //               }
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // },

    }
  };
};

export default SwaggerModels;