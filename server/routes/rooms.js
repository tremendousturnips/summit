const express = require('express');
const router = express.Router();
const { RoleController, RoomController, ChannelController, MessageController } = require('../controllers');

router.route('/').get(RoomController.getAll);

router.route('/:roomId/users').get(RoleController.getUsersInRoom);

router.route('/:roomId/channels').get(ChannelController.getAll);

router.route('/:roomId/channels/:channelId/messages').get(MessageController.getChannelMessages);

module.exports = router;
