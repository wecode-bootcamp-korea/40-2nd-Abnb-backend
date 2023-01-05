const productDao = require("../models/productDao");
const userDao = require("../models/userDao");

const getProductById = async (productId) => {
  const result = await productDao.getProductById(productId);
  return result;
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
  getProductById,
  createHost,
};
