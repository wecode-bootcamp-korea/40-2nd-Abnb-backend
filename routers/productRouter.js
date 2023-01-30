const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const productController = require("../controllers/productController");
const { validation } = require("../middlewares/validation");

router.get("/:productId", productController.getProductById);

// router.post("/booking", validation, productController.createBooking);
router.post("/host", upload.array("imgs", 13), productController.createHost);

router.get('/', productController.getAllProduct);

module.exports = router;
