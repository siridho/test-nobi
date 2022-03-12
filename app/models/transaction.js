'use strict'
module.exports = (sequelize, DataTypes) => {
   const transaction = sequelize.define(
      'transaction',
      {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
         },
         trx_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            unique: true,
         },
         user_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0,
         },
         amount: {
            allowNull: false,
            type: DataTypes.DECIMAL(20, 10),
            defaultValue: 0,
         },
         created_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
         },
         updated_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
         },
      },
      {
         timestamps: false,
      },
   )

   transaction.associate = function (models) {
      // associations can be defined here
   }

   return transaction
}
