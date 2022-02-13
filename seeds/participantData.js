const { Participant } = require('../models');

const participantData = [
  {
    user_id: 3,
    conversation_id: 1,
  },
  {
    user_id: 1,
    conversation_id: 1,
  },
  {
    user_id: 2,
    conversation_id: 1,
  },
  {
    user_id: 1,
    conversation_id: 2,
  },
  {
    user_id: 4,
    conversation_id: 2,
  },
  {
    user_id: 3,
    conversation_id: 3,
  },
  {
    user_id: 2,
    conversation_id: 3,
  },
  {
    user_id: 3,
    conversation_id: 4,
  },
  {
    user_id: 1,
    conversation_id: 4,
  },
  {
    user_id: 2,
    conversation_id: 5,
  },
  {
    user_id: 1,
    conversation_id: 5,
  },
  {
    user_id: 3,
    conversation_id: 5,
  },
  {
    user_id: 4,
    conversation_id: 5,
  },
  {
    user_id: 1,
    conversation_id: 6,
  },
  {
    user_id: 3,
    conversation_id: 6,
  },
  {
    user_id: 2,
    conversation_id: 6,
  },
];

const seedParticipants = () => Participant.bulkCreate(participantData);

module.exports = seedParticipants;
