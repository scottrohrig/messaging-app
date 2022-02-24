/* eslint-disable no-undef */
async function logout() {
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    setTimeout(() => {
      document.location.replace('/login');
    }, 200);
  } else {
    // eslint-disable-next-line no-alert
    alert(response.statusText);
  }
}

document.getElementById('logout').addEventListener('click', logout);
