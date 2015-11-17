'use strict';

var express = require('express');
var router = express.Router();

var users = require('../lib/DBConnector');

var xss = require('xss');

router.get('/restricted', ensureLoggedinIn, index);
router.get('/login', redirectIfLoggedIn, login);
router.post('/login', loginHandler);
router.get('/logout', logout);
router.get('/create', createForm);
router.post('/create', createHandler);
router.get('/inputStatus', ensureLoggedinIn, index);
//router.get('/wall', getUserInfo);
//router.post('/wall', postUsersMessages);
router.post('/inputStatus', storeMessage, index);

module.exports = router;

/** route middlewares **/

function storeMessage(req, res, next){
  console.log("StoreMessage !");

  var message = req.body.text;
  var username = req.session.user.username;

  users.storeText(username, message, function(error, resStatus){
    if(error){
      console.log("error in storeText in DataBase!");
      console.log( error );
    }
    next();
  });
}

function displayWall(req, res, next){
  res.render('inputStatus', {title:"Wall"});
}

function getUserInfo(req, res, next){
  var userInfo = {};
  res.render('inputStatus',{ title: 'Wall' });
}

/*function postUsersMessages(req, res, next){
  //var userList;
  
  //get all users names from database
  //users.listUsers( function(error, resultRow){
    //userList = resultRow;
  //});

  var usersMessages;
  users.findUsersMessages( function(error, resultRow){
    usersMessages = resultRow;
  });

  console.dir( usersMessages );

  res.render('inputStatus', {title: 'Wall', message:usersMessages});
}*/

function createForm(req, res, next) {
  res.render('create', { title: 'Create user' });
}

function createHandler(req, res, next) {
  var username = xss(req.body.username);
  var password = xss(req.body.password);

  var userNameExist = false;
  users.doesUserNameExist(username, function(error, resultRow){
    if( resultRow.length > 0 ){
      console.log("aaaaaaaaaaaaaaaaa");
      console.log(resultRow);
      userNameExist = true;
    }else{
      console.log("bbbbbbbbbbbbbbbb");
      userNameExist = false;
    }
      var data = {
        title:'Create user',
        post: true,
        success:false,
        error: false
      };


    if( username==='' ){
        data.success = false;
        data.errorText = "You have to insert you user name";
        res.render('create', data);
    }else if( password==='' ){
        data.success = false;
        data.errorText = "You have to insert password";
        res.render('create', data);
    }
    else if(userNameExist){
        data.success = false;
        data.errorText = "User name already exist!";
        res.render('create', data);
    }else{
      console.log("ccccccccccccccccccccccccc");
      // hér vantar *alla* villumeðhöndlun
      users.createUser(username, password, function (err, status) {
        console.log("createUser done!");
        if (err) {
          console.error(err);
        }

        var success = true;

        if (err || !status) {
          success = false;
        }
        data.success = success;
        res.redirect('/inputStatus');
      });
    }
  });

}


function ensureLoggedinIn(req, res, next) {
  if (req.session.user) {
    next(); // köllum í næsta middleware ef við höfum notanda
  } else {
    res.redirect('/login');
  }
}

function redirectIfLoggedIn(req, res, next) {
  if (req.session.user) {
    res.redirect('/inputStatus');
  } else {
    next();
  }
}

function login(req, res, next) {
  res.render('login', { title: 'Log  in' });
}

function loginHandler(req, res, next) {
  var username = xss(req.body.username);
  var password = xss(req.body.password);

  users.auth(username, password, function (err, user) {
    if (user) {
      req.session.regenerate(function (){
        req.session.user = user;
        res.redirect('/inputStatus'); //var wall
      });
    } else {
      console.log( "LOGINHANDLER -> username: "+username);
      var data = {
        title: 'Log in',
        username: username,
        error: true
      };
      res.render('login', data);
    }
  });
}

function logout(req, res, next) {
  // eyðir session og öllum gögnum, verður til nýtt við næsta request
  req.session.destroy(function(){
    res.redirect('/');
  });
}

function index(req, res, next) {
  var user = req.session.user;

 /* users.listUsers(function (err, all) {
    console.log(all);
    console.log(user);
    res.render('inputStatus', {
      title: 'Wall',
      user: user,
      users: all });
  });*/

  users.usersText(function (err, userAndMessage) {
    console.log("User and message-> ");
    console.dir(userAndMessage);
    console.log(user);
    res.render('inputStatus', {
      title: 'Wall',
      user: user,
      users: userAndMessage });
  });
}
