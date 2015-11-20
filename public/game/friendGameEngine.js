function friendGameEngine(image, audio, user, userData){
	console.log('inn í friendGameEngine constructor');

    this.userName = user;
    this.userdata = new UserData(userData);
	//this.calculator = new Calculator();
    this.coconutImage = image['coconut'];
    //this.userdata.setCurrency(this.calculator.calculateOfflineCurrency(this.userdata.timestamp,this.userdata.getCurrency(), this.userdata.getCurrFactor()));
    //this.score = this.userdata.score + this.calculator.calculateOfflineCurrency(this.userdata.timestamp,this.userdata.getCurrency(), this.userdata.getCurrFactor());
    this.displayScreen = this.lvl1;

    /*////////////////////////////////////////////////////////
    //              THE UPGRADES DISPLAY 1
    ////////////////////////////////////////////////////////
    var names = ['backButton', 'item1upgrade1', 'item2upgrade1', 'item3upgrade1', 'item1upgrade2', 'item2upgrade2', 'item3upgrade2', 'item1upgrade3', 'item2upgrade3', 'item3upgrade3']
    this.makeUpgradefriendDisplay(names, image, audio, this.chancefriendDisplayToUpgradeslvl1.bind(this))

    ////////////////////////////////////////////////////////
    //              THE UPGRADES DISPLAY 2
    ////////////////////////////////////////////////////////
    names = ['backButton', 'item4upgrade1', 'item5upgrade1', 'item6upgrade1', 'item4upgrade2', 'item5upgrade2', 'item6upgrade2', 'item4upgrade3', 'item5upgrade3', 'item6upgrade3']
    this.makeUpgradefriendDisplay(names, image, audio, this.chancefriendDisplayToUpgradeslvl2.bind(this))
*/
    ////////////////////////////////////////////////////////
    //              LEVEL 1
    ////////////////////////////////////////////////////////
    
    //takki1 - tré


    var buttons = [];
    var pos = {     width: image['tree'].width,
                        height: image['tree'].height,
                        topX: 400,
                        topY: 50
               };
    buttons.push(new Button(pos, image['tree'], audio, undefined));

    //takki2 - takki til að komast inn i upgrade menu
   /* pos = {     width: image['upgradeMenu'].width,
                        height: image['upgradeMenu'].height,
                        topX: 900,
                        topY: 10
          };
    */
    //buttons.push(new Button(pos, image['upgradeMenu'], audio, undefined))

    //takki3 - exit takki
   /* pos = {     width: image['exit'].width,
                        height: image['exit'].height,
                        topX: 900,
                        topY: 60
          };
*/
    //buttons.push(new Button(pos, image['exit'], audio, undefined))

    //takki3 - downLvl
    pos = {     width: image['downLvl'].width,
                        height: image['downLvl'].height,
                        topX: 500,
                        topY: 500
          };

    buttons.push(new Button(pos, image['downLvl'], audio, this.chanceDisplayToLvl2.bind(this)));

    var backgroundImages = [];
    backgroundImages.push(image['gamesky']);
    backgroundImages.push(image['gameseaseven']);
    backgroundImages.push(image['gameseasix']);
    backgroundImages.push(image['gameseafive']);
    backgroundImages.push(image['gameseafour']);
    backgroundImages.push(image['gamesandthree']);
    backgroundImages.push(image['gameseatwo']);
    backgroundImages.push(image['gameseaone']);

    this.displays.push(new friendDisplay(backgroundImages, buttons, undefined));

    /////////////////////////////////////////////////
    //                  LEVEL TWO
    ////////////////////////////////////////////////

    //takki1 - tré
    var buttons = [];
    var pos = {     width: image['tree'].width,
                        height: image['tree'].height,
                        topX: 400,
                        topY: 50
               };

    buttons.push(new Button(pos, image['tree'], audio, undefined))

    //takki2 - takki til að komast inn i upgrade menu
    /*pos = {     width: image['upgradeMenu'].width,
                        height: image['upgradeMenu'].height,
                        topX: 900,
                        topY: 10
          };
    */
   // buttons.push(new Button(pos, image['upgradeMenu'], audio, this.chancefriendDisplayToUpgradeslvl2.bind(this)))

    //takki3 - exit takki
    /*pos = {     width: image['upLvl'].width,
                        height: image['upLvl'].height,
                        topX: 500,
                        topY: 0
          };
    */
    buttons.push(new Button(pos, image['upLvl'], audio, this.chanceDisplayToLvl1.bind(this)));

    backgroundImages = [];
    backgroundImages.push(image['gamesky'])
    backgroundImages.push(image['gameseaseven'])
    backgroundImages.push(image['gameseasix'])

    this.displays.push(new friendDisplay(backgroundImages, buttons, undefined));
}

friendGameEngine.prototype.lvl1 = 0;
friendGameEngine.prototype.lvl2 = 1;
//friendGameEngine.prototype.UpgrLvl1 = 0;
//friendGameEngine.prototype.UpgrLvl2 = 1;

friendGameEngine.prototype.userName = undefined;

friendGameEngine.prototype.userData = undefined;

//friendGameEngine.prototype.calculator = undefined;
friendGameEngine.prototype.dataBaseConnector = undefined;

friendGameEngine.prototype.displayScreen = undefined;
friendGameEngine.prototype.displays = [];

friendGameEngine.prototype.isMuted = false;

friendGameEngine.prototype.coconutImage = undefined;

//friendGameEngine.prototype.score = undefined;

/*friendGameEngine.prototype.makeUpgradefriendDisplay = function(names,image, audio, func){

    buttons = [];

    pos = {     width: image[names[0]].width,
                        height: image[names[0]].height,
                        topX: 900,
                        topY: 10
          };
    buttons.push(new Button(pos, image[names[0]], audio, func))

    //////////////////////////////////////////
    //              PARTUR FYRIR BUY MENU
    ///////////////////////////////////////////

    buyMenu = []

    //////////////////////////////////////////
    //              UPGRADES
    ///////////////////////////////////////////
    var upgrades = [[0,0,0],[0,0,0],[0,0,0]];

    var nameCounter = 1
    for(var i = 0; i< 3; i++){
        for(var i = 0; i< 3; i++){
            console.log([names[nameCounter]])
            pos = {     width: image[names[nameCounter]].width,
                        height: image[names[nameCounter]].height,
                        topX: (j*70) + 10,
                        topY: (i*70) + 10
            };


            upgrades[i][j] = new Button(pos, image[names[nameCounter]], audio, this.buyUpgrade.bind(this))
            nameCounter++;
        }
    }

    buyMenu.push(upgrades);

    //////////////////////////////////////////
    //              unavailable
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

    this.displays.push(new friendDisplay([image['UpgradeMenu']], buttons, buyMenu));
}

*/
friendGameEngine.prototype.update = function(time){
   /* var currentCurrency = this.userdata.getCurrency();
    var currency = this.calculator.calculateCurrency(time,this.userdata.getCurrency(),this.userdata.getCurrFactor())
    var gained = currency - currentCurrency;
    this.score += gained;
    
    if(this.displayScreen === this.lvl1){

        for(var i = 0; i < gained; i++){

            var pos = {     width: this.coconutImage.width,
                        height: this.coconutImage.height,
                            topX: 400,
                            topY: 50
                   };

            var coconut = new Coconut(pos,this.coconutImage,undefined)
            this.displays[this.displayScreen].createCoconut(coconut);
        }
    }
    
	this.userdata.setCurrency(currency);*/
    //this.displays[this.displayScreen].update(time);
}

/*friendGameEngine.prototype.saveUserData = function(){
	//implementa 
}*/

friendGameEngine.prototype.render = function(){

    this.displays[this.displayScreen].render(undefined, undefined);
    /*if(this.displayScreen === this.UpgrLvl1 || this.displayScreen === this.UpgrLvl2){

        this.displays[this.displayScreen].renderUpgrades(this.userdata.upgrades);
    }*/
}

friendGameEngine.prototype.receiveInputs = function(e){

    this.displays[this.displayScreen].findButtonForClick(e);

	//implementa
}

/*friendGameEngine.prototype.buyUpgrade = function(index){  
    
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
friendGameEngine.prototype.punch = function(){

	this.userdata.currency += 1 * this.userdata.treeFactor;

    this.score += 1 * this.userdata.treeFactor;

    if(this.displayScreen === this.lvl1){

        var pos = {     width: this.coconutImage.width,
                        height: this.coconutImage.height,
                            topX: 400,
                            topY: 50
                   };

        var coconut = new Coconut(pos,this.coconutImage,undefined)
        this.displays[this.displayScreen].createCoconut(coconut);
    }
}*/

friendGameEngine.prototype.chanceDisplayToLvl2 = function(){
    this.displayScreen = this.lvl2;
}

friendGameEngine.prototype.chanceDisplayToLvl1 = function(){
    this.displayScreen = this.lvl1;
}

/*friendGameEngine.prototype.chancefriendDisplayToUpgradeslvl1 = function(){

    this.displayScreen = this.UpgrLvl1;;
    this.displays[1].coconuts = [];
}*/

/*friendGameEngine.prototype.chancefriendDisplayToUpgradeslvl2 = function(){

    this.displayScreen = this.UpgrLvl2;
    this.displays[1].coconuts = [];
}*/



/*friendGameEngine.prototype.chancefriendDisplayToSettings = function(){
    this.displayScreen = 4;

    this.displays[0].coconuts = [];
}*/


/*friendGameEngine.prototype.exit = function(){
	console.log('inn í exit');
    //var exit  = $('#exit');
    var field = exit[0][0];
    var scoreField = exit[0][1];
    //this.userdata.score = this.score;
    //field.value = this.userdata.createJSONstring();
    //scoreField.value = this.score;
    exit.submit();
    console.log(exit);
}*/