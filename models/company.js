"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.belongsToMany(models.Job, {
        through: "Company_Jobs",
        foreignKey: "company_id",
        otherKey: "job_id",
        as: "jobs",
      });
      Company.belongsToMany(models.User, {
        through: "User_Companies",
        foreignKey: "company_id",
        otherKey: "user_id",
        as: "users",
      });
    }
  }
  Company.init(
    {
      name: DataTypes.TEXT,
      address: DataTypes.TEXT,
      phone: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};
