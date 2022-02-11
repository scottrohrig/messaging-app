// require Model & DataTypes from sequelize
const {Model, DataTypes} = require('sequelize');
// require sequelize from connection.js
const sequelize = require('../config/connection');
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
    },
/*     user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    }, */
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'conversation'
    }
);
// modularize this script by exporting Conversation
module.exports = Conversation;
