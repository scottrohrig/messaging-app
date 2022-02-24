/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-undef */
async function messageFormHandler(event) {
  event.preventDefault();

  const form = event.target;
  const sendBtn = form.querySelector('.send-btn');

  const msgText = document.getElementById('new-message').value.trim();
  const id = sendBtn.dataset.cid;

  const message = await fetch('/api/messages', {
    method: 'post',
    body: JSON.stringify({
      message_text: msgText,
      conversation_id: id,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (message.ok) {
    document.location.reload();
  }
}

document
  .querySelector('#messageForm')
  .addEventListener('submit', messageFormHandler);

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
