const router = require('express').Router();
const { User, Conversation, Message } = require('../../models');
const withAuth = require('../../utils/auth');

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
  Conversation.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['conversation', 'created_at'],
    include: [
      {
        model: Message,
        attributes: ['message_text', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  })
    .then((conversation) => {
      if (!conversation) {
        res.status(404).json({ message: 'no conversation found' });
        return;
      }
      res.json(Conversation);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/*
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
    // console.log(conversations);
    res.render('home', { conversations });
  } catch (err) {
    res.status(500).send(`<h1>ERROR: </h1><p>${err.message}</p>`);
  }
});
*/

// CREATE new conversation
router.post('/', withAuth, async (req, res) => {
  Conversation.create({ conversation_name: req.body.conversation_name })
    .then((conversation) => res.json(conversation))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
/*

  const conversation = await Conversation.create({
    conversation_name: req.body.conversation_name,
  });

  const participant = await Participant.create({
    user_id: req.session.user_id,
    conversation_id: conversation.id,
  });

  // TODO:  [ ] how to render this new conversation by id?
  res.json({ conversation });
  // res.render('conversation', { conversation });
});
*/

// UPDATE conversation_messages
router.put('/', async (req, res) => {
  Conversation.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((conversation) => {
      if (!conversation[0]) {
        res.status(404).json({ message: 'No Conversation Found' });
        return;
      }
      res.json(conversation);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/*
  // get user_id from email
  const { id } = await User.findOne({
    where: { email: req.body.email },
    attributes: ['id'],
  });

  if (user_id) {
    Conversation.addParticipant({ ...req.body, user_id: id }, { Participant })
      .then((updatedConversationData) => res.json(updatedConversationData))
      .catch((err) => res.jwon(err));
  }
  res.json({ message: 'Not correct', user_id });
});

*/
// * UPDATE conversation_participants

// DELETE conversation

router.delete('/:id', (req, res) => {
  Conversation.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((conversation) => {
      if (!conversation) {
        res.status(404).json({ message: 'No conversation found with this id' });
        return;
      }
      res.json(conversation);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
