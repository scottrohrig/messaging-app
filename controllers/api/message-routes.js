const router = require('express').Router();
const { User, Conversation, Message, Participant } = require('../../models');
const withAuth = require('../../utils/auth');

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
router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Message,
          attributes: ['message_text', 'conversation_id'],
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    res.json(message);
  } catch (err) {
    res.json(err);
  }
});

// CREATE new message
// TODO: [ ] - Need a route to handle creating a new message when the
// new-message textarea form is submitted. It needs to be a post
// request and pass in the currently logged in user_id (eg, req.session.user_id), and the current
// conversation_id

router.post('/', withAuth, (req, res) => {
  Message.create({
    message_text: req.body.message_text,
    user_id: req.session.user_id,
    conversation_id: req.body.conversation_id,
  })
    .then((dbMessageData) => res.json(dbMessageData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE message
router.delete('/:id', withAuth, (req, res) => {
  Message.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbMessageData) => {
      if (!dbMessageData) {
        res.status(404).json({ message: 'No message found with this id' });
        return;
      }
      res.json(dbMessageData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
