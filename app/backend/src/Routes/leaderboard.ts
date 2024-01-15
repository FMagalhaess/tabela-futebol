import { Router } from 'express';
import leaderboardController from '../Controller/leaderboardController';

const route = Router();

route.get('/home', leaderboardController.teamGetAll);
// route.patch('/:id/finish', matchController.finishMatch);

export default route;
