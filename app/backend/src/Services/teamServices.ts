import Teams from '../database/models/Teams';
// import TTeams from '../Types/TTeams';

// export default class TeamServices {
//   constructor(private teamModel: TTeams = new Teams()) {}
//   public async getTeams() {
//     const teams = await this.teamModel.findAll();
// }
// };

const getAll = async () => {
  const getAllTeams = await Teams.findAll();
  return getAllTeams;
};
const getById = async (idToFind: any) => {
  const getTeamById = await Teams.findByPk(idToFind);
  return getTeamById;
};
export default {
  getAll,
  getById,
};
