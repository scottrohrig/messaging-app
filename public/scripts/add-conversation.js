/* eslint-disable no-undef */
/* eslint-disable no-alert */
const handleCreateConversation = async (e) => {
  e.preventDefault();

  const conversationName = document
    .getElementById('conversation-title')
    .value.trim();
  const recipientEmail = document
    .getElementById('email-recipient')
    .value.trim();

  if (!conversationName || !recipientEmail) {
    return;
  }
  console.log('Fetching email...', conversationName, recipientEmail);

  const recipientURL = `/api/users/email/${recipientEmail}`;
  const emailResponse = await fetch(recipientURL);

  const recipient = await emailResponse.json();

  console.log('Validating email...', recipient.id);

  if (recipient.id) {
    fetch('/api/conversations/create', {
      method: 'post',
      body: JSON.stringify({
        conversation_name: conversationName,
        recipient_id: recipient.id,
        email: recipient,
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
      .then(({ conversation }) =>
        document.location.replace(`/conversations/${conversation.id}`)
      );
  } else {
    alert('No user with that email!');
  }

  // console.log('Fetching Conversation...');
};

document
  .getElementById('new-conversation-form')
  .addEventListener('submit', handleCreateConversation);
