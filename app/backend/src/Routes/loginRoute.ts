import { Router } from 'express';
import loginController from '../Controller/loginController';
import loginValidate from '../middlewares/loginValidate';

const { validateLogin, emailChecker, passwordChecker } = loginValidate;

const route = Router();

route.post('/', validateLogin, emailChecker, passwordChecker, loginController.login);

export default route;
