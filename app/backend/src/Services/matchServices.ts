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
const matchEditGoals = async (idToFind: any, homeGoals: any, awayGoals: any) => {
  const retorno = await Matches.update(
    { homeTeamGoals: Number(homeGoals), awayTeamGoals: Number(awayGoals) },
    { where: { id: Number(idToFind) } },
  );
  return retorno;
};
const checkTeams = async (homeTeamId: any, awayTeamId: any) => {
  if (homeTeamId === awayTeamId) {
    return { code: 422, message: 'It is not possible to create a match with two equal teams' };
  }
  const findHomeTeam = await Teams.findByPk(homeTeamId);
  const findAwayTeam = await Teams.findByPk(awayTeamId);
  if (!findHomeTeam || !findAwayTeam) {
    return { code: 404, message: 'There is no team with such id!' };
  }
  return { code: 200, message: 'Team found' };
};
const createMatch = async (
  homeTeamGoals: any,
  awayTeamGoals: any,
  homeTeamId: any,
  awayTeamId: any,
) => {
  const checkT = await checkTeams(homeTeamId, awayTeamId);
  if (checkT.code !== 200) {
    return { code: checkT.code, message: checkT.message };
  }
  const matchC = await Matches.create({
    homeTeamGoals,
    awayTeamGoals,
    homeTeamId,
    awayTeamId,
    inProgress: true,
  });
  return { code: 201, message: matchC };
};
export default {
  getAll,
  getAllInProgress,
  getAllFinished,
  getById,
  matchFinish,
  matchEditGoals,
  createMatch,
  checkTeams,
};
