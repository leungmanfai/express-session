var session = require('cookie-session');
var express = require('express');

var app = express();

// cookie-session middleware
app.use(session({
  name: 'session',
  keys: ['this is secret','don not tell anyone']
}));

app.get('/visit', function(req,res) {
  if (req.session.nVisit) {
    req.session.nVisit++;
    res.status(200).send('Welcome Back! Visited ' + req.session.nVisit + ' times.');
  } else {
    req.session.nVisit = 1;
    res.status(200).send('Welcome! This is your first visit');
  }
});

app.get('/', function(req,res) {
  res.redirect('/visit');
})

app.get('/logout', function(req,res) {
  req.session = null;  // clear all session data
  res.redirect('/');
})

app.listen(process.env.PORT || 8099);
