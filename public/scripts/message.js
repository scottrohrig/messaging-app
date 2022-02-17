const { header } = require("express/lib/request");

async function messageFormHandler(event) {
  event.preventDefault();

  const msgText = document.getElementById('new-message').value.trim()

  const message = await fetch('/api/messages',{
    method: 'post',
    body: {
      message_text: msgText,
    }
    headers:
  })
}

document.getElementById('new-message').addEventListener('submit', messageFormHandler)
