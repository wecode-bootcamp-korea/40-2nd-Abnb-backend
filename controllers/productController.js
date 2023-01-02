const productService = require('../services/productService');

const getProductById = async (req, res) => {
  const productId = req.params.productId;
  const product = await productService.getProductById(productId);
  return res.status(200).json(product);
};

const createBooking = async (req, res) => {
  try {
    const guestId = req.data;
    const { guestNumber, productId, checkIn, checkOut, totalPrice } = req.body;
    if (!productId || !guestNumber || !checkIn || !checkOut || !totalPrice) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }
    const result = await productServices.createBooking(
      productId,
      guestId,
      guestNumber,
      checkIn,
      checkOut,
      totalPrice
    );
    if (result) {
      return res.status(201).json({ message: 'completed!' });
    }
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createBooking,
  getProductById,
};
