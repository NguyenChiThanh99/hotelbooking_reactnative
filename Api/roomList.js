import Global from '../components/Global';

const roomList = (idkhachsan) =>
  fetch(Global.link + 'getloaiphong.php', {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({idkhachsan: idkhachsan}),
  }).then((response) => response.json());

module.exports = {roomList};
