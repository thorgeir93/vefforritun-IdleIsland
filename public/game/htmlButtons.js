/*settings.js*/
//document.addEventListener('DOMContentLoaded',function() {
//	console.log('DOM loaded');
//	Buttons.init();
//});

var Buttons = (function() {
	
	var theGame;

	var level;

	var lvlFunc = {};

	//keeps track of elements that is visible
	var visibleElements = [];

	//ELEMENTS
	var buttons = {};
	var backgrounds = {};

	//BUTTONS
	var allBtnElements;
	var circleBtnElements;
	var arrowsBtnElements;
	var formBtnElement;

	//BACKGROUNDS
	var allBackgroundElements;
	var upgradeElement;
	var skyElement;
	var seaElement;

	function init( game, isFriend  ){
		console.log( "button init!" );

		theGame = game;

		level = theGame.displayScreen;



		//GET BASE ELEMENTS TO ADD NEW ELEMENTS TO
		allBackgroundElements = document.querySelector('.backgrounds');
		circleBtnElements = document.querySelector('.circle-buttons');
		arrowsBtnElements = document.querySelector('.arrows-buttons');
		formBtnElement = document.querySelector('.sett');//.children[1];
		allBtnElements = document.querySelector('.buttons');

		//BUILD ALL NEW ELEMENTS
		buildBackgrounds();
		buildButtons();

		//BIND ALL NEW ELEMENT TO BASE ELEMTNS
		allBackgroundElements.appendChild( backgrounds.sea );
		allBackgroundElements.appendChild( backgrounds.sky );
		allBackgroundElements.appendChild( backgrounds.upgrade );
		//allBackgroundElements.appendChild( backgrounds.settings );

		allBtnElements.appendChild( buttons.quit );
		allBtnElements.appendChild( buttons.gameExit );
		
		if(!isFriend){
			circleBtnElements.appendChild( buttons.upgrade );
			formBtnElement.appendChild( buttons.settings );
		}

		arrowsBtnElements.appendChild( buttons.levelDown );
		arrowsBtnElements.appendChild( buttons.levelUp );
		

		//
		//	INITIALIZE LEVELS
		//
		lvlFunc[2] = { 
			action:function(){
				//TODO:change background HTML (change classList)
				theGame.chanceDisplayToLvl1();
			},
			backgrounds:[backgrounds.sea, backgrounds.sky]
		};
		
		lvlFunc[3] = { 
			action:function(){
				//TODO:change background HTML (change classList)		
				theGame.chanceDisplayToLvl2();
			},
			backgrounds:[backgrounds.mineFloor, backgrounds.mineWall]
			//buttons:[buttons.upgrade ]
		};
		

		lvlFunc.upgrade2={
			action:function(){
				theGame.chanceDisplayToUpgradeslvl1();
			},
			backgrounds:['upgrade']
		};

	/*	lvlFunc.settings={
			action:function(){
				theGame.chanceDisplayToSettings();
			}
		};*/

		lvlFunc.gameExit={
			action:function(){
				theGame.exit();
			}
		};


	}

	function buildBackgrounds(){
		backgrounds.sea = elementCreator('div','sea','sea');
		backgrounds.sky = elementCreator('div','sky','sky');
		
		backgrounds.mineFloor = elementCreator('div','mine-floor','mine-floor hidden');
		backgrounds.mineWall = elementCreator('div','mine-wall','mine-wall hidden');
		
		backgrounds.upgrade = elementCreator('div','upgrade','upgrade');
		backgrounds.settings = elementCreator('div','settings','settings');
	}

	function buildButtons(){
		buttons.upgrade = elementCreator('button','upgrade','upgrade');
		buttons.settings = elementCreator('button','gamebtn-settings','gamebtn-settings');
		buttons.quit = elementCreator('button','quit','quit hidden');
		buttons.gameExit = elementCreator('button','game-exit','game-exit');
		
		buttons.levelDown= elementCreator('button','level-down','level-down', '&#9660');
		buttons.levelUp= elementCreator('button','level-up','level-up hidden', '&#9650');

		buttons.upgrade.addEventListener('click', displayUpgrades);
		//buttons.settings.addEventListener('click', displaySettings);
		buttons.levelDown.addEventListener('click', displayLevelDown);
		buttons.levelUp.addEventListener('click', displayLevelUp);
		buttons.gameExit.addEventListener('click', exitGame);

		buttons.quit.addEventListener('click', handleQuit);
	}


	function exitGame(){
		lvlFunc.gameExit.action();
	}

	function handleQuit(){
		//TODO: shit fix
		var backgroundElement;
		var classList;
		if( backgrounds.upgrade.classList.contains( 'upgrade-show') ){
			backgroundElement = backgrounds.upgrade;
			classList = ['upgrade-show', 'upgrade'];
		} else {
			backgroundElement = backgrounds.settings;
			classList = ['settings-show', 'settings'];
		}
		toggleBackgrounds( backgroundElement, classList );
		removeVisibleElements();
		lvlFunc[level].action();
	}

	function toggleBackgrounds( backgroundElement, classList ){
		console.log(classList[0]);
		backgroundElement.classList.toggle( classList[0] );
		backgroundElement.classList.toggle( classList[1] );

		if( backgroundElement.classList.contains(classList[0]) ){
			doActionOnElements( true, circleBtnElements );
			doActionOnElements( true, arrowsBtnElements, ['level-up']);
			addHiddenToQuit( true );
		} else {
			doActionOnElements( false, circleBtnElements );
			doActionOnElements( false, arrowsBtnElements, ['level-up']);
			addHiddenToQuit( false );
		}
	}

	//TODO: held að það þarf að setja fyrir 
	//backgrounds.upgrade auka breytu sem eru toggle clasar
	//þá fyrir allabackground visible þá togglum við fade in
	//fade out classana inn.
	/*function toggleBackgrounds( button ){
		
		if(button==='upgrade'){
			backgrounds.upgrade.classList.toggle('upgrade-show');
			backgrounds.upgrade.classList.toggle('upgrade');

			if( backgrounds.upgrade.classList.contains('upgrade-show') ){
				doActionOnElements( true, circleBtnElements );
				doActionOnElements( true, arrowsBtnElements, ['level-up']);
				addHiddenToQuit( true );
			} else {
				doActionOnElements( false, circleBtnElements );
				doActionOnElements( false, arrowsBtnElements, ['level-up']);
				addHiddenToQuit( false );
			}
			
		}
	}*/

	function doActionOnElements(hidden, elements, exceptList){
		var action = (hidden) ? addHidden : removeHidden;
		for( var i in elements.children ){
			var el = elements.children[i];
			if( el.classList ){
				if( !contains(el.classList, exceptList) ){
					action( el );
				}
			}
		}
	}

	function contains(classList, exceptList){
		for(var i in exceptList){
			if( classList.contains( exceptList[i]) ){
				return true;
			}
		}
		return false;
	}

	function addHiddenToQuit( hidden ){
		var action = (hidden) ? addHidden : removeHidden;
		action( allBtnElements.children[3] );
	}

	//TODO:Það er skítafix að vera með þessa if
	//skilyrði, ef hún er fjarlægtð þá mun levelUp
	//takkin hverfa þegar farið er í upgrade og aftur
	//tilbaka
	function removeVisibleElements(){
		while( visibleElements.length !== 0 ){
			var element = visibleElements.pop();
			if(element !== buttons.levelUp ){
				addHidden( element );
			}
		}
	}

	//
	// DISPLAYS
	//
	function displayUpgrades(){

		toggleBackgrounds(backgrounds.upgrade,['upgrade-show','upgrade']);

		//SHOW this elements
		removeHidden( buttons.quit );
		addToVisible( buttons.quit );
		removeHidden( backgrounds.upgrade );
		//addToVisible( backgrounds.upgrade );

		var name = 'upgrade'+level;
		if(lvlFunc[name]){
			lvlFunc [name].action();
		}
	}

	/*function displaySettings(){
		toggleBackgrounds(backgrounds.settings, ['settings-show', 'settings'])
		
		//SHOW this elements
		removeHidden( buttons.quit );
		addToVisible( buttons.quit );
		removeHidden( backgrounds.upgrade );
		//addToVisible( backgrounds.upgrade );

		var name = 'settings';
		if(lvlFunc[name]){
			lvlFunc [name].action();
		}
	}*/

	//TODO: stop error -> do not let level to zero or far higher
	function displayLevelDown(){
		console.log("GO DOWN: level " + (level+1));
		level += 1;
		if( lvlFunc[level] ){
			lvlFunc[level].action();
			removeHidden(buttons.levelUp);
			addToVisible(buttons.levelUp);
			changeBackground(level, true);

		} else {
			level -= 1;
		}
	}


	function displayLevelUp(){
		console.log("GO UP: level " + (level-1));
		level -= 1;
		if(level===2){
			addHidden( buttons.levelUp );
			removeFromVisible( buttons.levelUp );
			lvlFunc[level].action();
			changeBackground(level, false);
		}
	}

	function changeBackground( newLevel, down){
		var levelBefore;
		if( down ){
			levelBefore = newLevel-1;
		} else {
			levelBefore = newLevel+1;
		}

		for(var i in lvlFunc[newLevel].backgrounds){
			removeHidden( lvlFunc[newLevel].backgrounds[i] );
			//addToVisible( lvlFunc[newLevel].backgrounds[i] );
		}
		for(var i in lvlFunc[levelBefore].backgrounds){
			addHidden( lvlFunc[levelBefore].backgrounds[i] );
			//removeFromVisible( lvlFunc[levelBefore].backgrounds[i] );
		}
	}

	function addToVisible(element){
		visibleElements.push( element );
	}

	function removeFromVisible(element){
		for(var i in visibleElements){
			if( element === visibleElements[i] ){
				visibleElements.splice(i,1);
			}
			
		}
	}

	function addHidden( element ){
		console.log("Going to add hidden to element!");
		if( element.classList.contains('hidden') ){
			console.log("This element has aldready hidden class!");
		} else {
			console.log("Hidden class added to element");
			element.classList.add('hidden');
		}
	}

	function removeHidden( element ){
		console.log("Going to remove hidden to element!");
		if( element.classList.contains('hidden') ){
			console.log("Hidden class added to element");
			console.log(element);
			element.classList.remove('hidden');
			//addToVisible(element);
		} else {
			console.log("This element has aldready none hidden class!");
		}
	}


	//if element id exist -> delete
	//if there is no id active -> clear inputs
	function removeElementByID( id ){
		var element = document.getElementById( id );
		if( element ){
			element.remove();
		} else {
			alert("There was no entry choosen :(");
		}
	}

	
	//returns a button elements with 
	//default class list and specific id
	function elementCreator( type, id, className, value ){
		//Create element with it's class attribute, id and type
		var button = addElement(type, className, id);
		if(value){
			button.innerHTML = value;
		}
		return button;
	}

	//
	//returns an element with class attribute -> classes
	//element of type -> type
	//element id -> idName
	function addElement(type, className, idName){
		var elem = document.createElement(type);
		if( className ){
			elem.className = className;
		}
		if( idName ){
			elem.setAttribute("id", idName);
		}
		return elem;
	}

	return {
		init: init
	};
})();