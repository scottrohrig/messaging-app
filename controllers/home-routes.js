const router = require('express').Router();
const { User, Conversation, Message, Participant } = require('../models');

// returns list of all conversations matching a given id
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

    // TODO: [ ] render conversations list instead of returning json
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


router.get('/login', async (req, res) => {
res.render('login')
});

// TODO: [ ]: conversation/:id view
// router.get('/conversation/:id', (req, res) => {
//   res.render('conversation');
// });

module.exports = router;
