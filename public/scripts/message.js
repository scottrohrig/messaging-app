/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-undef */

const socket = io();

const msgDetails = (details, direction) => {
  const { message_text, conversation_id, user } = details;

  if (direction === 0) {
    return `<li class='list-group-item border-0 py-2 px-0'>
  <div class='d-flex align-items-center justify-content-center'>
    <div class='text-end mx-3'>
      <p class='fw-bold ts-5 lh-1 my-1'>${user} </p>
      <p class='ts-6 lh-1 text-secondary'>${new Date()
        .toLocaleTimeString()
        .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3')}</p>
    </div>
    <div
      class='position-relative flex-grow-1 text-secondary bg-light px-2 py-3 rounded-3 rounded-start'
    >
      <svg
        width='2em'
        height='2.1em'
        viewBox='0 0 16 8'
        class='position-absolute top-0 start-0 translate-middle bi bi-caret-down-fill'
        fill='#f8f9fa'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'
        ></path>
      </svg>
      ${message_text}
    </div>
  `;
  }
  return `<div
            class='position-relative flex-grow-1 h-100 text-white bg-primary px-2 py-3 rounded-3 rounded-end'
          >
            <svg
              width='2em'
              height='2.1em'
              viewBox='0 0 16 8'
              class='position-absolute top-0 start-100 translate-middle bi bi-caret-down-fill'
              {{!-- bg-primary --}}
              fill='#0d6efd'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'
              ></path>
            </svg>
            ${message_text}
          </div>
          <div class='text-start mx-3'>
            <p class='fw-bold ts-5 lh-1 my-1'>
              ${user}
            </p>
            <p class='ts-6 lh-1 text-secondary'>
              ${new Date()
                .toLocaleTimeString()
                .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3')}
            </p>
          </div>`;
};

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

  const { message_text, conversation_id, user } = message;

  const messages = document.getElementById('messages');

  const oldHtml = messages.innerHTML;

  // have to hardcode these bcause I can't get handlebars to register the partials from here
  if ((user_id = 1)) {
    messages.innerHTML = `${oldHtml} ${msgDetails(
      { message_text, conversation_id, user },
      0
    )}  `;
  } else {
    messages.innerHTML = `${oldHtml} ${msgDetails(
      { message_text, conversation_id, user },
      1
    )}  `;
  }

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
    const { participants } = await fetch(
      `/api/conversations/participants/${conversationId}`
    );
    if (participants.length) {
      console.log('\nokay...');
    }
    // still validating user does not already exist in the conversation
    return;
    fetch('/api/conversations/add-participant', {
      method: 'post',
      body: JSON.stringify({
        conversation_id: conversationId,
        user_id: recipient.id,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((conversationResponse) => {
        // console.log('Validating Conversation...');
        if (!conversationResponse.ok) {
          // console.log(conversationResponse.json());
          alert(conversationResponse.statusText);
          return;
        }
        const res = conversationResponse.json();
        console.log(res);
        return res;
      })
      .then(() => document.location.reload());
  }
  alert('No user with that email.');
});
