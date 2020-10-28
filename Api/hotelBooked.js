import Global from '../components/Global';

const hotelBooked = (idUser) =>
  fetch(Global.link + 'getkhachsandadat.php', {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({idUser: idUser}),
  }).then((response) => response.json());
module.exports = {hotelBooked};
