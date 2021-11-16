import express from 'express';
import cors from 'cors';
import auth from '../routes/auth.js';


const corsOptions = {
    origin: '*'
};

const ROUTES = (server) => {
    server.use(express.json())
    server.use(express.urlencoded({ extended: true }));
    server.use(cors(corsOptions));
    server.use('/auth',auth);
};

export default ROUTES;