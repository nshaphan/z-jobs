import express, { Router } from 'express';
import authRouter from './auth.router';
import applicationsRouter from './applications.router';

const router: Router = express.Router();

router.use(authRouter);
router.use(applicationsRouter);

export default router;
