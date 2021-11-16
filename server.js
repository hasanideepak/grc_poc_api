import express from 'express';
import dotenv from 'dotenv';
import routes from './init/routes.js';
import swagger from './init/swagger.js'


dotenv.config();
const server = express();
swagger(server); //swagger documentation

// esclient();
// mysqlclient();
routes(server); //initiate routes


const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Listening on port ${port}`));