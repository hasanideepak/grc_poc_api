import express from 'express';
import cors from 'cors';
import auth from '../routes/auth.js';
import orgs from '../routes/orgs.js';
import reference from '../routes/reference.js';


const corsOptions = {
    origin: '*'
};

const ROUTES = (server) => {
    server.use(express.json())
    server.use(express.urlencoded({ extended: true }));
    server.use(cors(corsOptions));
    server.use('/auth',auth);
    server.use('/orgs',orgs);
    server.use('/reference',reference);
};

export default ROUTES;