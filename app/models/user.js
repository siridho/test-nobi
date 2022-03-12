"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
      },
    },
    {
      timestamps: false,
    }
  );

  user.associate = function (models) {
    // associations can be defined here
  };

  return user;
};
