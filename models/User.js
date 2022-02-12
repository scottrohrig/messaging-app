// require Model & DataTypes from sequelize
const { Model, DataTypes } = require('sequelize');
// require sequelize from connection.js
const sequelize = require('../config/connection');
// require bcrypt
const bcrypt = require('bcrypt');

// define the User class that extends Model
class User extends Model {
  // create an instance method that checks the password
  checkPassword(loginPw) {
    // return compared password from bcrypt. Consider making this asynchronous
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// initialize the User Model's columns and options,
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  }
}),
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
