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
