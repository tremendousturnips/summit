const express = require('express');
const router = express.Router();
const { RoleController, RoomController, ChannelController, MessageController } = require('../controllers');

router.route('/:id/profiles').get(RoleController.getUsersInRoom);

router.route('/:id/channels').get(ChannelController.getAll);

router.route('/:id/channels').post(ChannelController.saveChannel);

router.route('/:id/channels/:channel_id').delete(ChannelController.destroyChannel);

router.route('/:id/channels/:channel_id/messages').get(MessageController.getChannelMessages);

router.route('/').post(RoomController.saveRoom);

router.route('/').delete(RoomController.destroyRoom);
module.exports = router;
