import Global from '../components/Global';

const updatePass = (idUser, password) =>
  fetch(Global.link + 'updatepassword.php', {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: idUser,
      matkhau: password,
    }),
  }).then((response) => response.json());

module.exports = {updatePass};
