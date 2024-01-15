import { Router } from 'express';
import teamRoute from './teamRoutes';
import matchRoute from './matchsRoutes';
import loginRoute from './loginRoute';
import leaderboard from './leaderboard';

const route = Router();

route.use('/teams', teamRoute);
route.use('/matches', matchRoute);
route.use('/login', loginRoute);
route.use('/leaderboard', leaderboard);

export default route;
