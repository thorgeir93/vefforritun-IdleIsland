//
//
//	LOG IN SYSTEM (autheration)
//
//
var express = require('express');
var router = express.Router();

var sql = require('../lib/DBConnector');
var xss = require('xss');

//var ensureUser = require('../lib/ensureLoggedIn');

//if enter login in url -> if user is 
router.get('/login', redirectIfLoggedIn, login);
router.post('/login', loginHandler);

router.get('/create', redirectIfLoggedIn, createForm);
router.post('/create', createHandler);

router.get('/logout', logout);


function login(req, res, next) {
	console.log("hallo");
	res.render('login', { title: 'Log	in' });
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
	var username = xss(req.body.username);
	var password = xss(req.body.password);

	sql.isValidUser(username, password, function (err, user) {
	if (user) {
		console.log("This user is valid!");
		req.session.regenerate(function (){
			req.session.user = user;
			res.redirect('/menu'); //var wall
		});
	} else {
		console.log("This user is NOT valid!");
		res.render('login', {
			title: 'Log in',
			username: username,
			error: true,
			errorMessage: "Wrong username or password :("
		});
	}
	});
}

function createForm(req, res, next) {
	res.render('create', { title: 'Create user' });
}

//TODO:ask for the "data.message", is it dangerous ?
function createHandler(req, res, next) {
	var username = xss(req.body.username);
	var password = xss(req.body.password);
	console.log(username,password);
	var data = {};

	data.title = 'Create account';
	data.post = true;

	if( isEmpty(username) || isEmpty(password) ){
		handleSmallError(true,"username or password fail!");
		data.errorMessage = "User name and password is requried";
		res.render('create', data);
	} else {

		console.log('herna inni er þetta ða virka');
		sql.isUserNTaken(username, function( error, userNameTaken ){
			handleSmallError(error,"auth.js: finding if username taken");
			if( !error ){
				if( userNameTaken ){
					sql.findRandomUserN( username, function(error, userNames){
						handleSmallError(error, "auth.js:find random User fail");
						data.error = true;
						data.errorMessage='The "'+username+'" is aldready taken.';
						data.userNOptions=userNames;
						res.render('create', data);
					});
				} else if( !userNameTaken ){
					console.log("d");
					sql.createNewUser( username, password, function(error, success){
						if(error){
							console.log("auth.js:Error->Trying to create new user");
							console.log(error);
						}
						res.redirect('/menu');
					});
				}
			}
		});
	}
}


function handleSmallError( error, message ){
	if( error ){
		console.log( message );
		console.log(  error  );
	}
}

function isEmpty( variable ){
	var newString = variable.toString();
	return (newString.length !== 0) ? false : true;
}


module.exports = router;
