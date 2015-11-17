var express = require('express');
var router = express.Router();

var sql = require('../lib/DBConnector');
var xss = require('xss');


////
//HOME PAGE
////

router.get('/', homePage);

//TEMP MEHTOD SOLUTION
function homePage(req, res, next){
	//Initialize tables and then render main screen
	sql.createTables( function(error){
		if( error ){
			console.log(error);
		}
		//res.redirect('/login');
		res.render('login', { title: 'Log In' });
	});
}






////
//AUTHERATION / CREATE USER
////

//if enter login in url -> if user is 
router.get('/login', redirectIfLoggedIn, login);
router.post('/login', loginHandler);

router.get('/logout', logout);

router.get('/create', redirectIfLoggedIn, createForm);
router.post('/create', createHandler);



function login(req, res, next) {
  res.render('login', { title: 'Log  in' });
}

function redirectIfLoggedIn(req, res, next) {
  if (req.session.user) {
    res.redirect('/menu');
  } else {
    next();
  }
}

function logout(req, res, next) {
  // eyðir session og öllum gögnum, verður til nýtt við næsta request
  req.session.destroy(function(){
    res.redirect('/');
  });
}

function loginHandler(req, res, next) {
  /*var username = xss(req.body.username);
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
  });*/
}

function createForm(req, res, next) {
  res.render('create', { title: 'Create user' });
}





function createHandler(req, res, next) {
  var username = xss(req.body.username);
  var password = xss(req.body.password);

  var userNameExist = false;

  
  
  /*sql.isValidUser(username, password, function(error, isValid){
  	if(isValid){

  	}
  });


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
  });*/
}







module.exports = router;
	