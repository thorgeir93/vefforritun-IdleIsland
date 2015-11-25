/*settings.js*/
document.addEventListener('DOMContentLoaded',function() {
	console.log('DOM loaded');
	menu.init();
});

var menu = (function() {
	
	//ELEMENTS
	var container = {};

	function init(){
		console.log( "init!" );
		container.body = document.querySelector('html');
		container.body.addEventListener('mousemove', changeSand);
	}

	function changeSand(e){
		var offset = $('.options').offset();
		var mouseX = (e.pageX - offset.left)/100;
		var mouseY = (e.pageY - offset.top)/100;
    
    //var sandW = $(".container").width();
    //var sandH = $(".container").height();

    var sandW = $(".text").width();
    var sandH = $(".text").height();

		$(".text").css({'position':'absolute', /*'display':'block',*/'left': mouseX+(sandW/2)-31, 'top':mouseY/*+(sandH)*/});
	}

	return {
		init: init
	};
})();