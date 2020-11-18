import Global from '../components/Global';

const listRating = (id) =>
  fetch(Global.link + 'getlistrating.php', {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id: id}),
  }).then((response) => response.json());
module.exports = {listRating};
