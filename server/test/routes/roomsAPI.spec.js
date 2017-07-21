'use strict';
const request = require('supertest');
// const express = require('express');
const expect = require('chai').expect;
const app = require('../../app.js');
const dbUtils = require('../../../db/lib/utils.js');

describe('Rooms API', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('accepts GET requests to /api/rooms/:id/users', function (done) {
    request(app)
      .get('/api/rooms/1/users')
      .expect(res => {
        res.body = {
          length: res.body.length
        };
      })
      .expect(200, {
        length: 3
      })
      .end(done);
  });

  it('accepts GET requests to /api/rooms/:id/channels', function (done) {
    request(app)
      .get('/api/rooms/1/channels')
      .expect(res => {
        expect(res.body.length).to.be.greaterThan(0);
      })
      .expect(200)
      .end(done);
  });

  it('sends 404 if id on GET requests to /api/rooms/:id does not exist', function (done) {
    request(app)
      .get('/api/rooms/1233')
      .expect(404)
      .end(done);
  });

  it('accepts GET requests to /api/rooms/:id/channels/:channel_id/messages', function (done) {
    request(app)
      .get('/api/rooms/1/channels/1/messages')
      .expect(res => {
        expect(res.body.length).to.be.greaterThan(0);
      })
      .expect(200)
      .end(done);
  });
//*********************************************************//

  //keep it for reference
  xit('accepts PUT requests to /api/rooms/:id', function () {
    let profile = {
      first: 'James',
      last: 'Davenport',
      display: 'James Davenport',
      email: 'example@email.com',
      phone: '415-555-1234'
    };

    return request(app)
      .put('/api/rooms/1')
      .send(profile)
      .expect(201)
      .then(() => {
        return request(app)
          .get('/api/rooms/1')
          .expect(res => {
            res.body = {
              first: res.body.first,
              last: res.body.last,
              display: res.body.display,
              email: res.body.email,
              phone: res.body.phone
            };
          })
          .expect(200, profile);
      });
  });

  xit('sends 404 if id on PUT requests to /api/rooms/:id does not exist', function (done) {
    request(app)
      .put('/api/rooms/123')
      .expect(404)
      .end(done);
  });

  // xit('accepts DELETE requests to /api/rooms/:id', function (done) {
  //   request(app)
  //     .delete('/api/rooms/1')
  //     .expect(200)
  //     .end(done);
  // });

  // xit('sends 404 if id on DELETE requests to /api/rooms/:id does not exist', function (done) {
  //   request(app)
  //     .delete('/api/rooms/123')
  //     .expect(404)
  //     .end(done);
  // });
});
