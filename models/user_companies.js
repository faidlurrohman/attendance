"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Companies.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      User_Companies.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });
    }
  }
  User_Companies.init(
    {
      user_id: DataTypes.INTEGER,
      company_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User_Companies",
    }
  );
  return User_Companies;
};
