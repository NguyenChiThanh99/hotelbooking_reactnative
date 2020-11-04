import axios from 'axios';
import Global from '../components/Global';

const doPayment = (amount, tokenId, email, idDonHang, accessToken) => {
  const body = {
    amount: amount,
    tokenId: tokenId,
    email: email,
    idDonHang: idDonHang,
  };
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios
    .post(Global.link + 'payment.php', body, {headers})
    .then(({data}) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in making payment', error);
    });
};

module.exports = {doPayment};
