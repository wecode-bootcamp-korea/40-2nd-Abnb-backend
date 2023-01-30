const productDao = require("../models/productDao");
const userDao = require("../models/userDao");
const {
  queryBuilder,
  dateQueryBuilder,
  createProductList,
} = require('../util/queryBuilder');


const getProductById = async (productId) => {
  const result = await productDao.getProductById(productId);
  return result;
};

const getAllProducts = async (page, reqQuery) => {
  const queryList = Object.entries(reqQuery).filter(
    (ele) =>
      ele[0] !== 'page' &&
      ele[1] !== 'false' &&
      ele[1] !== '상관없음' &&
      ele[0] !== 'checkIn' &&
      ele[0] !== 'checkOut'
  );
  const bookingList = Object.entries(reqQuery).filter(
    (ele) => ele[0] === 'checkIn' || ele[0] === 'checkOut'
  );
  try {
    if (queryList.length === 0 && bookingList.length === 0) {
      return await productDao.getAllProduct(page);
    }

    if (bookingList.length > 0) {
      const bookingClause = dateQueryBuilder(bookingList);
      const result = await productDao.getBookedProduct(bookingClause);
      const productList = createProductList(result);
      const queryClause = queryBuilder(queryList, productList);
      console.log('bookingList', bookingList);
      console.log('result', result);
      console.log('queryClause', queryClause);
      return await productDao.getProductsByQuery(page, queryClause);
    }
    const queryClause = queryBuilder(queryList);
    console.log('queryClause', queryClause);
    return await productDao.getProductsByQuery(page, queryClause);
  } catch (err) {
    throw err;
  }
};

const createBooking = async (
  productId,
  guestId,
  guestNumber,
  checkIn,
  checkOut,
  totalPrice
) => {
  try {
    const userId = await userDao.getUserByKakaoId(guestId);
    return await productDao.createBooking(
      productId,
      userId,
      guestNumber,
      checkIn,
      checkOut,
      totalPrice
    );
  } catch (err) {
    throw err;
  }
};

const createHost = async (
  category,
  roomType,
  title,
  description,
  guest,
  bedroom,
  bed,
  bathroom,
  address,
  lat,
  lng,
  price,
  images
) => {
  const result = await productDao.createHost(
    category,
    roomType,
    title,
    description,
    guest,
    bedroom,
    bed,
    bathroom,
    address,
    lat,
    lng,
    price,
    images
  );
  return result;
};

module.exports = {
  createBooking,
  getAllProducts,
  getProductById,
  createHost,
};
