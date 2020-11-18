import Global from '../components/Global';

const ratingHotel = (id, image, content, mark, idkhachsan) =>
  fetch(Global.link + 'rating.php', {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_orderdetail: id,
      image: image,
      content: content,
      mark: mark,
      idkhachsan: idkhachsan,
    }),
  }).then((response) => response.json());

module.exports = {ratingHotel};
