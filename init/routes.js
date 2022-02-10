import express from 'express';
import cors from 'cors';
import auth from '../routes/auth.js';
import orgs from '../routes/orgs.js';
import reference from '../routes/reference.js';
import configuration from '../routes/configuration.js';
import tasks from '../routes/tasks.js';
import evidence from '../routes/evidences.js';

import { saasValidation, schemaValidation, validateSession } from '../utils/middlewares.js';


const corsOptions = {
    origin: '*'
};

const ROUTES = (server) => {
    server.use(express.json())
    server.use(express.urlencoded({ extended: true }));
    server.use(cors(corsOptions));
    server.use('/auth',[schemaValidation, saasValidation],auth);
    server.use('/orgs',[schemaValidation,saasValidation,validateSession],orgs);
    server.use('/reference',[schemaValidation,saasValidation,validateSession,],reference);
    server.use('/configuration',[schemaValidation,saasValidation,validateSession,],configuration);
    server.use('/tasks',[schemaValidation,saasValidation,validateSession,],tasks);
    server.use('/evidences',[schemaValidation,saasValidation,validateSession,],evidence);
};

export default ROUTES;