import Matches from '../database/models/Macthes';
import Teams from '../database/models/Teams';

const getMatchesByTeam = async (id: any) => {
  const retorno = await Matches.findAll({ where: { homeTeamId: id, inProgress: false } });
  //   console.log(retorno);
  return retorno;
};
const resultChecker = async (id: any) => {
  let vitorias = 0;
  let derrotas = 0;
  let empates = 0;
  const contandoComoMaias = getMatchesByTeam(id);
  (await contandoComoMaias).map((partida) => {
    if (partida.homeTeamGoals > partida.awayTeamGoals) {
      vitorias += 1;
    }
    if (partida.homeTeamGoals < partida.awayTeamGoals) {
      derrotas += 1;
    }
    if (partida.homeTeamGoals === partida.awayTeamGoals) {
      empates += 1;
    }
    return null;
  });
  return { vitorias, derrotas, empates,
  };
};
const pointsChecker = async (id:any) => {
  const results = await resultChecker(id);
  const pontos = (results.vitorias * 3) + results.empates;
  return pontos;
};
const goalsChecker = async (id: any) => {
  let golsFeitos = 0;
  let golsSofridos = 0;
  const contandoComoMaias = getMatchesByTeam(id);
  (await contandoComoMaias).map((partida) => {
    golsFeitos += partida.homeTeamGoals;
    golsSofridos += partida.awayTeamGoals;
    return null;
  });
  return { golsFeitos, golsSofridos, saldo: golsFeitos - golsSofridos };
};
const efficiencyChecker = async (id: any) => {
  const partidasJogadas = await getMatchesByTeam(id);
  const pontos = await pointsChecker(id);
  const efficiency = (pontos / (partidasJogadas.length * 3)) * 100;
  return efficiency;
};
const likeMayans = async (id: any, nome: any) => ({
  name: nome,
  totalPoints: await pointsChecker(id),
  totalGames: (await getMatchesByTeam(id)).length,
  totalVictories: (await resultChecker(id)).vitorias,
  totalDraws: (await resultChecker(id)).empates,
  totalLosses: (await resultChecker(id)).derrotas,
  goalsFavor: (await goalsChecker(id)).golsFeitos,
  goalsOwn: (await goalsChecker(id)).golsSofridos,
  goalsBalance: (await goalsChecker(id)).saldo,
  efficiency: Number((await efficiencyChecker(id)).toFixed(2)),
});
const findOneByOne = async (id: any) => {
  const nome = await Teams.findByPk(id);
  if (!nome) {
    return { code: 404, message: 'Team not found' };
  }
  const retorno = await likeMayans(id, nome.dataValues.teamName);
  return retorno;
//   return { teamName: nome.dataValues.teamName, ...retorno[0].dataValues };
};
const getAll = async () => {
  const retorno: any = [];
  const times = await Teams.findAll();

  // Usando Promise.all para esperar que todas as operações assíncronas sejam concluídas
  await Promise.all(
    times.map(async (time) => {
      const tabela = await findOneByOne(time.id);
      console.log(retorno);
      retorno.push(tabela);
    }),
  );

  return retorno;
};

export default {
  getAll,
  findOneByOne,
};
