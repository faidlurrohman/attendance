"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsToMany(models.Company, {
        through: "Company_Jobs",
        foreignKey: "job_id",
        otherKey: "company_id",
        as: "companies",
      });
      Job.belongsToMany(models.User, {
        through: "User_Jobs",
        foreignKey: "job_id",
        otherKey: "user_id",
        as: "users",
      });
    }
  }
  Job.init(
    {
      name: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Job",
    }
  );
  return Job;
};
