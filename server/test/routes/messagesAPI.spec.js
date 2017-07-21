'use strict';
const request = require('supertest');
// const express = require('express');
const expect = require('chai').expect;
const app = require('../../app.js');
const dbUtils = require('../../../db/lib/utils.js');

describe('Messages API', function() {
  beforeEach(function(done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function(done) {
    dbUtils.rollback(done);
  });

  it('accepts POST requests to /api/messages', function(done) {
    let message = {
      text: 'some text',
      user_id: 1,
      channel_id: 2
    };

    request(app)
      .post('/api/messages')
      .send(message)
      .expect(200)
      .expect(function(res) {
        expect(res.body.text).to.equal('some text');
      })
      .end(done);
  });
});
