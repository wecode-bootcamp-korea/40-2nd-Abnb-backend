const productService = require("../services/productService");

const getProductById = async (req, res) => {
  const productId = req.params.productId;
  const product = await productService.getProductById(productId);
  return res.status(200).json(product);
};

module.exports = {
  getProductById,
};
