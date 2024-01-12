import { Router } from 'express';
import loginController from '../Controller/loginController';
import loginValidate from '../middlewares/loginValidate';
import authorization from '../middlewares/authorization';

const { authorizationProtocol } = authorization;
const { validateLogin, emailChecker, passwordChecker } = loginValidate;

const route = Router();

route.post('/', validateLogin, emailChecker, passwordChecker, loginController.login);
route.get(
  '/role',
  authorizationProtocol,
  validateLogin,
  emailChecker,
  passwordChecker,
  loginController.getRole,
);

export default route;
