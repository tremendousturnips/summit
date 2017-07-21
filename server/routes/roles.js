const express = require('express');
const router = express.Router();
const { RoleController } = require('../controllers');

router.route('/').post(RoleController.saveRole);

module.exports = router;
