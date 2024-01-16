import Matches from '../database/models/Macthes';
import Teams from '../database/models/Teams';

const getMatchesByTeam = async (id: any, mando:any) => {
  if (mando === 'home' || !mando) {
    const retorno = await Matches.findAll({ where: { homeTeamId: id, inProgress: false } });
    return retorno;
  }

  const retorno = await Matches.findAll({ where: { awayTeamId: id, inProgress: false } });
  return retorno;
};
const resultChecker = async (id: any, mando:any) => {
  let vitorias = 0;
  let derrotas = 0;
  let empates = 0;
  const contandoComoMaias = getMatchesByTeam(id, mando);
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
const pointsChecker = async (id:any, mando: any) => {
  const results = await resultChecker(id, mando);
  const pontos = (results.vitorias * 3) + results.empates;
  return pontos;
};
const goalsChecker = async (id: any, mando:any) => {
  let golsFeitos = 0;
  let golsSofridos = 0;
  const contandoComoMaias = getMatchesByTeam(id, mando);
  (await contandoComoMaias).map((partida) => {
    golsFeitos += partida.homeTeamGoals;
    golsSofridos += partida.awayTeamGoals;
    return null;
  });
  return { golsFeitos, golsSofridos, saldo: golsFeitos - golsSofridos };
};
const efficiencyChecker = async (id: any, mando: any) => {
  const partidasJogadas = await getMatchesByTeam(id, mando);
  const pontos = await pointsChecker(id, mando);
  const efficiency = (pontos / (partidasJogadas.length * 3)) * 100;
  return efficiency;
};
const likeMayans = async (id: any, nome: any, mando: any) => ({
  name: nome,
  totalPoints: await pointsChecker(id, mando),
  totalGames: (await getMatchesByTeam(id, mando)).length,
  totalVictories: (await resultChecker(id, mando)).vitorias,
  totalDraws: (await resultChecker(id, mando)).empates,
  totalLosses: (await resultChecker(id, mando)).derrotas,
  goalsFavor: (await goalsChecker(id, mando)).golsFeitos,
  goalsOwn: (await goalsChecker(id, mando)).golsSofridos,
  goalsBalance: (await goalsChecker(id, mando)).saldo,
  efficiency: Number((await efficiencyChecker(id, mando)).toFixed(2)),
});
const findOneByOne = async (id: any, mando:any) => {
  const nome = await Teams.findByPk(id);
  if (!nome) {
    return { code: 404, message: 'Team not found' };
  }
  const retorno = await likeMayans(id, nome.dataValues.teamName, mando);
  return retorno;
//   return { teamName: nome.dataValues.teamName, ...retorno[0].dataValues };
};
const getAllHome = async (mando: any) => {
  const retorno: any = [];
  const times = await Teams.findAll();
  // Usando Promise.all para esperar que todas as operações assíncronas sejam concluídas
  await Promise.all(
    times.map(async (time) => {
      const tabela = await findOneByOne(time.id, mando);
      // console.log(retorno);
      retorno.push(tabela);
    }),
  );

  return retorno;
};

const filterByPoint = async (teams: any) => {
  teams.sort((a: any, b: any) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (b.totalVictories !== a.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }
    if (b.goalsBalance !== a.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.goalsFavor - a.goalsFavor;
  });
  return teams;
};

const filterByEfficiency = async (teams: any) => {
  teams.sort((a: any, b: any) => b.efficiency - a.efficiency);
  return teams;
};

const getQuery = async (query: any, teamTable: any) => {
  if (query === 'points') {
    return filterByPoint(teamTable);
  }
  if (query === 'efficiency') {
    return filterByEfficiency(teamTable);
  }
  return null;
};

const filterMatches = async (query: any, mando:any) => {
  const teamTable = await getAllHome(mando);
  if (!query) {
    const retorno = getQuery('points', teamTable);
    return retorno;
  }
  const retorno = getQuery(query, teamTable);
  return retorno;
};

export default {
  getAllHome,
  findOneByOne,
  filterMatches,
};
