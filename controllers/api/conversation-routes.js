const router = require('express').Router();
const { User, Conversation, Message, Participant } = require('../../models');
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

router.get('/participants/:id', async (req, res) => {
  try {
    const [participants] = await Participant.findAll({
      where: { conversation_id: req.params.id },
    });

    console.log('\n\nparticipants\n', participants);
    res.json(participants);
  } catch (err) {
    res.json({ statusText: 'This user is already in the conversation' });
  }
});

// CREATE new conversation
router.post('/create', withAuth, async (req, res) => {
  const conversation = await Conversation.create({
    conversation_name: req.body.conversation_name,
  });

  const participants = [
    {
      user_id: req.session.user_id,
      conversation_id: conversation.id,
    },
    {
      user_id: req.body.recipient_id,
      conversation_id: conversation.id,
    },
  ];

  Participant.bulkCreate(participants, { individualHooks: true });

  res.json({ conversation });
  // res.render('conversation', { conversation });
});

// UPDATE conversation participants
router.post('/add-participant', async (req, res) => {
  console.log('\n\nMaking Participant', req.body);

  Conversation.addParticipant(req.body, { Participant })
    .then((updatedConversationData) => res.json(updatedConversationData))
    .catch((err) => res.json(err));
});

// * UPDATE conversation_participants

// DELETE conversation

router.delete('/:id', (req, res) => {
  Conversation.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbConversationData) => {
      if (!dbConversationData) {
        res.status(404).json({ message: 'No conversation found with this id' });
        return;
      }
      res.json(dbConversationData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
