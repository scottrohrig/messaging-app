// TODO: [*]: import sequelize connection & Conversation model
const { Conversation } = require('../models');

// TODO: [*]: populate conversationData array
const conversationData = [
  'Play House',
  'Dog',
  'Swimming',
  'Aeroplane',
  'Pancakes',
  'Disneyland!',
];

const seedConversations = () => Conversation.bulkCreate(conversationData);

module.exports = seedConversations;
