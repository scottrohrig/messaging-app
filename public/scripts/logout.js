/* eslint-disable no-undef */
async function logout() {
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    // eslint-disable-next-line no-alert
    alert(response.statusText);
  }
}

document.getElementById('logout').addEventListener('click', logout);
