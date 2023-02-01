'use strict';
const {
  Model
} = require('sequelize');
const {hashPass} = require('../helper/pass');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Food, {
      	foreignKey: "authorId",
      });

      User.hasMany(models.FavoriteFood);
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
      	msg: "This email is already registered",
      },
      validate: {
	isEmail: {
	  msg: "Email must be email format"
	},
	notNull: {
	  msg: "Email cannot be empty",
	},
	notEmpty: {
	  msg: "Email cannot be empty",
	},
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
	notNull: {
	  msg: "Password cannot be empty",
	},
	notEmpty: {
	  msg: "Password cannot be empty",
	},
	minLength(value) {
	  if (!value || value.length < 5) {
	    throw new Error("Password must be 5 letter long minimum");
	  }
	}
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance) => {
    instance.password = hashPass(instance.password);
  });

  return User;
};
