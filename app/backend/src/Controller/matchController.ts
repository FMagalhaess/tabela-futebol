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
  console.log(retorno);
  res.status(200).json(retorno);
};

export default {
  teamGetAll,
  teamGetById,
};
