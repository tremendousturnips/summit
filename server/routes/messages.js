const express = require('express');
const router = express.Router();
const { MessageController } = require('../controllers');

router.route('/').post(MessageController.saveMessage);

module.exports = router;
