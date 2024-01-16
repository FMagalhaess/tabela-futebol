import { Router } from 'express';
import leaderboardController from '../Controller/leaderboardController';

const route = Router();

route.get('/home', leaderboardController.teamGetAllHome);
route.get('/away', leaderboardController.teamGetAllAway);

// route.patch('/:id/finish', matchController.finishMatch);

export default route;
