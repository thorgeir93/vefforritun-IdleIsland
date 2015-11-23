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
		cBoxFullS.element2 = document.getElementById('check-off');
		cBoxFullS.element2 = document.getElementById('label-check-off');
		cBoxFullS.element1.addEventListener('click', toggleCheckBoxBackground);
		cBoxFullS.element2.addEventListener('click', toggleCheckBoxBackground);
		
		slider1.element1 = document.querySelector('.audio-slider');
		slider1.element2 = document.querySelector('.audio-number');
		slider1.element3 = document.querySelector('.label-audio');

		slider1.element1.addEventListener('mousedown', updateAudioNum);
		slider1.element1.addEventListener('mousemove', updateAudioNum);
		
		slider1.element2.addEventListener('click', toggleMute);
		slider1.element3.addEventListener('click', toggleMute);
	}


	function toggleMute(){
		if( slider1.element1.classList.contains('audio-on') ){
			for(var element in slider1){
				slider1[element].classList.remove('audio-on');
				slider1[element].classList.add('audio-off');
			}
			slider1.element2.innerHTML = 'Mute';
			//slider1.element4.value = 'Mute';
			slider1.element1.value = 0;
		} else{
			for(var element in slider1){
				slider1[element].classList.remove('audio-off');
				slider1[element].classList.add('audio-on');
			}
			slider1.element2.innerHTML=slider1.element1.value;
		}
	}

	function toggleCheckBoxBackground( event ){
		console.log(cBoxFullS.on);
		if(cBoxFullS.on){
			cBoxFullS.on = false;

			cBoxFullS.element1.id = 'checkbox-off';
			cBoxFullS.element2.id = 'label-check-off';

		} else {
			cBoxFullS.on = true;
			cBoxFullS.element1.id = 'checkbox-on';
			cBoxFullS.element2.id = 'label-check-on';
		}
	}

	function updateAudioNum( event ){
		if( slider1.element1.classList.contains('audio-on') ){
				var newNumber = slider1.element1.value;
				slider1.element2.innerHTML = newNumber;
				//slider1.element4.value = newNumber;
		}
	}

	return {
		init: init
	};
})();