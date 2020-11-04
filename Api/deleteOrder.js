import Global from '../components/Global';

const deleteOrder = (idOrder) =>
  fetch(Global.link + 'deleteorder.php', {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idOrder: idOrder,
    }),
  }).then((response) => response.json());

module.exports = {deleteOrder};
