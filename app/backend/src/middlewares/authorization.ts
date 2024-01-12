import { NextFunction, Request, Response } from 'express';
import jwtChecker from '../Utils/JWTChecker';
import Users from '../database/models/Users';

const authorizationProtocol = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const header = jwtChecker(authorization);
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  if (typeof header !== 'string' && !header.email) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
  const emailByDataBase = await Users
    .findOne({ where: { email: typeof header === 'string' ? header : header.email } });
  if (typeof header === 'object' && header.email === emailByDataBase?.dataValues.email) {
    next();
  } else {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default { authorizationProtocol };
