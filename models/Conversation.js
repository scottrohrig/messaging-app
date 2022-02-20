// require Model & DataTypes from sequelize
const { Model, DataTypes } = require('sequelize');
// require sequelize from connection.js
const sequelize = require('../config/connection');
// define the Conversation class that extends Model
class Conversation extends Model {
  static addParticipant(body, models) {
    // make a
    return models.Participant.create({
      user_id: body.user_id,
      conversation_id: body.conversation_id,
    }).then(() => {
      return Conversation.findOne({
        where: { id: body.conversation_id },
        include: [{ model: models.Message }],
      });
    });
  }
}
// initialize the Conversation columns and options
Conversation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    conversation_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'conversation',
  }
);
// modularize this script by exporting Conversation
module.exports = Conversation;
