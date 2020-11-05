import Global from '../components/Global';

const historyBooked = (idUser) =>
  fetch(Global.link + 'getlichsudatphong.php', {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({idUser: idUser}),
  }).then((response) => response.json());
module.exports = {historyBooked};
