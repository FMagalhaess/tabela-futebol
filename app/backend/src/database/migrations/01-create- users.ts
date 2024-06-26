import { Model, QueryInterface, DataTypes } from "sequelize";
import TUsers from "../../Types/TUsers";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<TUsers>>("users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("users");
  },
};
