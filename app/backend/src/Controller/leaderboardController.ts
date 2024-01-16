import { Request, Response } from 'express';
import leaderboard from '../Services/leaderboard';

const teamGetAllHome = async (req: Request, res: Response) => {
  const { filter } = req.query;
  const filtered = await leaderboard.filterMatches(filter, 'home');
  res.status(200).json(filtered);
};
const teamGetAllAway = async (req: Request, res: Response) => {
  const { filter } = req.query;
  const filtered = await leaderboard.filterMatches(filter, 'away');
  res.status(200).json(filtered);
};

export default {
  teamGetAllHome,
  teamGetAllAway,
};
