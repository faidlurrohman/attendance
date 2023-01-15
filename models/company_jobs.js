"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company_Jobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company_Jobs.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });
      Company_Jobs.belongsTo(models.Job, {
        foreignKey: "job_id",
        as: "job",
      });
    }
  }
  Company_Jobs.init(
    {
      company_id: DataTypes.INTEGER,
      job_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Company_Jobs",
    }
  );
  return Company_Jobs;
};
