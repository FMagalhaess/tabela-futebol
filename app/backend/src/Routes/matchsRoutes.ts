import { Router } from 'express';
import matchController from '../Controller/matchController';

const route = Router();

route.get('/', matchController.teamGetAll);
route.get('/:id', matchController.teamGetById);

export default route;
