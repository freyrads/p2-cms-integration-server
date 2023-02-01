'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn("Food", "status", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Active",
      validate: {
	notNull: true,
	notEmpty: true,
	val(value) {
	  if (!value) value = "Active";
	  if (!["Active", "Inactive", "Archived"].includes(value)) {
	    throw { name: "InvalidFoodStatusError" };
	  }
	}
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn("Food", "status");
  }
};
