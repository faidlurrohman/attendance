"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Jobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Jobs.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      User_Jobs.belongsTo(models.Job, {
        foreignKey: "job_id",
        as: "job",
      });
    }
  }
  User_Jobs.init(
    {
      user_id: DataTypes.INTEGER,
      job_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User_Jobs",
    }
  );
  return User_Jobs;
};
