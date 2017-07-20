'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../../app.js');
const dbUtils = require('../../../db/lib/utils.js');

describe('Profiles API', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('accepts GET requests to /api/profiles', function (done) {
    request(app)
      .get('/api/profiles')
      .expect(res => {
        res.body = {
          length: res.body.length
        };
      })
      .expect(200, {
        length: 4
      })
      .end(done);
  });

  it('accepts GET requests to /api/profiles/:id', function (done) {
    request(app)
      .get('/api/profiles/1')
      .expect(res => {
        res.body = {
          id: res.body.id,
          created_at: !!Date.parse(res.body.created_at)
        };
      })
      .expect(200, {
        id: 1,
        created_at: true
      })
      .end(done);
  });

  it('sends 404 if id on GET requests to /api/profiles/:id does not exist', function (done) {
    request(app)
      .get('/api/profiles/123')
      .expect(404)
      .end(done);
  });

  // it('accepts POST requests to /api/profiles', function (done) {
  //   request(app)
  //     .post('/api/profiles')
  //     .send({
  //       username: 'TestUser4',
  //       password: 'happy'
  //     })
  //     .expect(res => {
  //       res.body = {
  //         username: res.body.username,
  //         password: res.body.password
  //       };
  //     })
  //     .expect(201, {
  //       username: 'TestUser4',
  //       password: undefined
  //     })
  //     .end(done);
  // });

  it('accepts PUT requests to /api/profiles/:id', function () {
    let profile = {
      first: 'James',
      last: 'Davenport',
      display: 'James Davenport',
      email: 'example@email.com',
      phone: '415-555-1234'
    };

    return request(app)
      .put('/api/profiles/1')
      .send(profile)
      .expect(201)
      .then(() => {
        return request(app)
          .get('/api/profiles/1')
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

  it('sends 404 if id on PUT requests to /api/profiles/:id does not exist', function (done) {
    request(app)
      .put('/api/profiles/123')
      .expect(404)
      .end(done);
  });

  // it('accepts DELETE requests to /api/profiles/:id', function (done) {
  //   request(app)
  //     .delete('/api/profiles/1')
  //     .expect(200)
  //     .end(done);
  // });

  // it('sends 404 if id on DELETE requests to /api/profiles/:id does not exist', function (done) {
  //   request(app)
  //     .delete('/api/profiles/123')
  //     .expect(404)
  //     .end(done);
  // });
});
















const express = require('express');
const { passport, auth } = require('../middleware');
const { authenticate } = passport;
const { verify } = auth;

const router = express.Router();

router.route('/')
  .get(verify, (req, res) => {
    res.render('index.ejs', { user: req.user });
  });

router.route('/login')
  .get((req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  })
  .post(authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.route('/signup')
  .get((req, res) => {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  })
  .post(authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

router.route('/profile')
  .get(verify, (req, res) => {
    res.render('profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

router.get('/auth/google', authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/auth/google/callback', authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));

router.get('/auth/facebook', authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback', authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/auth/twitter', authenticate('twitter'));

router.get('/auth/twitter/callback', authenticate('twitter', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));

module.exports = router;
