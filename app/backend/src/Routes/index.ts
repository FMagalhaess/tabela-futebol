import { Router } from 'express';
import teamRoute from './teamRoutes';
import matchRoute from './matchsRoutes';
import loginRoute from './loginRoute';

const route = Router();

route.use('/teams', teamRoute);
route.use('/matches', matchRoute);
route.use('/login', loginRoute);

export default route;
