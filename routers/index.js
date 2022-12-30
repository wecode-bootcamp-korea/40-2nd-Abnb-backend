const express = require('express');
const userRouter = require('./userRouter.js');

const router = express.Router();

router.use('/users', userRouter);

module.exports = router;
