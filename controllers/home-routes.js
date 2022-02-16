const router = require('express').Router();
const { User, Conversation, Message, Participant } = require('../models');

// returns list of all conversations matching a given id
router.get('/', async (req, res) => {
  if (!req.session.loggedIn) {
    res.render('login');
  }

  try {
    const dbConversations = await Participant.findAll({
      // TODO: [ ] use req.session.user_id
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

    // res.json(conversations);
    const conversations = dbConversations.map((conversation) =>
      conversation.get({ plain: true })
    );

    res.render('home', { conversations, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).send(`<h1>ERROR: </h1><p>${err.message}</p>`);
  }
});
// TODO: [ ]: conversation/:id view
// router.get('/conversation/:id', (req, res) => {
//   res.render('conversation');
// });

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
