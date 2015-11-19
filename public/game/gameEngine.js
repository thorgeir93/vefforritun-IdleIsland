function gameEngine(image, audio, user, userData){
	console.log('inn í gameEngine constructor');

    this.userName = user;
    this.userdata = new UserData(userData);
	this.calculator = new Calculator('hi');
    this.userdata.setCurrency(1000);
    this.coconutImage = image['coconut'];


	/*this.dataBaseConnector = new DBconnector();

    this.dataBaseConnector.receiver(this.userName, function(){
        console.log('success!!');
    });*/

    ////////////////////////////////////////////////////////
    //              THE GAME DISPlAY
    ////////////////////////////////////////////////////////

    //takki1 - tré
	var buttons = [];
    var pos = {     width: image['tree'].width,
                        height: image['tree'].height,
                        topX: 400,
                        topY: 50
               };

    buttons.push(new Button(pos, image['tree'], audio, this.punch.bind(this)))

    //takki2 - takki til að komast inn i upgrade menu
    pos = {     width: image['upgradeMenu'].width,
                        height: image['upgradeMenu'].height,
                        topX: 900,
                        topY: 10
          };

    buttons.push(new Button(pos, image['upgradeMenu'], audio, this.chanceDisplayToUpgrades.bind(this)))


    this.displays.push(new Display(image['background0'], buttons,undefined));

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

    //////////////////////////////////////////
    //              PARTUR FYRIR BUY MENU
    ///////////////////////////////////////////

    buyMenu = []

    //////////////////////////////////////////
    //              UPGRADES
    ///////////////////////////////////////////
    var upgrades = [[0,0,0],[0,0,0],[0,0,0]];

    var one = 10;
    var two = 80; 
    var three = 150;

    pos = {     width: image['upgrade1'].width,
                        height: image['upgrade1'].height,
                        topX: one,
                        topY: one
          };

    upgrades[0][0] = new Button(pos, image['upgrade1'], audio, this.buyUpgrade.bind(this))

    pos = {     width: image['upgrade2'].width,
                        height: image['upgrade2'].height,
                        topX: two,
                        topY: one
          };

    upgrades[0][1] = new Button(pos, image['upgrade2'], audio, this.buyUpgrade.bind(this))

    pos = {     width: image['upgrade3'].width,
                        height: image['upgrade3'].height,
                        topX: three,
                        topY: one
          };

    upgrades[0][2] = new Button(pos, image['upgrade3'], audio, this.buyUpgrade.bind(this))

    pos = {     width: image['upgrade1'].width,
                        height: image['upgrade1'].height,
                        topX: one,
                        topY: two
          };

    upgrades[1][0] = new Button(pos, image['upgrade1'], audio, this.buyUpgrade.bind(this))

    pos = {     width: image['upgrade1'].width,
                        height: image['upgrade1'].height,
                        topX: two,
                        topY: two
          };

    upgrades[1][1] = new Button(pos, image['upgrade2'], audio, this.buyUpgrade.bind(this))

    pos = {     width: image['upgrade1'].width,
                        height: image['upgrade1'].height,
                        topX: three,
                        topY: two
          };

    upgrades[1][2] = new Button(pos, image['upgrade3'], audio, this.buyUpgrade.bind(this))

    pos = {     width: image['upgrade1'].width,
                        height: image['upgrade1'].height,
                        topX: one,
                        topY: three
          };

    upgrades[2][0] = new Button(pos, image['upgrade1'], audio, this.buyUpgrade.bind(this))

    pos = {     width: image['upgrade1'].width,
                        height: image['upgrade1'].height,
                        topX: two,
                        topY: three
          };

    upgrades[2][1] = new Button(pos, image['upgrade2'], audio, this.buyUpgrade.bind(this))

    pos = {     width: image['upgrade3'].width,
                        height: image['upgrade3'].height,
                        topX: three,
                        topY: three
          };

    upgrades[2][2] = new Button(pos, image['upgrade3'], audio, this.buyUpgrade.bind(this))

    buyMenu.push(upgrades);

    //////////////////////////////////////////
    //              unavalible
    ///////////////////////////////////////////

    var unavailabe = [[0,0,0],[0,0,0],[0,0,0]];

    for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){ 
                pos = {     width: image['unavalible'].width,
                        height: image['unavalible'].height,
                        topX: (j*70) + 10,
                        topY: (i*70) + 10
                 };

                unavailabe[i][j] = new Button(pos, image['unavalible'], audio, undefined)
            
            }
        }

    
    buyMenu.push(unavailabe);

    //////////////////////////////////////////
    //              bought
    ///////////////////////////////////////////

    var bought = [[0,0,0],[0,0,0],[0,0,0]];

    for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){ 
                pos = {     width: image['bought'].width,
                        height: image['bought'].height,
                        topX: (j*70) + 10,
                        topY: (i*70) + 10
                 };

                bought[i][j] = new Button(pos, image['bought'], audio, undefined)
            
            }
        }

   
    buyMenu.push(bought);

    this.displays.push(new Display(image['UpgradeMenu'], buttons, buyMenu));

    console.log(this.displays,'----------------------',this.userdata);

	//implementa calculator, userdata, databaseConnector og display
}

gameEngine.prototype.userName = undefined;

gameEngine.prototype.userData = undefined;

gameEngine.prototype.calculator = undefined;
gameEngine.prototype.dataBaseConnector = undefined;

gameEngine.prototype.displayScreen = 0;
gameEngine.prototype.displays = [];

gameEngine.prototype.isMuted = false;

gameEngine.prototype.coconutImage = undefined;




gameEngine.prototype.calculate = function(time){

	this.userdata.setCurrency(this.calculator.calculateCurrency(time,this.userdata.getCurrency(),this.userdata.getCurrFactor()));
}

gameEngine.prototype.saveUserData = function(){
	//implementa 
}

gameEngine.prototype.render = function(){

    this.displays[this.displayScreen].render(this.userdata.currency);
    if(this.displayScreen === 1){

        this.displays[this.displayScreen].renderUpgrades(this.userdata.upgrades);
    }
}

gameEngine.prototype.receiveInputs = function(e){

    this.displays[this.displayScreen].findButtonForClick(e,this.userdata.upgrades);

	//implementa
}

gameEngine.prototype.buyUpgrade = function(index){  
    console.log(index);

    
    console.log('')
    if(this.userdata.currency >= this.calculator.prices[index[0]][index[1]]){

        this.userdata.upgrades[index[0]][index[1]] = 2;

        if(index[0] === 0){
            if(index[1] !== 2){
                this.userdata.upgrades[index[0]][index[1]+1] = 1;
            }
        }

        if(index[0] !== 2){
            this.userdata.upgrades[index[0]+1][index[1]] = 1;
        }
        if(index[0] < 1){
            this.userdata.upgrades[index[0]+2][index[1]] = 0;
        }

        this.userdata.currency -= this.calculator.prices[index[0]][index[1]];
    }

    
    this.userdata.setCurrFactor(this.calculator.createFactor(this.userdata.getUpgrades()));
    this.userdata.setTreeFactor(this.calculator.calculateTreeFactor(this.userdata.getUpgrades()))

	//implementa
}

//láta hann taka inn factor frá´user data. þessi callback milli prótótýpa er vonlaus
gameEngine.prototype.punch = function(){

	this.userdata.currency += 1 * this.userdata.treeFactor;


    //var coconut = new Coconut()
    //this.displays[this.displayScreen].createCoconut();
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
