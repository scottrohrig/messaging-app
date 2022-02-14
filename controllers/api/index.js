const router = require('express').Router();
const userRoutes = require('./user-routes');
const conversationRoutes = require('./conversation-routes');
const messageRoutes = require('./message-routes');

router.use('/users', userRoutes);
router.use('/conversations', conversationRoutes);
router.use('/messages', messageRoutes);

module.exports = router;
