const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validation } = require('../middlewares/validation');

router.get('/:productId', productController.getProductById);

router.post('/booking', validation, productController.createBooking);

module.exports = router;
