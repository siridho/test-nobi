'use strict'

module.exports = {
   up: async (queryInterface, Sequelize) => {
      return await queryInterface.sequelize
         .query(`INSERT INTO balances (id, user_id, amount_available, created_at,
    updated_at) VALUES
    (1, 1, 0.00674223, '2022-03-07 09:57:13', '2022-03-07 09:57:13'),
    (2, 2, 1.00000000, '2022-03-07 09:57:13', '2022-03-07 09:57:13'),
    (3, 3, 0.00000001, '2022-03-07 09:57:13', '2022-03-07 09:57:13'),
    (4, 4, 21.00000000, '2022-03-07 09:57:13', '2022-03-07 09:57:13');`)
   },

   down: async (queryInterface, Sequelize) => {
      return await queryInterface.sequelize.query(`truncate balances`)
   },
}
