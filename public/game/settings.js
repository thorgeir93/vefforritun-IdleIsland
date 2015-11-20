/*settings.js*/

document.addEventListener('DOMContentLoaded',function() {
	console.log('DOM loaded');
	settings.init();
});

var settings = (function() {
	
	//ELEMENTS
	var cBoxFullS = {};
	var slider1 = {};
	

	function init(){
		console.log( "init!" );
		cBoxFullS.on = false;
		cBoxFullS.element1 = document.getElementById('checkbox-off');
		cBoxFullS.element2 = document.getElementById('label-fullscreen');
		cBoxFullS.element1.addEventListener('click', toggleCheckBoxBackground);
		cBoxFullS.element2.addEventListener('click', toggleCheckBoxBackground);
		
		slider1.element1 = document.querySelector('.audio-slider');
		slider1.element2 = document.querySelector('.audio-number');
		slider1.element1.addEventListener('mousedown', updateAudioNum);
		slider1.element1.addEventListener('mousemove', updateAudioNum);

		slider1.element2.innerHTML = slider1.element1.value;
	}


	function toggleCheckBoxBackground( event ){
		console.log(cBoxFullS.on);
		if(cBoxFullS.on){
			cBoxFullS.on = false;
			cBoxFullS.element1.id = 'checkbox-off';
		} else {
			cBoxFullS.on = true;
			cBoxFullS.element1.id = 'checkbox-on';
		}
	}

	function updateAudioNum( event ){
		//console.log( "hsfdjkdsf ");
		var newNumber = slider1.element1.value;
		//console.log(slider1.element2);
		slider1.element2.innerHTML = newNumber;
	}

	return {
		init: init
	};
})();

///AUDIO TAKKINN VERÐUR EXXAÐUR I EF ÞAÐ ER ÝTT Á HANN MUTE