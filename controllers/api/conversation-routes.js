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

// not needed for our functioning app. This route is handled in ../home-routes.js
// conversations by user
// router.get('/', async (req, res) => {
//   if (!req.session.loggedIn) {
//    res.status(400).json({message:'Not logged in'});
//     return;
//   }
//   try {
//     const dbConversations = await Participant.findAll({
//       where: { user_id: req.session.user_id },
//       include: [
//         {
//           model: User,
//           attributes: ['username'],
//         },
//         {
//           model: Conversation,
//           attributes: ['conversation_name', 'updated_at'],
//           include: [
//             {
//               model: Message,
//               attributes: { exclude: ['created_at', 'conversation_id'] },
//               include: [
//                 {
//                   model: User,
//                   attributes: ['username'],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//       // order by user_id decending
//       order: [
//         [{ model: Conversation }, 'updated_at', 'DESC'],
//         [{ model: Conversation }, { model: Message }, 'created_at', 'DESC'],
//       ],
//     });

//     // res.json(conversations);
//     const conversations = dbConversations.map((conversation) =>
//       conversation.get({ plain: true })
//     );
//     // console.log(conversations);
//     res.render('home', { conversations });
//   } catch (err) {
//     res.status(500).send(`<h1>ERROR: </h1><p>${err.message}</p>`);
//   }
// });

// CREATE new conversation
router.post('/create', withAuth, async (req, res) => {
  const conversation = await Conversation.create({
    conversation_name: req.body.conversation_name,
  });

  const sender = await Participant.create({
    user_id: req.session.user_id,
    conversation_id: conversation.id,
  });

  //  TODO: [ ] - eventually add multiple users at a time (ie. from comma-separated values)
  const recipient = await Participant.create({
    user_id: req.body.recipient_id,
    conversation_id: conversation.id,
  });

  res.json({ conversation });
  // res.render('conversation', { conversation });
});

// UPDATE conversation participants
router.put('/add-participant', async (req, res) => {
  // get user_id from email
  const { id } = await User.findOne({
    where: { email: req.body.email },
    attributes: ['id'],
  });

  if (id) {
    Conversation.addParticipant({ ...req.body, user_id: id }, { Participant })
      .then((updatedConversationData) => res.json(updatedConversationData))
      .catch((err) => res.json(err));
  }
  res.json({ message: 'Not correct', user_id: id });
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
