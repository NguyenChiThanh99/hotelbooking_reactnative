import Global from '../components/Global';

const rating = (id) =>
  fetch(Global.link + 'getrating.php', {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
    }),
  }).then((response) => response.json());

module.exports = {rating};
