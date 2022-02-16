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

// conversations by user
router.get('/', async (req, res) => {
  try {
    const dbConversations = await Participant.findAll({
      where: { user_id: 1 },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Conversation,
          attributes: ['conversation_name', 'updated_at'],
          include: [
            {
              model: Message,
              attributes: { exclude: ['created_at', 'conversation_id'] },
              include: [
                {
                  model: User,
                  attributes: ['username'],
                },
              ],
            },
          ],
        },
      ],
      // order by user_id decending
      order: [
        [{ model: Conversation }, 'updated_at', 'DESC'],
        [{ model: Conversation }, { model: Message }, 'created_at', 'DESC'],
      ],
    });

    // res.json(conversations);
    const conversations = dbConversations.map((conversation) =>
      conversation.get({ plain: true })
    );
    console.log(conversations);
    res.render('home', { conversations });
  } catch (err) {
    res.status(500).send(`<h1>ERROR: </h1><p>${err.message}</p>`);
  }
});

// CREATE new conversation

// UPDATE conversation_messages

// * UPDATE conversation_participants

// DELETE conversation

module.exports = router;
