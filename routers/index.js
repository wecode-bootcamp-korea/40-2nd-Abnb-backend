const express = require('express');
const userRouter = require('./userRouter.js');
const productRouter = require('./productRouter');

const router = express.Router();

router.use('/users', userRouter);

router.use('/products', productRouter);

module.exports = router;
