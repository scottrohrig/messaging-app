// import each Model
const User = require('./User');
const Conversation = require('./Conversation');
const Message = require('./Message');

// setup User associations
// user has many conversations
User.hasMany(Conversation,{
    foreignKey: 'user_id'
    onDelete: "cascade"
});
// user has many messages
User.hasMany(Message, {
    foreignKey:'user_id',
    onDelete: "cascade"
});
// setup Conversation associations
// conversation has many users
Conversation.hasMany(User, {
    foreignKey
})
// conversation has many messages

// setup message associations
// message belongs to one conversation
// message belongs to one user

// modularize this file by exporting an object containing each Model
module.exports = { User };
