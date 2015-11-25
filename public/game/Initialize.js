var g_audio   = {};
var g_images = {};

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

var g_canvasW = g_canvas.parentElement.clientWidth;
var g_canvasH = g_canvas.parentElement.clientHeight;

g_ctx.globalCompositeOperation='destination-over';

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

var manPos = {
  x:(treePos.x+240),
  y:(treePos.y+280)
};


//
var upgradePos = {
  x:(g_canvasW-100),
  y:(30)
};

var veidistong = {
  x:islandPos.x+580,
  y:islandPos.y
}


var birdPos = {
  x:treePos.x+300,
  y:treePos.y-140
}



var leikur = undefined;

var user;

function AudioPreload(callback){
  
  var requiredSounds = {
    punch : "game/sounds/punch.ogg",
    gameTheme : "game/sounds/GameTheme.ogg",
    purchase  : "game/sounds/purchase.ogg",
    noMoney   : "game/sounds/noMoney.ogg",
    ocean     : "game/sounds/ocean.ogg",
    changeDisp: "game/sounds/changeDisp.ogg",
    exit      : "game/sounds/exit.ogg"
  };

  soundsPreload(requiredSounds, g_audio, callback);
}


function imagePreload(callback){

    var requiredImages = {
      tree        : "game/images/game-coconut-tree.png",
      coconut       : "game/images/game-coconut-money.png",
      exit          : "game/images/game-button-exit.png",
      island        : "game/images/game-sand-3-01.png",


      item1upgrade1         : "game/images/item1upgrade1.png",
      item1upgrade1_bought  : "game/images/item1upgrade1_bought.png",
      item1upgrade2         : "game/images/item1upgrade2.png",
      item1upgrade2_bought  : "game/images/item1upgrade2_bought.png",
      item1upgrade3         : "game/images/item1upgrade3.png",
      item1upgrade3_bought  : "game/images/item1upgrade3_bought.png",

      item2upgrade1         : "game/images/item2upgrade1.png",
      item2upgrade1_bought  : "game/images/item2upgrade1_bought.png",
      item2upgrade2         : "game/images/item2upgrade2.png",
      item2upgrade2_bought  : "game/images/item2upgrade2_bought.png",
      item2upgrade3         : "game/images/item2upgrade3.png",
      item2upgrade3_bought  : "game/images/item2upgrade3_bought.png",

      item3upgrade1         : "game/images/item3upgrade1.png",
      item3upgrade1_bought  : "game/images/item3upgrade1_bought.png",
      item3upgrade2         : "game/images/item3upgrade2.png",
      item3upgrade2_bought  : "game/images/item3upgrade2_bought.png",
      item3upgrade3         : "game/images/item3upgrade3.png",
      item3upgrade3_bought  : "game/images/item3upgrade3_bought.png",

      item4upgrade1         : "game/images/item4upgrade1.png",
      item4upgrade1_bought  : "game/images/item4upgrade1_bought.png",
      item4upgrade2         : "game/images/item4upgrade2.png",
      item4upgrade2_bought  : "game/images/item4upgrade2_bought.png",
      item4upgrade3         : "game/images/item4upgrade3.png",
      item4upgrade3_bought  : "game/images/item4upgrade3_bought.png",

      item5upgrade1         : "game/images/item5upgrade1.png",
      item5upgrade1_bought  : "game/images/item5upgrade1_bought.png",
      item5upgrade2         : "game/images/item5upgrade2.png",
      item5upgrade2_bought  : "game/images/item5upgrade2_bought.png",
      item5upgrade3         : "game/images/item5upgrade3.png",
      item5upgrade3_bought  : "game/images/item5upgrade3_bought.png",

      item6upgrade1         : "game/images/item6upgrade1.png",
      item6upgrade1_bought  : "game/images/item6upgrade1_bought.png",
      item6upgrade2         : "game/images/item6upgrade2.png",
      item6upgrade2_bought  : "game/images/item6upgrade2_bought.png",
      item6upgrade3         : "game/images/item6upgrade3.png",
      item6upgrade3_bought  : "game/images/item6upgrade3_bought.png",




      unavalible    : "game/images/game-upgrade-lock-02.png",//"game/images/unavalible.png",

      kall          : "game/images/kall_animation.png",
      kall1         : "game/images/kall_animation-upgrade-1.png",
      kall2         : "game/images/kall_animation-upgrade-2.png",
      kall3         : "game/images/kall_animation-upgrade-3.png",

      bird1         : "game/images/bird_animation-upgrade-1.png",
      bird2         : "game/images/bird_animation-upgrade-2.png",
      bird3         : "game/images/bird_animation-upgrade-3.png",


      veidistong1   : "game/images/veidistong_animation-upgrade-1.png",
      veidistong2   : "game/images/veidistong_animation-upgrade-2.png",
      veidistong3   : "game/images/veidistong_animation-upgrade-3.png",


      mole2         : "game/images/mole_animation-upgrade-1.png",
      mole1         : "game/images/mole_animation-upgrade-2.png",
      mole3         : "game/images/mole_animation-upgrade-3.png",

      molekall      : "game/images/molekall_animation.png",
      
      moleheap      : "game/images/game-coconut-heap.png"



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
    leikur.playTheme();
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

            var isFriend = $('#isFriend')['0'].innerHTML;
            if (isFriend === 'false') {
              isFriend = false;
            } else {
              isFriend = true;
            }

      leikur = new gameEngine(g_images, g_audio, user, userData, isFriend);
      console.log('game engine done...starting game');

      console.log("HTML buttons setup [begin] " );
      console.log(userData);
      //debugger;
      console.log(leikur.displays[2].showArrow);
      //debugger;
      Buttons.init( leikur, isFriend);
      console.log("HTML buttons setup [done] " );

      document.onmousedown = function(e){

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