'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sendForm extends Model {
    static associate(models) {
      // define association here
    }
  }
  sendForm.init({
    nName: DataTypes.STRING,
    nDay: DataTypes.DATE,
    mountainStory: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sendForm',
  });
  return sendForm;
};