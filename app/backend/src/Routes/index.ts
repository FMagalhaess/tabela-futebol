import { Router } from 'express';
import teamRoute from './teamRoutes';

const route = Router();

route.use('/teams', teamRoute);

export default route;
