import express from 'express';
import { crudRouter } from './crud.routes.js';

const router = express.Router();

router.use('/crud', crudRouter);

export { router };