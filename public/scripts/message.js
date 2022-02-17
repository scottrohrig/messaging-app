<<<<<<< HEAD
=======
/* eslint-disable no-undef */
async function messageFormHandler(event) {
  event.preventDefault();

  const msgText = document.getElementById('new-message').value.trim();

  const message = await fetch('/api/messages', {
    method: 'post',
    body: {
      message_text: msgText,
      // TODO: [ ] - include logged in user_id
      // TODO: [ ] - include current conversation_id (from url, eg, '.../conversation/1')
    },
    headers: { 'Content-Type': 'application/json' },
  });
}

document
  .getElementById('new-message')
  .addEventListener('submit', messageFormHandler);
>>>>>>> 6f94fb0ed37dfcbfff91f4596fd97df11ad68e0e
