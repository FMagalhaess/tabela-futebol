import { Router } from 'express';
import teamRoute from './teamRoutes';
import matchRoute from './matchsRoutes';

const route = Router();

route.use('/teams', teamRoute);
route.use('/matches', matchRoute);

export default route;
