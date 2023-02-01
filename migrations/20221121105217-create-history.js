'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Histories', {
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
    updatedBy: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
	notNull: true,
	notEmpty: true,
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
    await queryInterface.dropTable('Histories');
  }
};
