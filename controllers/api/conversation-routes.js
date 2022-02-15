const router = require('express').Router();
const { User, Conversation, Message } = require('../../models');

// GET all conversations
router.get('/', (req, res) => {
  Conversation.findAll({
    include: [
      {
        model: Message,
        attributes: ['message_text', 'created_at'],
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      },
    ],
  })
    .then((conversations) => res.json(conversations))
    .catch((err) => console.error(err));
});

// GET conversation by id
router.get('/:id', async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Message,
          attributes: ['message_text', 'created_at'],
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    res.json(conversation);
  } catch (err) {
    res.json(err);
  }
});

// CREATE new conversation

// UPDATE conversation_messages

// * UPDATE conversation_participants

// DELETE conversation

module.exports = router;
