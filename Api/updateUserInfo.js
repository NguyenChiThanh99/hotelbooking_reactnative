import Global from '../components/Global';

const updateUserInfo = (idUser, name, phone, email) =>
  fetch(Global.link + 'updateuserinfo.php', {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: idUser,
      hoten: name,
      sodienthoai: phone,
      email: email,
    }),
  }).then((response) => response.json());

module.exports = {updateUserInfo};
