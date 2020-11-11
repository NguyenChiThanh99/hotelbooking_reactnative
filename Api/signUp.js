import Global from '../components/Global';

const signUp = (username, password, name, email, phone) =>
  fetch(Global.link + 'signup.php', {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tendangnhap: username,
      matkhau: password,
      hoten: name,
      sodienthoai: phone,
      email: email,
    }),
  }).then((response) => response.json());

module.exports = {signUp};
