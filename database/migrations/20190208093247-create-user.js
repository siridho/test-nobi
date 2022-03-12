"use strict";
module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.createTable("users", {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
   },
   name: {
    type: Sequelize.STRING
   },
   email: {
    type: Sequelize.STRING,
    allowNull: false
   },
   username: {
    type: Sequelize.STRING
   },
   password: {
    type: Sequelize.STRING,
    allowNull: false
   },
   created_at: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
   },
   updated_at: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
   }
  });
 },
 down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable("users");
 }
};
