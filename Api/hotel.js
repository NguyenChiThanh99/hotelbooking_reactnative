import Global from '../components/Global';

const hotel = (page, idsp) =>
  fetch(Global.link + 'getsp.php', {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({page: page, idsp: idsp}),
  }).then((response) => response.json());

module.exports = {hotel};
