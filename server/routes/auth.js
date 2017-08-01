const express = require('express');
const { passport, auth } = require('../middleware');

const router = express.Router();

router.route('/')
  .get(auth.verify, (req, res) => {
    res.render('index.ejs', { user: req.user });
  });

router.route('/login')
  .get((req, res) => {
    res.render('login.ejs', { message: req.flash('Sorry, there was an error accessing the login page :/') });
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.route('/signup')
  .get((req, res) => {
    res.render('signup.ejs', { message: req.flash('Sorry, there was an error signing up :/') });
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

router.route('/profile')
  .get(auth.verify, (req, res) => {
    res.render('profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

router.get('/auth/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;
