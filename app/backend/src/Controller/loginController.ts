import { Request, Response } from 'express';
import loginService from '../Services/loginService';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const retorno = await loginService.login(email, password);
  res.status(retorno.code).json(retorno.message);
};
const findEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const retorno = await loginService.findEmail(email);
  res.status(retorno.code).json(retorno.message);
};

export default {
  login,
  findEmail,
};
