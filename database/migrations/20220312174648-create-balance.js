'use strict'

module.exports = {
   up: async (queryInterface, Sequelize) => {
      return queryInterface.createTable('balances', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            defaultValue: 0,
         },
         amount_available: {
            allowNull: false,
            type: Sequelize.DECIMAL(20, 10),
            defaultValue: 0,
         },
         created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
         },
         updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
         },
      })
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.dropTable('balances')
   },
}
