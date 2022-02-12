const router = require('express').Router();
const { User, Conversation, Participant } = require('../../models');

// GET all message

// GET message by id

// CREATE new message

// DELETE message

// GET all conversations for a specific user
// ********************************
// SELECT
//     conversation_id
// FROM participants
// WHERE user_id = 4;
router.get('/:id', (req, res) => {
  // are
  Participant.findAll({
    where: { user_id: req.session.user_id },

  })
  .then(({conversation_id}) => {conversat})
});

// for each conversation_id
// GET all messages matching conversation_id
// ********************************
// SELECT
//     msg.message_text,
//     user.username
// FROM message AS msg
// LEFT JOIN user ON msg.sender_id = user.id
// WHERE conversation_id = 2;

module.exports = router;
