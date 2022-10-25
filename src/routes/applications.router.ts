import express, { Router } from 'express';
import { createApplication, getApplications, updateApplicationStatus } from '../controllers/applications.controller';

const applicationRouter: Router = express.Router();

applicationRouter
  .post('/applications', createApplication)
  .put('/applications/:id/status', updateApplicationStatus)
  .get('/applications', getApplications);

export default applicationRouter;
