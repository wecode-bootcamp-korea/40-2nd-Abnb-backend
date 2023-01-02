const productDao = require("../models/productDao");

const getProductById = async (productId) => {
  const result = await productDao.getProductById(productId);
  return result;
};

module.exports = {
  getProductById,
};
