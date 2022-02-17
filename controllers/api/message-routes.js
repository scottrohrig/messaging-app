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
// TODO: [ ] - Need a route to handle creating a new message when the
// new-message textarea form is submitted. It needs to be a post
// request and pass in the currently logged in user_id, and the current
// conversation_id

// DELETE message

module.exports = router;
