import { Request, Response } from 'express';
import teamServices from '../Services/teamServices';

const teamGetAll = async (req: Request, res: Response) => {
  const retorno = await teamServices.getAll();
  console.log(retorno);
  res.status(200).json(retorno);
};
const teamGetById = async (req: Request, res: Response) => {
  const retorno = await teamServices.getById(req.params.id);
  console.log(retorno);
  res.status(200).json(retorno);
};

export default {
  teamGetAll,
  teamGetById,
};
