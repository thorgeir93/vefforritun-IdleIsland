var g_audio   = {};
var g_images = {};

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

var g_canvasW = g_canvas.parentElement.clientWidth;
var g_canvasH = g_canvas.parentElement.clientHeight;



var islandPos = { 
  x:(g_canvasW/10), 
  y:(g_canvasH/1.4)
};

var treePos = {
  x:(islandPos.x),
  y:(islandPos.y-350)
};

var coconutPos = {
  x:(treePos.x+170),
  y:(treePos.y+60)
};


//
var upgradePos = {
  x:(g_canvasW-100),
  y:(30)
};



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
      tree      	: "game/images/game-coconut-tree.png",
      upgradeMenu	: "game/images/game-button-upgrade.png",

      gamesky    : "game/images/game-sky-8.png",
      gameseaseven: "game/images/game-sea-7.png",
      gameseasix: "game/images/game-sea-6.png",
      gameseafive: "game/images/game-sea-5.png",
      gameseafour: "game/images/game-sea-4.png",
      gameseatwo: "game/images/game-sea-2.png",
      gameseaone: "game/images/game-sea-1.png",
      gamesandthree: "game/images/game-sand-3-01.png",
      UpgradeMenu   : "game/images/UggradeMenu.png",
      backButton    : "game/images/backButton.png",
      coconut       : "game/images/game-coconut-money.png",
      exit          : "game/images/game-button-exit.png",
      downLvl       : "game/images/uplvl.png",
      upLvl         : "game/images/downlvl.png",

      item1upgrade1 : "game/images/item1upgrade1.png",
      item2upgrade1 : "game/images/item2upgrade1.png",
      item3upgrade1 : "game/images/item3upgrade1.png",

      item1upgrade2 : "game/images/item1upgrade2.png",
      item2upgrade2 : "game/images/item2upgrade2.png",
      item3upgrade2 : "game/images/item3upgrade2.png",

      item1upgrade3 : "game/images/item1upgrade3.png",
      item2upgrade3 : "game/images/item2upgrade3.png",
      item3upgrade3 : "game/images/item3upgrade3.png",

      item4upgrade1 : "game/images/item4upgrade1.png",
      item5upgrade1 : "game/images/item5upgrade1.png",
      item6upgrade1 : "game/images/item6upgrade1.png",

      item4upgrade2 : "game/images/item4upgrade2.png",
      item5upgrade2 : "game/images/item5upgrade2.png",
      item6upgrade2 : "game/images/item6upgrade2.png",

      item4upgrade3 : "game/images/item4upgrade3.png",
      item5upgrade3 : "game/images/item5upgrade3.png",
      item6upgrade3 : "game/images/item6upgrade3.png",

      unavalible    : "game/images/unavalible.png",
      bought        : "game/images/bought.png",
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

  canvasInit();

	imagePreload(function(){

		AudioPreload(function(){

			console.log('all preloads done');

            user = $('#user')['0'].innerHTML;
            userData = $('#userData')['0'].innerHTML;
            console.log(userData.toString())

			leikur = new gameEngine(g_images, g_audio, user, userData);
			console.log('game engine done...starting game');

			g_canvas.onmousedown = function(e){
				leikur.receiveInputs(e);
			}
			
			Loop();

		});
	});
}


function canvasInit(){
  canvas = document.getElementById("myCanvas");
  canvas.width = document.body.clientWidth; //document.width is obsolete
  canvas.height = document.body.clientHeight; //document.height is obsolete
  
  //canvasW = canvas.width;
  //canvasH = canvas.height;
  //canvas.globalAlpha = 0.0;
  //canvas.clearRect(0,0,200,200);
  //canvas.fillStyle = "rgba(0, 0, 0, 0.0)";
}


//Starting point of the game
init();