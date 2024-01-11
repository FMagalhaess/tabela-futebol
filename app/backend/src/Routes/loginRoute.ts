import { Router } from 'express';
import loginController from '../Controller/loginController';
import loginValidate from '../middlewares/loginValidate';

const { validateLogin } = loginValidate;

const route = Router();

route.post('/', validateLogin, loginController.login);

export default route;
