import Global from '../components/Global';

const order = (
  tenkhachhang,
  email,
  sodienthoai,
  idtaikhoan,
  cart,
  dichVuArray,
) =>
  fetch(Global.link + 'dathang.php', {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tenkhachhang: tenkhachhang,
      sodienthoai: sodienthoai,
      email: email,
      idtaikhoan: idtaikhoan,
      cart: cart,
      dichVuArray: dichVuArray,
    }),
  }).then((response) => response.json());

module.exports = {order};
