'use strict'

module.exports = {
   up: async (queryInterface, Sequelize) => {
      return queryInterface.createTable('transactions', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         trx_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: '',
            unique: true,
         },
         user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            defaultValue: 0,
         },
         amount: {
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
      return queryInterface.dropTable('transactions')
   },
}
