'use strict';
const express = require('express');
const router = express.Router();
const { ProfileController, RoomController } = require('../controllers');

router.route('/').get(ProfileController.getAll);
// .post(ProfileController.create)

router.route('/:userId').get(ProfileController.getOne).put(ProfileController.update);
// .delete(ProfileController.deleteOne)

router.route('/:userId/rooms').get(RoomController.getAll);


// OURS
router.route('/').post((req, res) => {
  const { username, password } = req.body;
  res.status(200).send(`${username} ${password}`);
});

router.route('/:userId/friends').get((req, res) => {
  const { userId } = req.params;
  res.status(200).send('Hello World!');
});

router.route('/:userId/directs/:friendId').get((req, res) => {
  const { userId, friendId } = req.params;
  res.status(200).send('Hello World!');
});

module.exports = router;
