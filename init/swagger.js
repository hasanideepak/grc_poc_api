import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import SwaggerJSON from '../swagger/swaggerdoc.js';

// define swagger options

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'GRC REST API',
      description: 'GRC API Information',
      contact: {
        name: 'GRC'
      },
      // servers: ['https://qa-api2.truverify.com']
    },
    // import swagger documentation
    ...SwaggerJSON()
  },
  apis: ['./routes/*.js'],
};

// create instance of swagger js doc
const swaggerDocs = swaggerJSDoc(swaggerOptions, {explorer: true});

const SWAGGER = (server) => {
  server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
};

export default SWAGGER;
