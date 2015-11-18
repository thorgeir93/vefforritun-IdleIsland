function gameEngine(image, audio){
	console.log('inn í gameEngine constructor');

	this.calculator = new Calculator();

	this.databaseConnector = new DBconnector();

    //this.dataBaseConnector.receiver()

    ////////////////////////////////////////////////////////
    //              THE GAME DISPlAY
    ////////////////////////////////////////////////////////

    //takki1 - tré
	var buttons = [];
    var pos = {     width: image['tree'].width/10,
                        height: image['tree'].height/10,
                        topX: 10,
                        topY: 100
               };

    buttons.push(new Button(pos, image['tree'], audio, this.punch.bind(this)))

    //takki2 - takki til að komast inn i upgrade menu
    pos = {     width: image['upgradeMenu'].width,
                        height: image['upgradeMenu'].height,
                        topX: 900,
                        topY: 10
          };

    buttons.push(new Button(pos, image['upgradeMenu'], audio, this.chanceDisplayToUpgrades.bind(this)))

    this.displays.push(new Display(image['background0'], buttons));

    ////////////////////////////////////////////////////////
    //              THE UPGRADES DISPLAY
    ////////////////////////////////////////////////////////

    buttons = [];

    pos = {     width: image['backButton'].width,
                        height: image['backButton'].height,
                        topX: 900,
                        topY: 10
          };

    buttons.push(new Button(pos, image['backButton'], audio, this.chanceDisplayToGame.bind(this)))

    this.displays.push(new Display(image['UpgradeMenu'], buttons));

    console.log(this.displays,'----------------------');

	//implementa calculator, userdata, databaseConnector og display
}

gameEngine.prototype.userData = undefined;

gameEngine.prototype.calculator = undefined;
gameEngine.prototype.dataBaseConnector = undefined;

gameEngine.prototype.displayScreen = 0;
gameEngine.prototype.displays = [];

gameEngine.prototype.isMuted = false;




gameEngine.prototype.calculate = function(time){
	//implementa hvað calculator þarf að gera
}

gameEngine.prototype.saveUserData = function(){
	//implementa 
}

gameEngine.prototype.render = function(){
    this.displays[this.displayScreen].render(ctx);
	//implementa
}

gameEngine.prototype.receiveInputs = function(e){

    this.displays[this.displayScreen].findButtonForClick(e);

	//implementa
}

gameEngine.prototype.buyUpgrade = function(index){
	//implementa
}

//láta hann taka inn factor frá´user data. þessi callback milli prótótýpa er vonlaus
gameEngine.prototype.punch = function(factor){

	console.log(this.displayScreen+540 * 209)
}

gameEngine.prototype.chanceDisplayToUpgrades = function(){

    this.displayScreen = 1;
}


gameEngine.prototype.chanceDisplayToGame = function(){
    this.displayScreen = 0;
}

gameEngine.prototype.chanceDisplayToSettings = function(){
    this.displayScreen = 2;
}


gameEngine.prototype.exit = function(){
	//implementa
}


/////////////////////////////////////////////////
// GAME LOOP SECTION




//////////////////////////////////////////////////////
// END OF GAME LOOP SECTION
//////////////////////////////////////////////////////










































/*



var gameEngine = {

    calculator: Calculator,

    databaseConnector: DBconnector,

    userData: undefined,

    displayScreen: 0,
    displays: [],

    isMuted: false,


    init: function(image,audio){

        

        var buttons = [];
        var pos = {     width: image['tree'].width/10,
                        height: image['tree'].height/10,
                        centerX: 10,
                        centerY: 100
                    };
        buttons.push(new Button(pos, image['tree'], audio, 'punch'))

        pos = {     width: image['upgradeMenu'].width,
                        height: image['upgradeMenu'].height,
                        centerX: 900,
                        centerY: 30
                    };

        buttons.push(new Button(pos, image['upgradeMenu'], audio, 'chanceDisplayToUpgrades'))

        this.displays.push(new Display(image['background0'], buttons));

        this.displays.push(new Display(image['UpgradeMenu'], []));

        console.log(this.displays);
    },







    calculate: function(time){
        //implementa hvað calculator þarf að gera
    },

    saveUserData: function(){
        //implementa 
    },

    render: function(){
        //console.log(this.displayScreen);
        this.displays[this.displayScreen].render(ctx);
        //implementa
    },

    receiveInputs: function(e){

        this.displays[this.displayScreen].findButtonForClick(e);

        //implementa
    },

    buyUpgrade: function(index){
        //implementa
    },

    punch: function(factor){
        //implementa
    },

    chanceDisplayToUpgrades: function(){

        console.log('--------------hérna--------inni---------');
        this.displayScreen = 1;
    },


    chanceDisplayToGame: function(){
        this.displayScreen = 0;
    },

    chanceDisplayToSettings: function(){
        this.displayScreen = 2;
    },


    exit: function(){
        //implementa
    }


    
}*/
