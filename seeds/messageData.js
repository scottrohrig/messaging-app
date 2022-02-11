/* eslint-disable quotes */
const { Message } = require('../models');

const messageData = [
  {
    // PLAYHOUSE
    message_text: 'I finished cleaning the playhouse!',
    user_id: 3,
    conversation_id: 1,
  },
  {
    message_text: 'Thanks Goofy!',
    user_id: 1,
    conversation_id: 1,
  },
  {
    message_text: 'Stupid, bucket.',
    user_id: 2,
    conversation_id: 1,
  },
  {
    // DOG
    message_text: "Pluto it's time for a bath",
    user_id: 1,
    conversation_id: 2,
  },
  {
    message_text: 'woof..',
    user_id: 4,
    conversation_id: 2,
  },
  {
    // SWIMMING
    message_text: 'Get yer shorts on boys its time to head to the water hole!',
    user_id: 3,
    conversation_id: 3,
  },
  {
    message_text: "I don't wear shorts Goofy, I'm a duck",
    user_id: 2,
    conversation_id: 3,
  },
  {
    message_text:
      'Take the wheel mickey! I gotta get on the wing and fix the flap!',
    user_id: 3,
    conversation_id: 4,
  },
  {
    message_text: 'WOOOAAAHH, Goofy! Hold on to your britches',
    user_id: 1,
    conversation_id: 4,
  },
  {
    message_text: "Who's hungry boys, I'm making pancakes!",
    user_id: 2,
    conversation_id: 5,
  },
  {
    message_text: 'Me!',
    user_id: 1,
    conversation_id: 5,
  },
  {
    message_text: 'Garsh! Me too! Thanks Donald',
    user_id: 3,
    conversation_id: 5,
  },
  {
    message_text: 'WOOF!',
    user_id: 4,
    conversation_id: 5,
  },
  {
    message_text: 'Disneyland 2022!!',
    user_id: 1,
    conversation_id: 6,
  },
  {
    message_text: "Let's go!! uh~hyuck!",
    user_id: 3,
    conversation_id: 6,
  },
  {
    message_text: 'I hate disneyland..!@%?!',
    user_id: 2,
    conversation_id: 6,
  },
];

const seedMessages = () => Message.bulkCreate(messageData);

module.exports = seedMessages;
