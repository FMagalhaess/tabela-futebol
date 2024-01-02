import TTeams from '../../Types/TTeams';
import { Model, QueryInterface, DataTypes } from 'sequelize';
import Teams from '../models/Teams';

export default {
  up (queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<TTeams>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      teamName: {
          type: DataTypes.STRING,
          field: 'team_name',
        allowNull: false,
      },
    });
  },
  down (queryInterface: QueryInterface)  {
    return queryInterface.dropTable('teams');
  },
};
