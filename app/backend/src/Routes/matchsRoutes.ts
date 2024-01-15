import { Router } from 'express';
import matchController from '../Controller/matchController';
import authorization from '../middlewares/authorization';

const { authorizationProtocol } = authorization;
const route = Router();

route.get('/', matchController.teamGetAll);
route.get('/:id', matchController.teamGetById);
route.patch('/:id/finish', authorizationProtocol, matchController.matchFinish);
route.patch('/:id', authorizationProtocol, matchController.matchEditGoals);
route.post('/', authorizationProtocol, matchController.createMatch);
// route.patch('/:id/finish', matchController.finishMatch);

export default route;
