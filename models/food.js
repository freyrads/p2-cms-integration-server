'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.belongsTo(models.User, {
      	foreignKey: "authorId",
      });
      Food.belongsTo(models.Category, {
      	foreignKey: "categoryId",
      });

      Food.hasMany(models.FavoriteFood);
    }
  }
  Food.init({
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
	notNull: true,
	notEmpty: true,
	min: 5000,
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
	notNull: true,
	notEmpty: true,
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
	notNull: true,
	notEmpty: true,
      },
      references: {
	model: "Users",
	key: "id",
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Active",
      validate: {
	notNull: true,
	notEmpty: true,
	val(value) {
	  if (!value) value = "Active";
	  if (!["Active", "Inactive", "Archived"].includes(value)) {
	    throw { name: "Invalid food status" };
	  }
	}
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
	notNull: true,
	notEmpty: true,
      },
      references: {
	model: "Categories",
	key: "id",
      }
    },
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};
