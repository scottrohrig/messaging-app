const router = require('express').Router();
const { User, Conversation, Message, Participant } = require('../models');

// returns list of all conversations matching a given id
router.get('/', async (req, res) => {
  if (!req.session.loggedIn) {
    console.log('\n\nNot loggedIn...\n');
    res.render('login');
    return;
  }

  try {
    const dbConversations = await Participant.findAll({
      // TODO: [ ] use req.session.user_id
      // Error: user_id doesn't exist yet.
      where: { user_id: req.session.user_id },
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
                  attributes: ['username', 'pfp_path'],
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

    console.log(req.session);
    // res.json(conversations);
    const conversations = dbConversations.map((conversation) =>
      conversation.get({ plain: true })
    );

    res.render('home', { conversations, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).send(`<h1>ERROR: </h1><p>${err.message}</p>`);
  }
});

router.get('/conversations/:id', async (req, res) => {
  const conversationData = await Conversation.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Message,
        attributes: ['message_text', 'created_at'],
        include: [User],
      },
    ],
  });
  console.log('\n\n', conversationData);

  const conversation = conversationData.get({ plain: true });

  console.log('\n\n', { conversation });
  res.render('conversation', { conversation });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/new-conversation', (req, res) => {
  res.render('new-conversation');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
