'use strict'
module.exports = (sequelize, DataTypes) => {
   const balance = sequelize.define(
      'balance',
      {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
         },
         user_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0,
         },
         amount_available: {
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

   balance.associate = function (models) {
      // associations can be defined here
   }

   return balance
}
