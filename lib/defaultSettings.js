//
//DEFAULT SETTINGS
//
module.exports = function( string ){
	if( string ){
		console.log('return JSON string');
		return '{"audio-slider": 20}';
	} else if(!string){
		console.log('return JSON object');
		return {
			"audio-slider": 20
		};
	}
}