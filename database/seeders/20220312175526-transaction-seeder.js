'use strict'

module.exports = {
   up: async (queryInterface, Sequelize) => {
      return await queryInterface.sequelize.query(
         `INSERT INTO transactions (id, trx_id, user_id, amount,
         created_at, updated_at) VALUES
         (1, 'a', 1, 0.01000000, '2022-03-07 09:55:44', '2022-03-07 09:55:44'),
         (2, 'B', 1, 0.02000000, '2022-03-07 09:55:44', '2022-03-07 09:55:44');`,
      )
   },

   down: async (queryInterface, Sequelize) => {
      return await queryInterface.sequelize.query(`truncate transactions`)
   },
}
