import { Model, QueryInterface, DataTypes } from "sequelize";
import TMatches from "../../Types/TMatches";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<TMatches>>("matches", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
        homeTeamId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        homeTeamGoals: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        awayTeamId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        awayTeamGoals: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        inProgress: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("matches");
  },
};
