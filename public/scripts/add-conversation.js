/* eslint-disable no-undef */

// const axios = require('axios').default;

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

  if (recipient.id) {
    console.log('Validating email...', recipient.id);

    // axios({
    //   method: 'POST',
    //   url: '/api/conversations/create',
    //   timeout: 4000,
    //   data: {
    //     conversation_name: conversationName,
    //     recipient_id: recipient.id,
    //     email: recipient,
    //   },
    // } )
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
