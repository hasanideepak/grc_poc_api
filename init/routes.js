import express from 'express';
import cors from 'cors';
import auth from '../routes/auth.js';
import orgs from '../routes/orgs.js';
import reference from '../routes/reference.js';
import configuration from '../routes/configuration.js';
import { schemaValidation, validateSession } from '../utils/middlewares.js';


const corsOptions = {
    origin: '*'
};

const ROUTES = (server) => {
    server.use(express.json())
    server.use(express.urlencoded({ extended: true }));
    server.use(cors(corsOptions));
    server.use('/auth',[schemaValidation],auth);
    server.use('/orgs',[schemaValidation,validateSession],orgs);
    server.use('/reference',[schemaValidation,validateSession,],reference);
    server.use('/configuration',[schemaValidation,validateSession,],configuration);
};

export default ROUTES;