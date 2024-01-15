import { Request, Response } from 'express';
import leaderboard from '../Services/leaderboard';

const teamGetAll = async (req: Request, res: Response) => {
  const retorno = await leaderboard.getAll();
  res.status(200).json(retorno);
};

export default {
  teamGetAll,
};
