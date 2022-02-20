// TODO: [*]: import sequelize connection & Conversation model
const { Conversation } = require('../models');

// TODO: [*]: populate conversationData array
const conversationData = [
  { conversation_name: 'Play House' },
  { conversation_name: 'Dog' },
  { conversation_name: 'Swimming' },
  { conversation_name: 'Aeroplane' },
  { conversation_name: 'Pancakes' },
  { conversation_name: 'Disneyland!' },
];

const seedConversations = () => Conversation.bulkCreate(conversationData);

module.exports = seedConversations;
