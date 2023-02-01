'use strict';

const users = require("../data/users.json");
const {hashPass} = require("../helper/pass");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert("Users", users.map( el => {
      if (!el.role) {
	el.role = ["Admin", "Staff"][Math.random() > 0.8 ? 0 : 1];
      }
      
      el.createdAt = el.updatedAt = new Date();

      el.password = hashPass(el.password);
      return el;
    }));
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Users");
  }
};
