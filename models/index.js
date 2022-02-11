// import each Model
const User = require('./User');
const Conversation = require('./Conversation');
const Message = require('./Message');

// setup User associations
// user has many conversations
User.hasMany(Conversation, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
// user has many messages
User.hasMany(Message, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
// setup Conversation associations
// conversation has many users
Conversation.hasMany(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
// conversation has many messages
Conversation.hasMany(Message, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// setup message associations
// message belongs to one conversation
Message.belongsTo(Conversation, {
  foreignKey: 'user_id',
});
// message belongs to one user
Message.belongsTo(User, {
  foreignKey: 'user_id',
});
// modularize this file by exporting an object containing each Model
module.exports = { User, Conversation, Message };
