// import each Model
const User = require('./User');
const Conversation = require('./Conversation');
const Message = require('./Message');

// setup User associations
// user has many conversations
// user has many messages

// setup Conversation associations
// conversation has many users
// conversation has many messages

// setup message associations
// message belongs to one conversation
// message belongs to one user

// modularize this file by exporting an object containing each Model
module.exports = { User };
