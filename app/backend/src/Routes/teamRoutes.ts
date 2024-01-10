import { Router } from 'express';
import teamController from '../Controller/teamsController';

const route = Router();

route.get('/', teamController.teamGetAll);
route.get('/:id', teamController.teamGetById);

export default route;
