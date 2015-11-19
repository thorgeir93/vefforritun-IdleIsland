var databaseConnector = require('../../lib/DBConnector.js');

function DBconnector(){

	console.log('inn i dbconnector constr');
}

DBconnector.prototype.connectionString = "postgres://postgres:M39JPD@localhost/users";

DBconnector.prototype.send = function(userData){
	//implement
}

DBconnector.prototype.receiver = function(userName, callback){
	var data = databaseConnector.getGameState(userName, callback);
	return data;
	//implement
}