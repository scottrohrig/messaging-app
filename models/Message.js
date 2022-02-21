// require Model & DataTypes from sequelize
const { Model, DataTypes } = require('sequelize');
// require sequelize from connection.js
const sequelize = require('../config/connection');
// define the Message class that extends Model
class Message extends Model {}

// initialize the Message columns and options
Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    message_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conversation_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'conversation',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'message',
  }
);
// modularize this script by exporting Message
module.exports = Message;
