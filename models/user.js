"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Company, {
        through: "User_Companies",
        foreignKey: "user_id",
        otherKey: "company_id",
        as: "companies",
      });
      User.belongsToMany(models.Job, {
        through: "User_Jobs",
        foreignKey: "user_id",
        otherKey: "job_id",
        as: "jobs",
      });
      User.hasMany(models.Attendance, {
        foreignKey: "user_id",
        as: "attendances",
      });
      User.hasOne(models.Attendance, {
        foreignKey: "user_id",
        as: "current_attendance",
      });
    }
  }
  User.init(
    {
      first_name: DataTypes.TEXT,
      last_name: DataTypes.TEXT,
      nik: DataTypes.BIGINT,
      phone: DataTypes.BIGINT,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
