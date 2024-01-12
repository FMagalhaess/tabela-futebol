import Teams from '../database/models/Teams';
import Matches from '../database/models/Macthes';

const getAll = async () => {
  const retorno = await Matches.findAll({ include: [
    { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
    { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
  ] });
  return retorno;
};
const getAllInProgress = async () => {
  const retorno = await Matches.findAll({ where: { inProgress: true },
    include: [
      { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
      { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
    ] });
  return retorno;
};
const getAllFinished = async () => {
  const retorno = await Matches.findAll({ where: { inProgress: false },
    include: [
      { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
      { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
    ] });
  return retorno;
};
const getById = async (idToFind: any) => {
  const retorno = await Matches.findByPk(idToFind, { include: [
    { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
    { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
  ] });
  return retorno;
};
const matchFinish = async (idToFind: any) => {
  const retorno = await Matches.update({ inProgress: false }, { where: { id: idToFind } });
  return retorno;
};
export default {
  getAll,
  getAllInProgress,
  getAllFinished,
  getById,
  matchFinish,
};
