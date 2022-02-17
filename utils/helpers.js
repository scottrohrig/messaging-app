module.exports = {
  getLastMessage: (messages) => {
    if (!messages.length) {
      return '';
    }
    return messages[messages.length - 1].message_text;
  },
  getLastMsgUsername: (messages) => {
    if (!messages.length) {
      return '';
    }
    return messages[messages.length - 1].user.username;
  },
  getLastMsgUserPfp: (messages) => {
    if (!messages.length) {
      return 'avatar-1.png';
    }
    return messages[messages.length - 1].user.pfp_path;
  },
  formatTime: (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  },
};
