const router = require('express').Router();
const { User, Conversation, Message, Participant } = require('../../models');

// GET all message
router.get('/', async (req, res) => {
  try {
    const messages = await Message.findAll({});

    res.json(messages);
  } catch (err) {
    res.json(err);
  }
});

// GET all messages by conversation_id
router.get('/:id', async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { conversation_id: req.params.id },
      // order: [['updated_at', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    res.json(messages);
  } catch (err) {
    res.json(err);
  }
});

// GET message by id

// CREATE new message

// DELETE message

// GET all conversations for a specific user
// ********************************
// SELECT
//     conversation_id
// FROM participants
// WHERE user_id = 4;

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
