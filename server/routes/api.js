'use strict';
const express = require('express');
const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/profiles').post((req, res) => {
  const { username, password } = req.body;
  res.status(200).send(`${username} ${password}`);
});

router.route('/profiles/:userId/friends').get((req, res) => {
  const { userId } = req.params;
  res.status(200).send('Hello World!');
});

router.route('/profiles/:userId/directs/:friendId').get((req, res) => {
  const { userId, friendId } = req.params;
  res.status(200).send('Hello World!');
});

router.route('/rooms/:roomId/channels/:channelId').get((req, res) => {
  const { roomId, channelId } = req.params;
  res.status(200).send('Hello World!');
});

module.exports = router;
