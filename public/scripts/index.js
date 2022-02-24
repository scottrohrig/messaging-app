/* eslint-disable no-undef */
/* eslint-disable no-unreachable */
const handleDeleteConversation = async (e) => {
  e.preventDefault();

  const id = e.target.closest('.delete-btn').dataset.cid;

  const response = await fetch(`/api/conversations/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.reload();
  } else {
    // eslint-disable-next-line no-alert
    alert(response.statusText);
  }
};

document
  .querySelector('[data-delete-btn]')
  .addEventListener('click', handleDeleteConversation);
