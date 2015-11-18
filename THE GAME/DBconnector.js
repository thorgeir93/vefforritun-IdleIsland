function DBconnector(){

	console.log('inn i dbconnector constr');
}

DBconnector.prototype.connectionString = "postgres://postgres:M39JPD@localhost/vefforritunLokaverkefni";

DBconnector.prototype.send = function(userData){
	//implement
}

DBconnector.prototype.receiver = function(userName, callback){
	pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return callback(error);
    }
    var values = [userName];
    var query = 'SELECT gameState FROM gameState WHERE username = $1';
    client.query(query, values, function (err, result) {
      
      console.log("Select user done !");
      done();
      if (err) {
        return callback(error);
      } else {
        return callback(null, result.rows);
      }
    });
  });
	//implement
}