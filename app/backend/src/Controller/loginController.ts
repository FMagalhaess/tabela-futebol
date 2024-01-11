import { Request, Response } from 'express';
import loginService from '../Services/loginService';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const retorno = await loginService.login(email, password);
  res.status(200).json(retorno);
};
console.log(loginService);

export default {
  login,
};
