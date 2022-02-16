// require Model & DataTypes from sequelize
const { Model, DataTypes } = require('sequelize');
// require bcrypt
const bcrypt = require('bcrypt');
// require sequelize from connection.js
const sequelize = require('../config/connection');

// define the User class that extends Model
class User extends Model {
  // create an instance method that checks the password
  async checkPassword(loginPw) {
    const match = await bcrypt.compare(loginPw, this.password);
    return match;
  }
}

// initialize the User Model's columns and options,
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        // eslint-disable-next-line no-param-reassign
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(newUserData) {
        // eslint-disable-next-line no-param-reassign
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

// modularize this script by exporting User
module.exports = User;
