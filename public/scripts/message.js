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
    console.log(recipient.id);
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
        return conversationResponse.json();
      })
      .then(() => document.location.reload());
  } else {
    alert('No user with that email!');
  }
});

// const addPeopleModal = document.getElementById('addPeopleModal');
// addPeopleModal.addEventListener('show.bs.modal', function (event) {
//   // Button that triggered the modal
//   const button = event.relatedTarget;
//   // Extract info from data-bs-* attributes
//   const id = button.getAttribute('data-bs-cid');

//   const recipient = addPeopleModal
//     .querySelector('#add-person-email')
//     .value.trim();
//   // If necessary, you could initiate an AJAX request here
//   // and then do the updating in a callback.
//   //
//   // Update the modal's content.
//   const modalTitle = addPeopleModal.querySelector('.modal-title');
//   const modalBodyInput = addPeopleModal.querySelector('.modal-body input');

//   modalTitle.textContent = `New message to ${recipient}`;
//   modalBodyInput.value = recipient;
// });
