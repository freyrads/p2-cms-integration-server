'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteFood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FavoriteFood.belongsTo(models.User);
      FavoriteFood.belongsTo(models.Food);
    }
  }
  FavoriteFood.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
	model: "Users",
	key: "id",
      },
      validate: {
	notNull: {
	  msg: "User Id can't be empty",
	},
	notEmpty: {
	  msg: "User Id can't be empty",
	},
      },
    },
    FoodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
	model: "Users",
	key: "id",
      },
      validate: {
	notNull: {
	  msg: "Food Id can't be empty",
	},
	notEmpty: {
	  msg: "Food Id can't be empty",
	},
      },
    }
  }, {
    sequelize,
    modelName: 'FavoriteFood',
  });
  return FavoriteFood;
};
