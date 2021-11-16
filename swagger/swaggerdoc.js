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
                    example: 'tv200'
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
                          id: {
                            type: 'integer'
                          },
                          role: {
                            type: 'string'
                          },
                          firstName: {
                            type: 'string'
                          },
                          lastName: {
                            type: 'string'
                          },
                          email: {
                            type: 'string'
                          },
                          profileId: {
                            type: 'string'
                          },
                          dob: {
                            type: 'string'
                          },
                          locked: {
                            type: 'string'
                          },
                          slug: {
                            type: 'string'
                          },
                          mobile: {
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
      '/auth/logout': {
        post: {
          tags: [
            'Auth',
          ],
          summary: 'Logout',
          description: `
            Description     : Logout api
            Sample Url      : ${baseURL}auth/logout`,
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
                    example: 'tv200'
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
      '/auth/signup': {
        post: {
          tags: [
            'Auth',
          ],
          summary: 'Signup',
          description: `
            Description     : Signup api
            Sample Url      : ${baseURL}auth/signup`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'body',
              name: 'Request Body',
              description: 'Request body to create user',
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    required: true
                  },
                  password: {
                    type: 'string',
                    required: true
                  },
                  firstName: {
                    type: 'string',
                    required: true
                  },
                  lastName: {
                    type: 'string',
                    required: true
                  },
                  role: {
                    type: 'string',
                    required: true,
                    example: 'ROLE_PROFESSIONAL'
                  },
                  dob: {
                    type: 'string',
                    required: true
                  },
                  mobile: {
                    type: 'string'
                  },
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
                    example: 'tv200'
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
                          id: {
                            type: 'integer'
                          },
                          role: {
                            type: 'string'
                          },
                          firstName: {
                            type: 'string'
                          },
                          lastName: {
                            type: 'string'
                          },
                          email: {
                            type: 'string'
                          },
                          profileId: {
                            type: 'string'
                          },
                          dob: {
                            type: 'string'
                          },
                          locked: {
                            type: 'string'
                          },
                          slug: {
                            type: 'string'
                          },
                          mobile: {
                            type: 'string'
                          }
                        }
                      },
                      accessToken: {
                        type: 'string'
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
      '/auth/forgot_password': {
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
              description: 'Request body to forgot password',
              schema: {
                type: 'object',
                properties: {
                  username: {
                    type: 'string',
                    example: 'test@test.com',
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
                    example: 'tv200'
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
      '/auth/reset_password': {
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
              description: 'Request body for reset password',
              schema: {
                type: 'object',
                properties: {
                  password: {
                    type: 'string',
                    required: true,
                    description: 'Provide new password'
                  },
                  token: {
                    type: 'string',
                    required: true,
                    description: 'Token provided in reset password link'
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
                    example: 'tv200'
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
      '/auth/change_password': {
        post: {
          tags: [
            'Auth',
          ],
          summary: 'Change Password',
          description: `
            Description     : Change Password api
            Sample Url      : ${baseURL}auth/change_password`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'body',
              name: 'Request Body',
              description: 'Request body for change password post login',
              schema: {
                type: 'object',
                properties: {
                  password: {
                    type: 'string',
                    required: true,
                    description: 'Provide new password'
                  },
                  old_password: {
                    type: 'string',
                    required: true,
                    description: 'Provide old password'
                  }
                }
              }
            },
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
                    example: 'tv200'
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
      '/professional/listDocuments': {
        get: {
          tags: [
            'Professional',
          ],
          summary: 'List documents',
          description: `
            Description     : List of documents along with uploaded documents
            Sample Url      : ${baseURL}professional/listDocuments`,
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
                    example: 'tv200'
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  },
                  document_upload_pct: {
                    type: 'float',
                    example: '10',
                    description: 'Describes the percantages of uploaded documents'
                  },
                  results: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        group: {
                          type: 'string',
                          description: 'Name of the document group'
                        },
                        data: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              document_type_id: {
                                type: 'integer',
                                description: 'Document type id, which will be used for upload document api'
                              },
                              document: {
                                type: 'string',
                                description: 'Name of the document'
                              },
                              required: {
                                type: 'string',
                                enum: ['Y', 'N']
                              },
                              document_file: {
                                type: 'string',
                                description: 'link of the uploaded document'
                              },
                              is_uploaded: {
                                type: 'string',
                                enum: ['Y', 'N']
                              },
                              is_expired: {
                                type: 'string',
                                enum: ['Y', 'N']
                              },
                              professional_doc_id: {
                                type: 'string',
                                description: 'professional doc id, which to be provided while sharing the document'
                              }
                            }
                          }
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
      '/professional/uploadSecureDocument/{doc_type}': {
        post: {
          tags: [
            'Professional',
          ],
          summary: 'Upload Document',
          description: `
            Description     : API to upload document securely, you can upload only one document at a time.
            Sample Url      : ${baseURL}professional/uploadSecureDocument/2`,
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
              in: 'path',
              name: 'doc_type',
              schema: {
                type: 'integer'
              },
              required: 'true',
              description: 'document_type_id provided in list document api',
              example: 2
            },
            {
              in: 'formData',
              name: 'file',
              schema: {
                type: 'file'
              },
              required: 'true',
              description: 'file to be uploaded'
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
                    example: 'tv200'
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
      '/professional/getDocument': {
        get: {
          tags: [
            'Professional',
          ],
          summary: 'Get document',
          description: `
            Description     : Get user document stream
            Sample Url      : ${baseURL}professional/getDocument/f11855d3-c7d0-4acb-bb79-b17054f49092`,
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
              in: 'path',
              name: 'file',
              schema: {
                type: 'string'
              },
              required: 'true',
              description: 'File name of the document'
            }
          ],
          responses: {
            '200': {
              description: 'Document stream',
            }
          }
        }
      },
      '/professional/shareDocument': {
        post: {
          tags: [
            'Professional',
          ],
          summary: 'Share Documents',
          description: `
            Description     : Share Documents api
            Sample Url      : ${baseURL}professional/shareDocument`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'body',
              name: 'Request Body',
              description: 'Request body for share document',
              schema: {
                type: 'object',
                properties: {
                  professional_doc_ids: {
                    type: 'string',
                    required: true,
                    description: 'Comma seprated professional doc ids which is to be shared'
                  },
                  receiver: {
                    type: 'string',
                    required: true,
                    description: 'Email address of the receiver'
                  }
                }
              }
            },
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
                    example: 'tv200'
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
      '/professional/getProfileDetails': {
        get: {
          tags: [
            'Professional',
          ],
          summary: 'Get Professional Details',
          description: `
            Description     : Get professional details
            Sample Url      : ${baseURL}professional/getProfileDetails`,
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
                    example: 'tv200'
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
                        first_name: {
                          type: 'string',
                        },
                        last_name: {
                          type: 'string',
                        },
                        primary_email: {
                          type: 'string',
                        },
                        is_document_uploaded: {
                          type: 'string',
                          enum: ['Y', 'N']
                        },
                        cell_phone: {
                          type: 'string',
                        },
                        is_questionnaire_complete: {
                          type: 'string',
                          enum: ['Y', 'N']
                        },
                        subscription_expiry: {
                          type: 'string',
                        },
                        recent_activities: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              activity: {
                                type: 'string',
                                description: 'Type of the activity e.g. login, logout etc'
                              },
                              activity_date: {
                                type: 'string'
                              },
                              activity_time: {
                                type: 'string'
                              }
                            }
                          }
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
      '/professional/updateProfile': {
        post: {
          tags: [
            'Professional',
          ],
          summary: 'Update Professional Details',
          description: `
            Description     : Update Professional Details api
            Sample Url      : ${baseURL}professional/updateProfile`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'body',
              name: 'Request Body',
              description: 'Request body for update professional details',
              schema: {
                type: 'object',
                properties: {
                  cell_phone: {
                    type: 'string',
                    required: true,
                  },
                  first_name: {
                    type: 'string',
                    required: true,
                  },
                  last_name: {
                    type: 'string',
                    required: true,
                  },
                  city: {
                    type: 'string',
                    required: true,
                  }
                }
              }
            },
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
                    example: 'tv200'
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
      '/professional/uploadProfilePic': {
        post: {
          tags: [
            'Professional',
          ],
          summary: 'Upload Professional Profile Pic',
          description: `
            Description     : API to upload profile pic.
            Sample Url      : ${baseURL}professional/uploadProfilePic`,
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
              in: 'formData',
              name: 'file',
              schema: {
                type: 'file'
              },
              required: 'true',
              description: 'file to be uploaded'
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
                    example: 'tv200'
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
      '/professional/getProfileSubscription': {
        get: {
          tags: [
            'Professional',
          ],
          summary: 'Get Professional Subscription',
          description: `
            Description     : Get professional Subscription
            Sample Url      : ${baseURL}professional/getProfileSubscription`,
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
                    example: 'tv200'
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
                        plan_id: {
                          type: 'string',
                        },
                        plan_type: {
                          type: 'string',
                          enum: ['MONTHLY', 'WEEKLY', 'YEARLY']
                        },
                        plan_duration: {
                          type: 'string',
                        },
                        plan_cost: {
                          type: 'string'
                        },
                        summary: {
                          type: 'string',
                        },
                        plan_expiry_date: {
                          type: 'string'
                        },
                        status: {
                          type: 'string',
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
      '/professional/updateProfileSubscription': {
        post: {
          tags: [
            'Professional',
          ],
          summary: 'Update Professional Subscription',
          description: `
            Description     : Update Professional Subscription api
            Sample Url      : ${baseURL}professional/updateProfileSubscription`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'body',
              name: 'Request Body',
              description: 'Request body for update professional details',
              schema: {
                type: 'object',
                properties: {
                  plan_id: {
                    type: 'string',
                    required: true,
                    description: 'plan_id provided in getSubscriptionPlans api'
                  }
                }
              }
            },
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
                    example: 'tv200'
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
      '/professional/getActivityLogs/{page}/{rows}': {
        get: {
          tags: [
            'Professional',
          ],
          summary: 'Get Professional Activity Logs',
          description: `
            Description     : Get professional activity logs
            Sample Url      : ${baseURL}professional/getActivityLogs/1/20`,
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
              in: 'path',
              name: 'page',
              schema: {
                type: 'integer'
              },
              required: 'true',
              description: 'page no. for the activitiy list',
              example: 1
            },
            {
              in: 'path',
              name: 'rows',
              schema: {
                type: 'integer'
              },
              required: 'true',
              description: 'No. of rows to be displayed',
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
                    example: 'tv200'
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
                        activity: {
                          type: 'string',
                          description: 'Activity type e.g. Login,Upload Document etc'
                        },
                        activity_date: {
                          type: 'string',
                        },
                        activity_time: {
                          type: 'string',
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
      '/professional/getProfileQuestionnaire': {
        get: {
          tags: [
            'Professional',
          ],
          summary: 'Get Professional Questionnaire',
          description: `
            Description     : Get professional Questionnaire
            Sample Url      : ${baseURL}professional/getProfileQuestionnaire`,
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
                    example: 'tv200'
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
                        group: {
                          type: 'string',
                          description : 'Group of the questionnaire'
                        },
                        data: {
                          type: 'array',
                          items: {
                            type : 'object',
                            properties : {
                              question : {
                                type : 'string',
                                description : 'Parent question'
                              },
                              question_list : {
                                type : 'array',
                                items : {
                                  type : 'object',
                                  properties : {
                                    question_id : {
                                      type : 'integer',
                                      description : 'Unique question id'
                                    },
                                    question : {
                                      type : 'string'
                                    },
                                    type : {
                                      type : 'string',
                                      description : 'e.g. radio,checkbox'
                                    },
                                    options : {
                                      type : 'array',
                                      items : {
                                        type : 'object',
                                        properties : {
                                          id : {
                                            type : 'integer'
                                          },
                                          value : {
                                            type : 'string'
                                          }
                                        }
                                      }
                                    },
                                    answer : {
                                      type : 'string',
                                      description : 'id of the option selected'
                                    },
                                    additional_info : {
                                      type : 'string',
                                      description : 'additional information'
                                    },
                                    date_req : {
                                      type : 'string',
                                      enum : ['true','false'],
                                      description : 'Describes if date is required or not'
                                    },
                                    date : {
                                      type : 'string'
                                    },
                                  }
                                }
                              }
                            }
                          }
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
      '/professional/submitProfileQuestionnaire': {
        post: {
          tags: [
            'Professional',
          ],
          summary: 'Update Professional Questionnaire',
          description: `
            Description     : Update Professional Questionnaire api
            Sample Url      : ${baseURL}professional/submitProfileQuestionnaire`,
          produces: [
            'application/json'
          ],
          parameters: [
            {
              in: 'body',
              name: 'Request Body',
              description: 'Request body for update professional details',
              schema: {
                type: 'object',
                properties: {
                  question_ids: {
                    type: 'array',
                    items : {
                      type : 'string',
                      description : 'List of questions ids which are answered'
                    },
                    required: true
                  },
                  answers: {
                    type: 'array',
                    items : {
                      type : 'string',
                      description : 'List of answer option ids'
                    },
                    required: true
                  },
                  dates: {
                    type: 'array',
                    items : {
                      type : 'string',
                      description : 'List of dates'
                    },
                    required: true
                  },
                  additional_info: {
                    type: 'array',
                    items : {
                      type : 'string',
                      description : 'List of addtional info'
                    },
                    required: true
                  }
                }
              }
            },
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
                    example: 'tv200'
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
      '/packages/getSubscriptionPlans': {
        get: {
          tags: [
            'Packages',
          ],
          summary: 'Get Subscription Plans',
          description: `
            Description     : Get Subscription Plans
            Sample Url      : ${baseURL}packages/getSubscriptionPlans`,
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
                    example: 'tv200'
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
                        plan_id: {
                          type: 'string',
                        },
                        plan_type: {
                          type: 'string',
                          enum: ['MONTHLY', 'WEEKLY', 'YEARLY']
                        },
                        plan_duration: {
                          type: 'string',
                        },
                        plan_cost: {
                          type: 'string'
                        },
                        summary: {
                          type: 'string',
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
    }
  };
};

export default SwaggerModels;