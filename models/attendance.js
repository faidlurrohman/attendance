"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attendance.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Attendance.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });
      Attendance.belongsTo(models.Job, {
        foreignKey: "job_id",
        as: "job",
      });
    }
  }
  Attendance.init(
    {
      user_id: DataTypes.INTEGER,
      attendance_in: DataTypes.DATE,
      attendance_out: DataTypes.DATE,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      company_id: DataTypes.INTEGER,
      job_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Attendance",
    }
  );
  return Attendance;
};
