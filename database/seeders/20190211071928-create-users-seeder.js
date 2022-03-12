const helper = require("../../app/helpers/general");
const models = require("../../app/models");

module.exports = {
 up: async (queryInterface, Sequelize) => {
  let password = await helper.hashing("123");

  return await queryInterface.bulkInsert("users", [
   {
    name: "Administrator",
    email: "admin@email.com",
    username: "admin",
    password: password,
    created_at: new Date(),
    updated_at: new Date()
   },
   {
    name: "John Doe",
    email: "john@email.com",
    username: "john",
    password: password,
    created_at: new Date(),
    updated_at: new Date()
   }
  ]);
 },

 down: (queryInterface, Sequelize) => {
  //
 }
};
