const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { User, Conversation } = require('.');

class Participant extends Model {}

Participant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'participant',
  }
);
