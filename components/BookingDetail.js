/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-bitwise */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';
import {AirbnbRating} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

import Global from './Global';
import BadgeComponent from './BadgeComponent';
import Loading from './Loading';
import RatingItem from './RatingItem';

import cancelOrder from '../Api/cancelOrder';
import orderHistoryDetail from '../Api/orderHistoryDetail';
import ratingHotel from '../Api/ratingHotel';
import getrating from '../Api/rating';

import gallery from '../images/gallery.png';
import backIcon from '../images/chevron-left-fff1dc.png';
import startIcon from '../images/start.png';
import endIcon from '../images/end.png';
import priceIcon from '../images/money.png';
import nightIcon from '../images/night.png';
import roomIcon from '../images/room.png';
import serviceIcon from '../images/service.png';
import star from '../images/star-gradient.png';

export default function BookingDetail({route, navigation}) {
  const {
    id,
    tenkhachsan,
    tenphong,
    sodem,
    soluongphong,
    giaphong,
  } = route.params.item;

  useEffect(() => {
    order_detail();
    return () => {
      setData(null);
    };
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(1);
  const [review, setReview] = useState('');
  const [mark, setMark] = useState(5);
  const [imageURL, setImageURL] = useState('');
  const [imageSource, setImageSource] = useState('');
  const [ratingStatus, setRatingStatus] = useState(0);
  const [danhgia, setDanhgia] = useState(null);

  const order_detail = () => {
    orderHistoryDetail
      .orderHistoryDetail(id)
      .then((responseJson) => {
        setData(responseJson);
        setStatus(responseJson[0].trangthai);
        setRatingStatus(responseJson[0].rating);
      })
      .catch((err) => {
        console.log(err);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: -20,
          duration: 2500,
        });
      });
  };

  const getRating = () => {
    setModalVisible2(true);
    getrating
      .rating(ratingStatus)
      .then((responseJson) => {
        setDanhgia(responseJson);
      })
      .catch((err) => {
        console.log(err);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: -20,
          duration: 2500,
        });
      });
  };

  const cancel_order = () => {
    setLoading(true);
    cancelOrder
      .cancelOrder(id)
      .then((responseJson) => {
        if (responseJson === 'Success') {
          setStatus('0');
          Toast.show('Đã hủy đặt phòng ' + tenphong + '!', {
            position: 0,
            duration: 3000,
          });
        } else {
          Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
            position: -20,
            duration: 2500,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: -20,
          duration: 2500,
        });
      });
  };

  const ratingCompleted = (rate) => {
    setMark(rate);
  };

  const selectPhotoTapped = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'Hotel Booking',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.uri;
        const type = response.type;
        const name = response.fileName;
        const source = {
          uri,
          type,
          name,
        };
        setImageURL(uri);
        setImageSource(source);
      }
    });
  };

  const daHuyPhongJSX = (
    <LinearGradient
      style={styles.btnCont}
      colors={['rgba(82, 82, 82, 1)', 'rgba(201, 201, 201, 1)']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>Đã hủy đặt phòng</Text>
      </View>
    </LinearGradient>
  );

  const huyDatPhongJSX = (
    <LinearGradient
      style={styles.btnCont}
      colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          cancel_order();
        }}>
        <View style={{width: width / 8}} />
        <Text style={styles.btnText}>Hủy đặt phòng</Text>
        <View style={{width: width / 8}}>
          {!loading ? null : (
            <ActivityIndicator animating={true} color="#fff" size="small" />
          )}
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );

  if (data === null) {
    return (
      <View style={styles.wrapper}>
        {/* Header */}
        <LinearGradient
          style={styles.headerContainer}
          colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <View style={styles.titleCont}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={backIcon} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Thông tin đặt phòng</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('CART', {fromMain: false})}>
            <BadgeComponent />
          </TouchableOpacity>
        </LinearGradient>

        <Loading />
      </View>
    );
  } else {
    var service = data[0].dichvu.split(', ');

    const cloudinaryUpload = (photo) => {
      setLoading2(true);
      const dulieu = new FormData();
      dulieu.append('file', photo);
      dulieu.append('upload_preset', 'hotelbooking');
      dulieu.append('cloud_name', 'dep0t5tcf');

      fetch('https://api.cloudinary.com/v1_1/dep0t5tcf/upload', {
        method: 'POST',
        body: dulieu,
      })
        .then((res) => res.json())
        .then((res) => {
          ratingHotel
            .ratingHotel(id, res.secure_url, review, mark, data[0].idkhachsan)
            .then((responseJson) => {
              if (responseJson !== 'Fail') {
                setLoading2(false);
                setModalVisible(!modalVisible);
                setRatingStatus(responseJson);
              } else {
                setLoading2(false);
                return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
                  position: -20,
                  duration: 2500,
                });
              }
            })
            .catch((err) => {
              setLoading2(false);
              console.log(err);
              return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
                position: -20,
                duration: 2500,
              });
            });
        })
        .catch((err) => {
          setLoading2(false);
          console.log(err);
        });
    };

    const rating = () => {
      if (review === '' || imageURL === '') {
        return Toast.show('Vui lòng nhập nội dung và ảnh đánh giá', {
          position: -20,
          duration: 2000,
        });
      } else {
        cloudinaryUpload(imageSource);
      }
    };

    const dichVuJSX = (
      <View>
        <View style={[styles.itemCont, {marginLeft: 5}]}>
          <Image style={styles.itemImg} source={serviceIcon} />
          <Text style={styles.dichVu}>Dịch vụ</Text>
        </View>
        {data[0].dichvu === '' ? (
          <Text style={styles.dvItem2}>Không có dịch vụ nào được chọn</Text>
        ) : (
          <View style={styles.dvCont}>
            <View style={{paddingLeft: 20}}>
              {service.map((element, index) => {
                if (index % 2 === 0) {
                  return (
                    <Text key={index.toString()} style={styles.dvItem}>
                      {element}
                    </Text>
                  );
                }
              })}
            </View>
            <View style={{paddingLeft: 14}}>
              {service.map((element, index) => {
                if (index % 2 !== 0) {
                  return (
                    <Text key={index.toString()} style={styles.dvItem}>
                      {element}
                    </Text>
                  );
                }
              })}
            </View>
          </View>
        )}
      </View>
    );

    var ngaynhan = ~~(new Date(data[0].ngaynhanphong) / 86400000);
    var today = ~~(new Date() / 86400000);
    return (
      <View style={styles.wrapper}>
        {/* Header */}
        <LinearGradient
          style={styles.headerContainer}
          colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <View style={styles.titleCont}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={backIcon} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Thông tin đặt phòng</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('CART', {fromMain: false})}>
            <BadgeComponent />
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView>
          <Image style={styles.img} source={{uri: data[0].hinhanh}} />
          <View style={styles.body}>
            <Text style={styles.name}>{tenkhachsan}</Text>
            <Text style={styles.room}>{tenphong}</Text>

            <View style={[styles.itemCont, {marginLeft: 5, marginBottom: 1}]}>
              <Image style={styles.itemImg2} source={priceIcon} />
              <Text style={styles.itemText2}>
                {Global.currencyFormat(
                  (giaphong * sodem * soluongphong).toString(),
                )}{' '}
                đ
              </Text>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={styles.itemCont}>
                <Image style={styles.itemImg} source={roomIcon} />
                <Text style={styles.itemText}>{soluongphong} phòng</Text>
              </View>
              <View style={styles.itemCont}>
                <Image style={styles.itemImg} source={nightIcon} />
                <Text style={styles.itemText}>{sodem} đêm</Text>
              </View>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={styles.itemCont}>
                <Image style={styles.itemImg} source={startIcon} />
                <Text style={styles.itemText}>{data[0].ngaynhanphong}</Text>
              </View>
              <View style={styles.itemCont}>
                <Image style={styles.itemImg} source={endIcon} />
                <Text style={styles.itemText}>{data[0].ngaytraphong}</Text>
              </View>
            </View>

            {dichVuJSX}

            {ratingStatus !== '0' ? (
              <TouchableOpacity
                onPress={() => getRating()}
                style={styles.rating}>
                <Image style={styles.itemImg} source={star} />
                <Text style={styles.ratingText}>Đã đánh giá</Text>
              </TouchableOpacity>
            ) : ngaynhan <= today && status !== '0' ? (
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.rating}>
                <Image style={styles.itemImg} source={star} />
                <Text style={styles.ratingText}>Đánh giá</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>

        <Text style={styles.cancelTitle}>
          *Hủy đặt phòng trước 2 ngày nhận phòng
        </Text>
        {status === '0'
          ? daHuyPhongJSX
          : ngaynhan - today >= 2
          ? huyDatPhongJSX
          : null}

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <LinearGradient
                style={styles.titleModal}
                colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={styles.nameModal}>Đánh giá khách sạn</Text>
              </LinearGradient>

              <ScrollView>
                <View style={styles.bodyModel}>
                  <Image
                    style={styles.imgModel}
                    source={{uri: data[0].hinhanh}}
                  />
                  <Text style={styles.hotelModel}>{tenkhachsan}</Text>
                  <Text style={styles.roomModel}>{tenphong}</Text>
                  <AirbnbRating
                    count={10}
                    reviews={[
                      '1/10',
                      '2/10',
                      '3/10',
                      '4/10',
                      '5/10',
                      '6/10',
                      '7/10',
                      '8/10',
                      '9/10',
                      '10/10',
                    ]}
                    defaultRating={mark}
                    selectedColor={'#F8A170'}
                    reviewColor={'#F8A170'}
                    size={25}
                    reviewSize={18}
                    onFinishRating={ratingCompleted}
                  />
                  <TextInput
                    style={styles.reviewModel}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => setReview(text)}
                    placeholder={'Nhập đánh giá của bạn'}
                    placeholderTextColor={'#bfbfbf'}
                    value={review}
                  />
                  <Text style={styles.uploadTitle}>Upload Photo</Text>

                  {imageURL === '' ? (
                    <TouchableOpacity
                      style={styles.photoCont}
                      onPress={selectPhotoTapped}>
                      <Image source={gallery} style={styles.photoModel} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.photoCont2}
                      onPress={selectPhotoTapped}>
                      <Image
                        source={{uri: imageURL}}
                        style={styles.photoModel2}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.btnModalCont}>
                  <LinearGradient
                    style={styles.btnCont2}
                    colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <TouchableOpacity
                      style={styles.btn2}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}>
                      <Text style={styles.btnText2}>Hủy bỏ</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  {loading2 ? (
                    <ActivityIndicator
                      animating={true}
                      color="#F8A170"
                      size="small"
                    />
                  ) : null}
                  <LinearGradient
                    style={styles.btnCont2}
                    colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <TouchableOpacity
                      style={styles.btn2}
                      onPress={() => {
                        rating();
                      }}>
                      <Text style={styles.btnText2}>Đánh giá</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Modal animationType="slide" transparent={true} visible={modalVisible2}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <LinearGradient
                style={styles.titleModal}
                colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={styles.nameModal}>Đánh giá khách sạn</Text>
              </LinearGradient>

              {danhgia === null ? null : (
                <RatingItem
                  hoten={danhgia[0].hoten}
                  image={danhgia[0].image}
                  content={danhgia[0].content}
                  mark={danhgia[0].mark}
                  ngaynhanphong={danhgia[0].ngaynhanphong}
                  ngaytraphong={danhgia[0].ngaytraphong}
                  tenphong={danhgia[0].tenphong}
                  navigation={navigation}
                  fromListReview={false}
                />
              )}
              <View style={styles.btnModalCont}>
                <LinearGradient
                  style={styles.btnCont2}
                  colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <TouchableOpacity
                    style={styles.btn2}
                    onPress={() => {
                      setModalVisible2(false);
                    }}>
                    <Text style={styles.btnText2}>Đóng</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const {width, backgroud_color, height, height_header} = Global;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  headerContainer: {
    backgroundColor: backgroud_color,
    height: height_header,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleCont: {
    flexDirection: 'row',
    height: height_header,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff1dc',
    fontSize: width / 20,
    fontWeight: 'bold',
  },
  backIcon: {
    width: width / 18,
    resizeMode: 'contain',
    marginRight: 10,
  },
  img: {
    width: width,
    height: height / 3.2,
  },
  name: {
    color: '#393939',
    fontSize: width / 20,
    fontWeight: 'bold',
    width: width / 1.2 - 20,
  },
  btnCont: {
    margin: 10,
    marginTop: 0,
    borderRadius: 10,
    height: height / 14,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: height / 14,
    flexDirection: 'row',
  },
  btnText: {
    fontSize: width / 22,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  body: {
    marginHorizontal: 10,
    marginTop: 10,
    flex: 1,
  },
  room: {
    color: '#616167',
    paddingLeft: 5,
    fontSize: width / 26,
    marginBottom: 20,
  },
  itemCont: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2.2,
    marginVertical: 7,
  },
  itemImg: {
    width: width / 16,
    height: width / 16,
  },
  itemImg2: {
    width: width / 12,
    height: width / 12,
  },
  itemText: {
    color: '#999999',
    marginLeft: 10,
    fontSize: width / 26,
  },
  itemText2: {
    color: '#616167',
    marginLeft: 10,
    fontSize: width / 22,
    fontWeight: 'bold',
  },
  dichVu: {
    color: '#616167',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: width / 25,
  },
  dvCont: {
    flexDirection: 'row',
  },
  dvItem: {
    color: '#999999',
    fontSize: width / 28,
    width: width / 2.5,
    marginBottom: 2,
  },
  dvItem2: {
    color: '#999999',
    fontSize: width / 28,
    marginLeft: 15,
  },
  cancelTitle: {
    color: '#bababa',
    fontSize: width / 38,
    marginLeft: 10,
    marginBottom: 5,
  },
  centeredView: {
    height: height / 1.7,
    marginTop: height / 6,
  },
  modalView: {
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 20,
  },
  titleModal: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  nameModal: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width / 22,
  },
  btnCont2: {
    borderRadius: 8,
    height: height / 20,
  },
  btn2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: height / 20,
    width: width / 3,
  },
  btnText2: {
    fontSize: width / 26,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  btnModalCont: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
  imgModel: {
    width: width / 4,
    height: width / 4,
    borderRadius: width / 8,
  },
  bodyModel: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotelModel: {
    color: '#393939',
    fontSize: width / 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  roomModel: {
    color: '#999999',
    marginBottom: 18,
    fontSize: width / 30,
  },
  uploadTitle: {
    color: '#999999',
    marginVertical: 10,
    fontSize: width / 24,
    fontWeight: 'bold',
  },
  photoModel: {
    width: width / 4,
    height: width / 4,
  },
  photoCont: {
    borderColor: '#c3c1c1',
    borderWidth: 1,
    padding: 10,
    borderStyle: 'dashed',
    borderRadius: 20,
    width: width / 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoModel2: {
    width: width / 1.2 - 20,
    borderRadius: 20,
    height: width / 2,
  },
  photoCont2: {
    borderColor: '#c3c1c1',
    borderWidth: 1,
    padding: 10,
    borderStyle: 'dashed',
    borderRadius: 20,
    width: width / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewModel: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    width: width / 1.2,
    height: width / 2.5,
    marginVertical: 15,
    padding: 15,
    paddingLeft: 20,
    textAlignVertical: 'top',
    fontSize: width / 28,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7,
    marginLeft: 5,
  },
  ratingText: {
    marginLeft: 10,
    color: '#F8A170',
    textDecorationLine: 'underline',
    fontSize: width / 24,
  },
});
