const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


// User's list
app.get('/users', function(req, res) {
  knex('users').then((userList) => {
    res.render('users', {myObject: userList});
  })
  .catch((err) => {
    console.error(err)
  });
});


// Getting to create page
app.get('/create', function(req, res) {
  knex('users').then((userList) => {
    //console.log(userList)
    //res.json(result)
    res.render('create', {myObject: userList});
  })
  .catch((err) => {
    console.error(err)
  });
});


// Create new user
app.post('/create', function(req, res) {
  knex('users')
    .insert(req.body, '*') //req.body brings whole data structure
    .then((result) => {
      console.log(result);
      //res.sendStatus(200);
      res.redirect('/users');
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });
});


// Edit Page
app.get('/edit/:uid', function(req, res) {
  knex('users')
  .where('id', req.params.uid)
  .then((usersList) => {
    res.render('edit', {myObject: usersList[0]});
  })
  .catch((err) => {
    console.error(err)
  });
});


// Edit user
app.post('/edit/:uid', function(req, res) {
  knex('users')
    .update(req.body)
    .where('id', req.params.uid)
    .then((result) => {
      console.log(req.body);
      res.redirect('/edit/' + req.params.uid);

    })
    .catch((err) => {
      console.log("THIS ERROR");
      console.error(err);
      res.sendStatus(400);
    });
});

// Delete one user
app.get('/delete/:id', function(req, res) {
  knex('users')
    .del()
    .where('id', req.params.id)
    .then((result) => {
      console.log(result);
      res.redirect('/users');
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });
});


// Server message on terminal window
app.listen(port, function() {
  console.log('Howdy!', port);
});
