import Global from '../components/Global';

const cancelOrder = (idOrderDetail) =>
  fetch(Global.link + 'huydonhang.php', {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: idOrderDetail,
    }),
  }).then((response) => response.json());

module.exports = {cancelOrder};
