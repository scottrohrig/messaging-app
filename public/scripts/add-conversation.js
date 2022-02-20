/* eslint-disable no-undef */
/* eslint-disable no-alert */
const handleCreateConversation = async (e) => {
  e.preventDefault();

  const conversationName = document
    .getElementById('conversation-title')
    .value.trim();
  const recipient = document.getElementById('email-recipient').value.trim();

  if (!conversationName || !recipient) {
    return;
  }
  console.log('Fetching email...', conversationName, recipient);
  const emailResponse = await fetch(`/api/users/${recipient}`);

  console.log('Validating email...');
  if (!emailResponse.ok) {
    alert('No user with that email!');
    return;
  }

  console.log('Fetching Conversation...');
  fetch('/api/conversations/create', {
    method: 'post',
    body: JSON.stringify({
      conversation_name: conversationName,
      email: recipient,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((conversationResponse) => {
      console.log('Validating Conversation...');
      if (!conversationResponse.ok) {
        console.log(conversationResponse.json());
        alert(conversationResponse.statusText);
        return;
      }
      return conversationResponse.json();
    })
    .then(({ conversation }) =>
      document.location.replace(`/conversations/${conversation.id}`)
    );
};

document
  .getElementById('new-conversation-form')
  .addEventListener('submit', handleCreateConversation);
