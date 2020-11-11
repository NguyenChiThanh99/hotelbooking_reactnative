import Global from '../components/Global';

const signIn = (username, password) =>
  fetch(Global.link + 'signin.php', {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tendangnhap: username,
      matkhau: password,
    }),
  }).then((response) => response.json());

module.exports = {signIn};
