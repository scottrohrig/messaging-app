// require Model & DataTypes from sequelize
const { Model, DataTypes } = require('sequelize');
// require sequelize from connection.js
const sequelize = require('../config/connection');
// require bcrypt
const bcrypt = requier('bcrypt');

// define the User class that extends Model
class User extends Model {
  // create an instance method that checks the password
  checkPassword(loginPw) {
    // return compared password from bcrypt. Consider making this asynchronous
  }
}

// initialize the User Model's columns and options,
User.init(
  {},
  {
    hooks: {
      // and add a beforeCreate method to the hooks to encrypt the user password
      async beforeCreate(newUserData) {
        // hash the newUserData.password
        // return the newUserData
      },
    },
  }
);

// modularize this script by exporting User
module.exports = User;
