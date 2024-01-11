import { Router } from 'express';
import matchController from '../Controller/matchController';

const route = Router();

route.get('/', matchController.teamGetAll);
route.get('/:id', matchController.teamGetById);
// route.patch('/:id/finish', matchController.finishMatch);

export default route;
