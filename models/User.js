// require Model & DataTypes from sequelize
const { Model, DataTypes } = require('sequelize');
// require bcrypt
const bcrypt = require('bcrypt');
// require sequelize from connection.js
const sequelize = require('../config/connection');

// define the User class that extends Model
class User extends Model {
  // create an instance method that checks the password
  checkPassword(loginPw) {
    // return compared password from bcrypt. Consider making this asynchronous
    return bcrypt.compareSync(loginPW, this.password);
  }
}

// initialize the User Model's columns and options,
User.init(
  {
    // define an id column
    id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // equivalent of SQL "NOT NULL"
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true,
    },
    // define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least four characters long
        len: [4],
      },
    },
  },
  {
    hooks: {
      // and add a beforeCreate method to the hooks to encrypt the user password
      async beforeCreate(newUserData) {
        // hash the newUserData.password
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        // return the newUserData
        return newUserData;
      },
      // set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        // return the updatedUserData
        return updatedUserData;
      },
    },
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user',
  }
);

// modularize this script by exporting User
module.exports = User;
