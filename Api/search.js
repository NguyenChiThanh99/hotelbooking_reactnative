import Global from '../components/Global';

const search = (keyword) =>
  fetch(Global.link + 'search.php', {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({search: keyword}),
  }).then((response) => response.json());
module.exports = {search};
