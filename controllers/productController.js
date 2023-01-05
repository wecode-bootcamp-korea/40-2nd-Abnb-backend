const productService = require("../services/productService");

const getProductById = async (req, res) => {
  const productId = req.params.productId;
  const product = await productService.getProductById(productId);
  return res.status(200).json(product);
};

const createHost = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  const images = req.files.map(({ filename }) => filename);
  console.log("images;", images);
  const {
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
  } = req.body;
  // const hostId = req.data;
  await productService.createHost(
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
  return res.status(200).json({ message: "completed!" });
};

module.exports = {
  getProductById,
  createHost,
};
