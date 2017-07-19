'use strict';
const express = require('express');
const router = express.Router();
const { ProfileController, RoomController, MessageController } = require('../controllers');

router.route('/').get(ProfileController.getAll);
// .post(ProfileController.create)

router.route('/:userId').get(ProfileController.getOne).put(ProfileController.update);
// .delete(ProfileController.deleteOne)

router.route('/:userId/rooms').get(RoomController.getAll);


// OURS

router.route('/:userId/friends').get();

router.route('/:userId/directs/:toUserId/messages').get(MessageController.getDirectMessages);

module.exports = router;
