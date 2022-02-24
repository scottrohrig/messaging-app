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
    const time = new Date(timestamp).toLocaleTimeString({
      hour: '2-digit',
      minute: '2-digit',
    });
    const ftime = `${time.split(':')[0]}:${time.split(':')[1]} ${
      time.split(' ')[1]
    }`;
    return ftime;
  },
  isSender: (username, sender) => {
    return username === sender;
  },
};
