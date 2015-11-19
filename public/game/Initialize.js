var g_audio   = {};
var g_images = {};

var g_canvas = document.getElementById("myCanvas");

var g_ctx = g_canvas.getContext("2d");

var leikur = undefined;

var user;

function AudioPreload(callback){
	
	var requiredSounds = {
		bones	: "game/sounds/bones.ogg"
	};

	soundsPreload(requiredSounds, g_audio, callback);
}


function imagePreload(callback){

    var requiredImages = {
      tree      	: "game/images/tree.png",
      upgradeMenu	: "game/images/upgradeMenu.png",
      background0	: "game/images/background0.png",
      UpgradeMenu   : "game/images/UggradeMenu.png",
      backButton    : "game/images/backButton.png",
      upgrade1      : "game/images/upgrade1.png",
      upgrade2      : "game/images/upgrade2.png",
      upgrade3      : "game/images/upgrade3.png",
      unavalible    : "game/images/unavalible.png",
      bought        : "game/images/bought.png",
      coconut       : "game/images/coconut.png"
      };

	imagesPreload(requiredImages, g_images, callback);
}



var _frameTime_ms = null;
var _frameTimeDelta_ms = null;


// Perform one iteration of the mainloop
iter = function (frameTime) {

    // Use the given frameTime to update all of our game-clocks
    _updateClocks(frameTime);

    // Perform the iteration core to do all the "real" work
    _iterCore(_frameTimeDelta_ms);
};

_updateClocks = function (frameTime) {

    // First-time initialisation
    if (_frameTime_ms === null) _frameTime_ms = frameTime;

    // Track frameTime and its delta
    this._frameTimeDelta_ms = frameTime - this._frameTime_ms;
    this._frameTime_ms = frameTime;
};

_iterCore = function (dt) {

    leikur.update(dt);
    
    leikur.render();

    Loop();
};


// Annoying shim for Firefox and Safari
window.requestAnimationFrame =
    window.requestAnimationFrame ||        // Chrome
    window.mozRequestAnimationFrame ||     // Firefox
    window.webkitRequestAnimationFrame;    // Safari

// This needs to be a "global" function, for the "window" APIs to callback to
function mainIterFrame(frameTime) {
    iter(frameTime);
}

_requestNextIteration = function () {
    window.requestAnimationFrame(mainIterFrame);
};


Loop = function () {

    // Grabbing focus is good, but it sometimes screws up jsfiddle,
    // so it's a risky option during "development"
    //
    //window.focus(true);

    // We'll be working on a black background here,
    // so let's use a fillStyle which works against that...
    //
    g_ctx.fillStyle = "white";

	_requestNextIteration();
};


function init(){
	console.log('starting');

	imagePreload(function(){

		AudioPreload(function(){

			console.log('all preloads done');

            user = $('#user')['0'].innerHTML;
            userData = $('#userData')['0'].innerHTML;
            console.log(userData)

			leikur = new gameEngine(g_images, g_audio, user, userData);
			console.log('game engine done...starting game');

			g_canvas.onmousedown = function(e){
				leikur.receiveInputs(e);
			}
			
			Loop();

		});
	});
}

//Starting point of the game
init();