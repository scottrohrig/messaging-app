/* eslint-disable no-alert */
/* eslint-disable no-undef */
async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
<<<<<<< HEAD
      await setTimeout(() => {
        document.location.replace('/home/');
=======
      setTimeout(() => {
        document.location.replace('/');
>>>>>>> 6f94fb0ed37dfcbfff91f4596fd97df11ad68e0e
      }, 100);
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
