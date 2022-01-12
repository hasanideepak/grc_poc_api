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
                          org_emp_id:{
                            type:'integer'
                          },
                          name:{
                            type:'string'
                          },
                          phone:{
                            type:'integer'
                          },
                          org_name:{
                            type:'string'
                          },
                          logo:{
                            type:'string'
                          },
                          is_onboard:{
                            type:'string'
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
          parameters : [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
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
                          description:'Framework ID'
                        },
                        name: {
                          type: 'string',
                          description:'Framework Name'
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
      '/reference/getDepartments': {
        get: {
          tags: [
            'Reference',
          ],
          summary: 'Get All Departments',
          description: `
            Description     : Get All Departments
            Sample Url      : ${baseURL}reference/getDepartments`,
          produces: [
            'application/json'
          ],
          parameters : [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
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
                          description:'Department ID'
                        },
                        name: {
                          type: 'string',
                          description:'Department Name'
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
          parameters : [
            {
              in: 'header',
              name: 'Authorization',
              schema: {
                type: 'string',
              },
              required: 'true',
              description: 'accessToken provided in the response of login api',
              example: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwMzE1MCwiaWF0IjoxNjI5MjkyOTI4'
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
                          description:'Role ID'
                        },
                        name: {
                          type: 'string',
                          description:'Role Name'
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
            'Setup Account',
          ],
          summary: 'Setup Account',
          description: `
            Description     : Setup Account
            Sample Url      : ${baseURL}configuration/setupAccount`,
          produces: [
            'application/json'
          ],
          parameters : [
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
                          description:'Account ID'
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
            'Project Frameworks'
          ],
          summary: 'Add Project Frameworks',
          description: `
            Description     : Add Project Frameworks
            Sample Url      : ${baseURL}configuration/addProjectFrameworks`,
          produces: [
            'application/json'
          ],
          parameters : [
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
              description: 'Provide Project name and Framework ids.',
              schema: {
                type: 'object',
                properties: {
                 project_name: {
                    type: 'string',
                    example: 'Project A',
                    required: true
                  },
                  framework_ids: {
                    type: 'array',
                    example: ["2","2"],
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
            'Key member',
          ],
          summary: 'Add Keymember',
          description: `
            Description     : Add Keymember
            Sample Url      : ${baseURL}configuration/addKeyMember`,
          produces: [
            'application/json'
          ],
          parameters : [
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
            'Service Partner'
          ],
          summary: 'Add Service Partner',
          description: `
            Description     : Add Service Partner
            Sample Url      : ${baseURL}configuration/addServicePartner`,
          produces: [
            'application/json'
          ],
          parameters : [
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
            'Task Owner',
          ],
          summary: 'Add Task Owner',
          description: `
            Description     : Add Task Owner
            Sample Url      : ${baseURL}configuration/addTaskOwner`,
          produces: [
            'application/json'
          ],
          parameters : [
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