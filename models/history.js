'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
	notNull: true,
	notEmpty: true,
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
	notNull: true,
	notEmpty: true,
      }
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
	notNull: true,
	notEmpty: true,
      }
    }
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};
