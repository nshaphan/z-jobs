import express, { Router } from 'express';
import { createApplication, getApplications } from '../controllers/products.controller';
import applicationSchema from '../validations/applications.schema';

const productRouter: Router = express.Router();

productRouter
  .post('/applications', applicationSchema, createApplication)
  .get('/applications', getApplications);

export default productRouter;
