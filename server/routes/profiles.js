'use strict';
const express = require('express');
const router = express.Router();
const { ProfileController, RoomController, MessageController, FriendsController, DirectController } = require('../controllers');

router.route('/').get(ProfileController.getAll);
// .post(ProfileController.create)

router.route('/:id').get(ProfileController.getOne).put(ProfileController.update);
// .delete(ProfileController.deleteOne)

router.route('/:id/rooms').get(RoomController.getAll);

router.route('/:id/friends').get(FriendsController.getAll);

router.route('/:id/friends/:friendId').delete(FriendsController.deleteOne);

router.route('/:id/friends/:friendId').post(FriendsController.create);

router.route('/:id/friends/:friendId/status/:status').put(FriendsController.update);

router.route('/:id/directs').get(DirectController.getDirects);

router.route('/:id/directs/:friendId').post(DirectController.create);

router.route('/:id/directs/:to_user_id/messages').get(MessageController.getDirectMessages);

router.route('/:id/friends/search/:text').get(FriendsController.search);

module.exports = router;
