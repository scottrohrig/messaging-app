// import each Model
const User = require('./User');
const Conversation = require('./Conversation');
const Message = require('./Message');
const Participant = require('./Participant');

// setup User associations
// user has many conversations
// !! This sets up a use_id field on the conversation table (with a null value...)
// User.hasMany(Conversation, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE',
// });

// equivalent
// CREATE TABLE conversation (
//   id pk ...,
//   name st...,
//   fk (user_id) REFERENCES user(id) ON delete cascade
// ) socket.io for push messages.

// have something running and if there's something
// new add it to the existing array rather than doing
// a page refresh. That way the user can still use the
// the app while the push is loading in the bg.

// user has many messages
User.hasMany(Message, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Participant, {
  foreignKey: 'user_id',
});

// setup Conversation associations
// conversation has many users
// Conversation.hasMany(User, {
//   foreignKey: 'conversation_id',
//   onDelete: 'CASCADE',
// });
// conversation has many messages
Conversation.hasMany(Message, {
  foreignKey: 'conversation_id',
  onDelete: 'CASCADE',
});

Conversation.hasOne(Participant, {
  foreignKey: 'conversation_id',
});

// Participants associations
Participant.belongsTo(Conversation, {
  foreignKey: 'conversation_id',
});
Participant.belongsTo(User, {
  foreignKey: 'user_id',
});

// setup message associations
// message belongs to one conversation
Message.belongsTo(Conversation, {
  foreignKey: 'conversation_id',
});
// message belongs to one user
Message.belongsTo(User, {
  foreignKey: 'user_id',
});
// modularize this file by exporting an object containing each Model
module.exports = { User, Conversation, Message, Participant };
