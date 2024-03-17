const express = require('express');
const router = express.Router();
const sendEmail = require('../helper/sendEmail.js');

router.post("/", sendEmail.sendEmail);

module.exports = router;