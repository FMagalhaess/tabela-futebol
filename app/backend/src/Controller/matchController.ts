import { Request, Response } from 'express';
import matchesServices from '../Services/matchServices';

const teamGetAll = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress === 'true') {
    const retorno = await matchesServices.getAllInProgress();
    console.log(retorno);
    res.status(200).json(retorno);
    return;
  }
  if (inProgress === 'false') {
    const retorno = await matchesServices.getAllFinished();
    console.log(retorno);
    res.status(200).json(retorno);
    return;
  }
  const retorno = await matchesServices.getAll();
  console.log(retorno);
  res.status(200).json(retorno);
};
const teamGetById = async (req: Request, res: Response) => {
  const retorno = await matchesServices.getById(req.params.id);
  res.status(200).json(retorno);
};
const matchFinish = async (req: Request, res: Response) => {
  const { id } = req.params;
  await matchesServices.matchFinish(id);
  res.status(200).json({ message: 'Finished' });
};
const matchEditGoals = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const retorno = await matchesServices.matchEditGoals(
    id,
    homeTeamGoals,
    awayTeamGoals,
  );
  console.log(retorno);
  res.status(200).json(retorno);
};
const createMatch = async (req: Request, res: Response) => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
  const retorno = await matchesServices
    .createMatch(homeTeamGoals, awayTeamGoals, homeTeamId, awayTeamId);
  if (retorno.code === 201) {
    return res.status(retorno.code).json(retorno.message);
  }
  res.status(retorno.code).json({ message: retorno.message });
};
export default {
  teamGetAll,
  teamGetById,
  matchFinish,
  matchEditGoals,
  createMatch,
};
