const { Conversation } = require('../../models');

const router = require('express').Router;

// GET all conversations
router.get('/', async (req, res) => {
  Conversation.findAll
}

// GET conversation by id

// CREATE new conversation

// UPDATE conversation_messages

// * UPDATE conversation_participants

// DELETE conversation

module.exports = router;
