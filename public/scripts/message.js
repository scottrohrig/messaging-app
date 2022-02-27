/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-undef */

const socket = io();

window.addEventListener('load', (e) => {
  const messages = document.getElementById('messages');

  messages.scrollTop = messages.scrollHeight;
});

async function messageFormHandler(event) {
  event.preventDefault();

  const form = event.target;
  const sendBtn = form.querySelector('.send-btn');

  const msgText = document.getElementById('new-message').value.trim();
  const id = sendBtn.dataset.cid;

  if (!msgText) {
    console.log('enter text to send msg');
    return;
  }
  console.log('msg created');

  const message = await fetch('/api/messages', {
    method: 'post',
    body: JSON.stringify({
      message_text: msgText,
      conversation_id: id,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (message.ok) {
    const messageData = await message.json();

    socket.emit('new message', messageData);
  }
}

document
  .querySelector('#messageForm')
  .addEventListener('submit', messageFormHandler);

socket.on('new message', (message) => {
  console.log('message recieved', message);
  // document.location.reload();

  const { message_text, conversation_id, user_id } = message;

  const messages = document.getElementById('messages');

  const oldHtml = messages.innerHTML;

  

  const msgLi = Handlebars.compile(msgTemplate)

  messages.innerHTML = `
  `;

  messages.scrollTop = messages.scrollHeight;
  document.getElementById('new-message').value = '';
});

$('[data-modal-confirm]').click(async () => {
  const email = $('#add-person-email').val().trim();
  const conversationId = $('[data-modal-confirm]').data('cid');

  const recipientURL = `/api/users/email/${email}`;
  const emailResponse = await fetch(recipientURL);

  const recipient = await emailResponse.json();

  if (recipient.id) {
    let participants = await fetch(
      `/api/conversations/participants/${conversationId}`,
      {
        method: 'post',
        body: JSON.stringify({
          user_id: recipient.id,
        }),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    // console.log('\nokay...');
    participants = await participants.json();

    if (participants) {
      const user = participants.filter(
        (participant) => participant.user_id === recipient.id
      );
      if (user.length > 0) {
        // console.log('user found', user);
      } else {
        // add to conversation
        fetch('/api/conversations/add-participant', {
          method: 'post',
          body: JSON.stringify({
            conversation_id: conversationId,
            user_id: recipient.id,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(async (conversationResponse) => {
            // console.log('Validating Conversation...');
            if (!conversationResponse.ok) {
              // console.log(conversationResponse.json());
              alert(conversationResponse.statusText);
              return;
            }
            const res = await conversationResponse.json();
            console.log(res);
            return res;
          })
          .then(() => document.location.reload());
      }
    }
  } else {
    alert('No user with that email.');
  }
});
