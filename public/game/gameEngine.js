function gameEngine(image, audio, user, userData, isFriend){
    isFriend = !isFriend;
	console.log('inn í gameEngine constructor');
    if (isFriend) {
        console.log('venju sesh');
    } else {
        console.log('friend sesh');
    }

    this.userName = user;
    this.userdata = new UserData(userData);
	this.calculator = new Calculator();
    this.coconutImage = image['coconut'];
    this.userdata.setCurrency(this.calculator.calculateOfflineCurrency(this.userdata.timestamp,this.userdata.getCurrency(), this.userdata.getCurrFactor()));
    this.score = this.userdata.score + this.calculator.calculateOfflineCurrency(this.userdata.timestamp,this.userdata.getCurrency(), this.userdata.getCurrFactor());
    this.displayScreen = this.lvl1;
    this.audio = audio;
    this.isFriend = isFriend;


    //this.userdata.currency = 1000000000;

    if (isFriend) {

        ////////////////////////////////////////////////////////
        //              THE UPGRADES DISPLAY 1
        ////////////////////////////////////////////////////////
        var names = ['backButton', 'item1upgrade1', 'item2upgrade1', 'item3upgrade1', 'item1upgrade2', 'item2upgrade2', 'item3upgrade2', 'item1upgrade3', 'item2upgrade3', 'item3upgrade3'];
        this.makeUpgradeDisplay(names, image, 0);

        ////////////////////////////////////////////////////////
        //              THE UPGRADES DISPLAY 2
        ////////////////////////////////////////////////////////
        names = ['backButton', 'item4upgrade1', 'item5upgrade1', 'item6upgrade1', 'item4upgrade2', 'item5upgrade2', 'item6upgrade2', 'item4upgrade3', 'item5upgrade3', 'item6upgrade3'];
        this.makeUpgradeDisplay(names, image, 1);

        ////////////////////////////////////////////////////////
        //              LEVEL 1
        ////////////////////////////////////////////////////////

    } else {
        this.displays.push([]);
        this.displays.push([]);
    } 
    //takki1 - tré
    var buttons = [];
    var pos = {     width: image['tree'].width,
                        height: image['tree'].height,
                        topX: treePos.x,
                        topY: treePos.y
               };
    if (isFriend) {
        buttons.push(new Button(pos, image['tree'], this.punch.bind(this)));
    } else {
        buttons.push(new Button(pos, image['tree'], undefined));
    }    
 
    //takki3 - exit takki
    pos = {     width: image['exit'].width,
                        height: image['exit'].height,

                        topX: 40,
                        topY: 40
          };

    buttons.push(new Button(pos, image['exit'], this.exit.bind(this)));
    
    var backgroundImages = [];

    backgroundImages.push(image['gamesandthree']);

    var upgradesForScreens = [];


    upgradesForScreens.push(this.makeItemImages(['item1upgrade1','item1upgrade2','item1upgrade3'], 500, 500, image));
    upgradesForScreens.push(this.makeItemImages(['item2upgrade1','item2upgrade2','item2upgrade3'], 300, 542, image));
    upgradesForScreens.push(this.makeItemImages(['item3upgrade1','item3upgrade2','item3upgrade3'], 178, 498, image));

    var numberOfFrames = 5;
    var frameheight = image['kall'].height;
    var framewidth = image['kall'].width / numberOfFrames;
    var topX = 360;
    var topY = 380;
    var animationTime = 0.7;
    var scale = 0.5;

    var animation = new Sprite(image['kall'],frameheight,framewidth,topX,topY,animationTime, numberOfFrames, scale);

    this.displays.push(new Display(backgroundImages, buttons,undefined,upgradesForScreens,animation));

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
    if (isFriend) {      
        buttons.push(new Button(pos, image['tree'], this.punch.bind(this)));
    } else {
        buttons.push(new Button(pos, image['tree'], undefined));
    }    
   
    backgroundImages = [];
    //backgroundImages.push(image['gamesky'])
    //backgroundImages.push(image['gameseaseven']);
    //backgroundImages.push(image['gameseasix']);

    upgradesForScreens = [];

    upgradesForScreens.push(this.makeItemImages(['item4upgrade1','item4upgrade2','item4upgrade3'], 100, 100, image));
    upgradesForScreens.push(this.makeItemImages(['item5upgrade1','item5upgrade2','item5upgrade3'], 200, 200, image));
    upgradesForScreens.push(this.makeItemImages(['item6upgrade1','item6upgrade2','item6upgrade3'], 300, 300, image));

    this.displays.push(new Display(backgroundImages, buttons, undefined, upgradesForScreens));


    console.log(this.displays);
}

gameEngine.prototype.playTheme = function(){

    if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

        if(this.audio['gameTheme'].currentTime === 0){
            this.audio['gameTheme'].volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
            this.audio['gameTheme'].play();

        }

        if(this.audio['ocean'].currentTime === 0){
            this.audio['ocean'].volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
            this.audio['ocean'].play();
        }
                

        if(this.audio['ocean'].currentTime === this.audio['ocean'].duration){
            this.audio['ocean'].currentTime = 0;
        }

        if(this.audio['gameTheme'].currentTime === this.audio['gameTheme'].duration){
            this.audio['gameTheme'].currentTime = 0;
        }
    }    
    
};


//
function decidePosition(img2, top, left, img1Pos){
    //var img1WH = getWidthHeight( img1 );
    var img2WH = getWidthHeight( img2 );
};

function getWidthHeight(img){
    return {w:img.width, h:img.height};
};




gameEngine.prototype.makeItemImages = function(names, x, y, images){
    var buttons = [];

    for(var i = 0; i < 3; i++){

        pos = {     width: images[names[i]].width,
                        height: images[names[i]].height,
                        topX: x,
                        topY: y
          };

        buttons.push(new Button(pos, images[names[i]], undefined));

    }

    return buttons;
}

gameEngine.prototype.lvl1 = 2;
gameEngine.prototype.lvl2 = 3;
gameEngine.prototype.UpgrLvl1 = 0;
gameEngine.prototype.UpgrLvl2 = 1;

gameEngine.prototype.audio = undefined;

gameEngine.prototype.userName = undefined;

gameEngine.prototype.userData = undefined;

gameEngine.prototype.calculator = undefined;
gameEngine.prototype.dataBaseConnector = undefined;

gameEngine.prototype.displayScreen = undefined;
gameEngine.prototype.displays = [];

gameEngine.prototype.isMuted = false;

gameEngine.prototype.coconutImage = undefined;

gameEngine.prototype.score = undefined;

gameEngine.prototype.makeUpgradeDisplay = function(names,image,func){

    if (this.isFriend) {
        buttons = [];

        pos = {     width: image[names[0]].width,
                            height: image[names[0]].height,
                            topX: 900,
                            topY: 10
              };

        if(func === 0){
            buttons.push(new Button(pos, image[names[0]], this.chanceDisplayToLvl1.bind(this)));
        }else{
            buttons.push(new Button(pos, image[names[0]], this.chanceDisplayToLvl2.bind(this)));

        }

        //////////////////////////////////////////
        //              PARTUR FYRIR BUY MENU
        ///////////////////////////////////////////

        buyMenu = [];

        //////////////////////////////////////////
        //              UPGRADES
        ///////////////////////////////////////////
        var upgrades = [[0,0,0],[0,0,0],[0,0,0]];

        var nameCounter = 1;
        for(var i = 0; i< 3; i++){
            for(var j = 0; j< 3; j++){
                pos = {     width: image[names[nameCounter]].width,
                            height: image[names[nameCounter]].height,
                            topX: (j*70) + 10,
                            topY: (i*70) + 10
                };

                upgrades[i][j] = new Button(pos, image[names[nameCounter]], this.buyUpgrade.bind(this))
                nameCounter++;
            }
        }

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

                    unavailabe[i][j] = new Button(pos, image['unavalible'], undefined);
                
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

                    bought[i][j] = new Button(pos, image['bought'], undefined);
                
                }
            }

       
        buyMenu.push(bought);
    }
    this.displays.push(new Display([image['UpgradeMenu']], buttons, buyMenu, undefined));
    console.log(this.displays);

}


gameEngine.prototype.update = function(time){

        var currentCurrency = this.userdata.getCurrency();
        var currency = this.calculator.calculateCurrency(time,this.userdata.getCurrency(),this.userdata.getCurrFactor());
        var gained = currency - currentCurrency;
    if (this.isFriend) {    
        this.score += gained;
    }
    if(this.displayScreen === this.lvl1){
        for(var i = 0; i < gained; i++){

            this.displays[this.displayScreen].sprite.shouldAnimate = true;

            var pos = {     width: this.coconutImage.width,
                        height: this.coconutImage.height,
                            topX: coconutPos.x,
                            topY: coconutPos.y
                   };

            var coconut = new Coconut(pos,this.coconutImage,undefined);
            this.displays[this.displayScreen].createCoconut(coconut);
        }
    }else{
        this.displays[this.displayScreen].destroyCoconuts();
    }
    
    if (this.isFriend) {
        this.userdata.setCurrency(currency);
    }
    this.displays[this.displayScreen].update(time);

};

gameEngine.prototype.render = function(){
        
    this.displays[this.displayScreen].render(this.userdata.currency, this.score);

    if(this.displayScreen === this.lvl1){
        this.displays[this.displayScreen].renderItemsOnScreen(this.userdata.upgrades1);
    }else if(this.displayScreen === this.lvl2){
        this.displays[this.displayScreen].renderItemsOnScreen(this.userdata.upgrades2);
    }

    if(this.displayScreen === this.UpgrLvl1){

        this.displays[this.displayScreen].renderUpgrades(this.userdata.upgrades1);
    }else if( this.displayScreen === this.UpgrLvl2){
        this.displays[this.displayScreen].renderUpgrades(this.userdata.upgrades2);
    } 
}

gameEngine.prototype.receiveInputs = function(e){

    

    if(this.displayScreen === this.UpgrLvl1){
        this.displays[this.displayScreen].findButtonForClick(e,this.userdata.upgrades1);

    }else if( this.displayScreen === this.UpgrLvl2){
        this.displays[this.displayScreen].findButtonForClick(e,this.userdata.upgrades2);
    }else{
        this.displays[this.displayScreen].findButtonForClick(e);
    }
	//implementa
}

gameEngine.prototype.buyUpgrade = function(index){  
    if (this.isFriend) {

        if(this.displayScreen === this.UpgrLvl1){

            if(this.userdata.currency >= this.calculator.prices1[index[0]][index[1]]){

                if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

                    this.audio['purchase'].volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
                    this.audio['purchase'].cloneNode().play();
                }

                if(index[0] === 0 && index[1] === 2){
                    
                    this.displays[this.lvl2].showArrow = true;
                    this.displays[this.lvl1].showArrow = true;

                }
                this.userdata.upgrades1[index[0]][index[1]] = 2;

                if(index[0] === 0){
                    if(index[1] !== 2){
                        this.userdata.upgrades1[index[0]][index[1]+1] = 1;
                        this.userdata.upgrades1[index[0]+1][index[1]+1] = 0;
                    }
                }

                if(index[0] !== 2){
                    this.userdata.upgrades1[index[0]+1][index[1]] = 1;
                }
                if(index[0] < 1){
                    this.userdata.upgrades1[index[0]+2][index[1]] = 0;
                }
                if(index[1]< 1 && index[0] === 0 ){
                    this.userdata.upgrades1[index[0]][index[1]+2] = 0;
                }

                this.userdata.currency -= this.calculator.prices1[index[0]][index[1]];
            
                this.userdata.setCurrFactor(this.calculator.createFactor(this.userdata.getUpgrades1(),this.userdata.getUpgrades2()));
                this.userdata.setTreeFactor(this.calculator.calculateTreeFactor(this.userdata.getUpgrades1(),this.userdata.getUpgrades2()));
            }
            else if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

                this.audio['noMoney'].volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
                this.audio['noMoney'].cloneNode().play();
            }

        

        }else if( this.displayScreen === this.UpgrLvl2){

            if(this.userdata.currency >= this.calculator.prices2[index[0]][index[1]]){

                if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

                    this.audio['purchase'].volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
                    this.audio['purchase'].cloneNode().play();
                }

                if(index[0] === 0 && index[1] === 2){
                    
                    this.displays[this.lvl2].showArrow = true;
                    this.displays[this.lvl1].showArrow = true;

                }

                this.userdata.upgrades2[index[0]][index[1]] = 2;

                if(index[0] === 0){
                    if(index[1] !== 2){
                        this.userdata.upgrades2[index[0]][index[1]+1] = 1;
                        this.userdata.upgrades2[index[0]+1][index[1]+1] = 0;
                    }
                }

                if(index[0] !== 2){
                    this.userdata.upgrades2[index[0]+1][index[1]] = 1;
                }
                if(index[0] < 1){
                    this.userdata.upgrades2[index[0]+2][index[1]] = 0;
                }
                if(index[1]< 1 && index[0] === 0 ){
                    this.userdata.upgrades2[index[0]][index[1]+2] = 0;
                }

                this.userdata.currency -= this.calculator.prices2[index[0]][index[1]];
            
                this.userdata.setCurrFactor(this.calculator.createFactor(this.userdata.getUpgrades1(),this.userdata.getUpgrades2()));
                this.userdata.setTreeFactor(this.calculator.calculateTreeFactor(this.userdata.getUpgrades1(),this.userdata.getUpgrades2()));

            }else if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

                this.audio['noMoney'].volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
                this.audio['noMoney'].cloneNode().play();
            }
        

            
        }
    }
	//implementa
}

//láta hann taka inn factor frá´user data. þessi callback milli prótótýpa er vonlaus
gameEngine.prototype.punch = function(){

    if (this.isFriend) {
        console.log('inn í punch');
    	this.userdata.currency += 1 * this.userdata.treeFactor;

        this.score += 1 * this.userdata.treeFactor;

        if(this.displayScreen === this.lvl1){

            var pos = {     width: this.coconutImage.width,
                            height: this.coconutImage.height,
                                topX: coconutPos.x,
                                topY: coconutPos.y
                       };

            var coconut = new Coconut(pos,this.coconutImage,undefined)
            this.displays[this.displayScreen].createCoconut(coconut);
        }

        this.displays[this.displayScreen].sprite.shouldAnimate = true;

        if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

            this.audio['punch'].volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
            this.audio['punch'].cloneNode().play();
        }
    }
}

gameEngine.prototype.chanceDisplayToLvl2 = function(){
    this.displayScreen = this.lvl2;
    this.displays[this.lvl1].coconuts = [];

    if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

        this.audio['changeDisp'].volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
        this.audio['changeDisp'].cloneNode().play();
    }
}

gameEngine.prototype.chanceDisplayToLvl1 = function(){
    this.displayScreen = this.lvl1;

    if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

        this.audio['changeDisp'].volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
        this.audio['changeDisp'].cloneNode().play();
    }
}

gameEngine.prototype.chanceDisplayToUpgradeslvl1 = function(){
    if (this.isFriend) {
        this.displayScreen = this.UpgrLvl1;
        this.displays[this.lvl1].coconuts = [];

        if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

            this.audio['changeDisp'].volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
            this.audio['changeDisp'].cloneNode().play();
        }        
    }
}

gameEngine.prototype.chanceDisplayToUpgradeslvl2 = function(){

    if (this.isFriend) {
        this.displayScreen = this.UpgrLvl2;
        this.displays[this.lvl1].coconuts = [];

        if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

            this.audio['changeDisp'].volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
            this.audio['changeDisp'].cloneNode().play();
        }
    }
}



gameEngine.prototype.chanceDisplayToSettings = function(){
    if (this.isFriend) {    

        this.displayScreen = 4;

        this.displays[0].coconuts = [];

        if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

            this.audio['changeDisp'].volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
            this.audio['changeDisp'].cloneNode().play();
        }
    }
}


gameEngine.prototype.exit = function(){

    if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

        this.audio['exit'].volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
        this.audio['exit'].cloneNode().play();
    }

	console.log('inn í exit');
    var exit  = $('#exit');
    var field = exit[0][0];
    var scoreField = exit[0][1];
    this.userdata.score = this.score;
    field.value = this.userdata.createJSONstring();
    scoreField.value = this.score;
    exit.submit();
    console.log(exit);
}