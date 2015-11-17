var fs = require('fs');



module.exports = {

	initTables: function( callback ){
		fs.readFile('../sql/create', 'utf-8', function(error, data){
		if( error ){
			console.log( error );
		}
			callback( data );
		});
	}

};
