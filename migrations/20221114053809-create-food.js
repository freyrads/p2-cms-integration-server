'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Food', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
	type: Sequelize.STRING,
	allowNull: false,
	validate: {
	  notNull: true,
	  notEmpty: true,
	}
      },
      description: {
	type: Sequelize.STRING,
	allowNull: false,
	validate: {
	  notNull: true,
	  notEmpty: true,
	}
      },
      price: {
	type: Sequelize.INTEGER,
	allowNull: false,
	validate: {
	  notNull: true,
	  notEmpty: true,
	  min: 5000,
	}
      },
      imgUrl: {
	type: Sequelize.STRING,
	allowNull: false,
	validate: {
	  notNull: true,
	  notEmpty: true,
	}
      },
      authorId: {
	type: Sequelize.INTEGER,
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
      categoryId: {
	type: Sequelize.INTEGER,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Food');
  }
};
