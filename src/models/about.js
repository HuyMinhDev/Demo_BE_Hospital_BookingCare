"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class About extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

  About.init(
    {
      name: DataTypes.STRING,

      descriptionHTML: DataTypes.TEXT,
      descriptionMarkdown: DataTypes.TEXT,
      image: DataTypes.TEXT,
      videoLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "About",
    }
  );
  return About;
};
