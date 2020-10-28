import Global from '../components/Global';

const hotelLastest = () =>
  fetch(Global.link + 'getspmoinhat.php/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());

module.exports = {hotelLastest};
