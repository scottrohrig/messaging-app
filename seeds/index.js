const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedConversations = require('./conversationData');
const seedMessages = require('./messageData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedConversations();

  await seedMessages();

  process.exit(0);
};

seedAll();
