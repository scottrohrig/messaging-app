// require Model & DataTypes from sequelize
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
// require sequelize from connection.js

// define the Conversation class that extends Model
class Conversation extends Model {}

// initialize the Conversation columns and options
Conversation.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    conversation_name{
        type: DataTypes.STRING,
        allowNull: false,
        //look up how to set up default
    },

    }
)
// modularize this script by exporting Conversation
module.exports = Conversation;

