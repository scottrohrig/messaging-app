module.exports = {
  getLastMessage: (messages) => {
    return messages[messages.length - 1].message_text;
  },
  getLastMsgUsername: (messages) => {
    return messages[messages.length - 1].user.username;
  },
  getLastMsgUserPfp: (messages) => {
    return messages[messages.length - 1].user.pfp_path;
  },
  formatTime: (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  },
};
