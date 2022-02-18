/* eslint-disable no-unreachable */
const handleDeleteConversation = async (e) => {
  e.preventDefault();

  const id = e.target.closest('.delete-btn').dataset.cid;
  console.log('deleting conversation', id);
  const response = await fetch(`/api/conversations/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector('#conversation-list')
  .addEventListener('click', handleDeleteConversation);
