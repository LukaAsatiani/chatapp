'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    static associate(models) {
      
    }
  };
  room.init({
    title: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};