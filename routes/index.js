var express = require('express');
var router = express.Router();

var sql = require('../lib/DBConnector');

/* GET home page. */
router.get('/', function(req, res, next) {
	

	//TEMP SOLUTION

	//Initialize tables and then render main screen
	sql.createTables( function(error){
		if( error ){
			console.log(error);
		}
		res.render('index', { title: 'Express' });
	});
	

	//
	//	TESTING sql querys
	//

	sql.createNewUser( "goggias", "1234", function( error ){
		if(error){
			console.log(error);	
		} else{
			console.log("tókst !!!!!!!");
		}
	});

	/*sql.isValidUser( "goggias", "1234", function( error, isValid ){
		if(error){
			console.log("tókst EKKI !!!!!!!");
			console.log(error);	
		} else if(isValid){
			console.log("tókst !!!!!!!");
			console.log(result);
		} else{
			console.log("SKRÍTIÐ");
		}
	});*/

	

	/*sql.findHighScoreForAll( "goggias", "1234", function( error, isValid ){
		if(error){
			console.log("tókst EKKI !!!!!!!");
			console.log(error);	
		} else if(isValid){
			console.log("tókst !!!!!!!");
			console.log(result);
		} else{
			console.log("SKRÍTIÐ");
		}
	});*/

	//sql.

});

module.exports = router;
	