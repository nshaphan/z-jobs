import express, { Router } from 'express';
import applicationsRouter from './applications.router';

const router: Router = express.Router();

router.use(applicationsRouter);

export default router;
