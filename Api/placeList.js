import Global from '../components/Global';

const placeList = () =>
  fetch(Global.link + 'getloaisp.php/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());

module.exports = {placeList};
