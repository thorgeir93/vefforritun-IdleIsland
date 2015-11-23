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

	//BACKGROUNDS
	var allBackgroundElements;
	var upgradeElement;
	var skyElement;
	var seaElement;

	function init( game ){
		console.log( "button init!" );

		theGame = game;

		level = theGame.displayScreen;


		//
		//	INITIALIZE LEVELS
		//
		lvlFunc[2] = { 
			action:function(){
				//TODO:change background HTML (change classList)
				theGame.chanceDisplayToLvl1();
			}
		};
		
		lvlFunc[3] = { 
			action:function(){
				//TODO:change background HTML (change classList)		
				theGame.chanceDisplayToLvl2();
			}
		};
		

		lvlFunc.upgrade2={
			action:function(){
				theGame.chanceDisplayToUpgradeslvl1();
			}
		};

		lvlFunc.settings={
			action:function(){
				theGame.chanceDisplayToSettings();
			}
		};

		//GET BASE ELEMENTS TO ADD NEW ELEMENTS TO
		allBackgroundElements = document.querySelector('.backgrounds');
		circleBtnElements = document.querySelector('.circle-buttons');
		arrowsBtnElements = document.querySelector('.arrows-buttons');
		allBtnElements = document.querySelector('.buttons');

		//BUILD ALL NEW ELEMENTS
		buildBackgrounds();
		buildButtons();

		//BIND ALL NEW ELEMENT TO BASE ELEMTNS
		allBackgroundElements.appendChild( backgrounds.sea );
		allBackgroundElements.appendChild( backgrounds.sky );
		allBackgroundElements.appendChild( backgrounds.upgrade );

		allBtnElements.appendChild( buttons.quit );

		circleBtnElements.appendChild( buttons.upgrade );
		circleBtnElements.appendChild( buttons.settings );

		arrowsBtnElements.appendChild( buttons.levelDown );
		arrowsBtnElements.appendChild( buttons.levelUp );
	}

	function buildBackgrounds(){
		backgrounds.sky = elementCreator('div','sky','sky');
		backgrounds.sea = elementCreator('div','sea','sea');
		backgrounds.upgrade = elementCreator('div','upgrade','upgrade');
	}

	function buildButtons(){
		buttons.upgrade = elementCreator('button','upgrade','upgrade');
		buttons.settings = elementCreator('button','settings','settings');
		buttons.quit = elementCreator('button','quit','quit hidden');
		
		buttons.levelDown= elementCreator('button','level-down','level-down', '&#9660');
		buttons.levelUp= elementCreator('button','level-up','level-up hidden', '&#9650');

		buttons.upgrade.addEventListener('click', displayUpgrades);
		//buttons.settings.addEventListener('click', displayUpgrades);
		buttons.levelDown.addEventListener('click', displayLevelDown);
		buttons.levelUp.addEventListener('click', displayLevelUp);

		buttons.quit.addEventListener('click', handleQuit);
	}


	function handleQuit(){
		toggleBackgrounds();
		removeVisibleElements();
		lvlFunc[level].action();
	}

	//TODO: held að það þarf að setja fyrir 
	//backgrounds.upgrade auka breytu sem eru toggle clasar
	//þá fyrir allabackground visible þá togglum við fade in
	//fade out classana inn.
	function toggleBackgrounds(){
		//for(var element in visibleElements ){
			backgrounds.upgrade.classList.toggle('upgrade-show');
			backgrounds.upgrade.classList.toggle('upgrade');
			
		//}
	}

	function removeVisibleElements(){
		while( visibleElements.length !== 0 ){
			addHidden( visibleElements.pop() );
		}
	}

	//
	// DISPLAYS
	//
	function displayUpgrades(){

		toggleBackgrounds();

		//SHOW this elements
		removeHidden( buttons.quit );
		removeHidden( backgrounds.upgrade );


		var name = 'upgrade'+level;
		if(lvlFunc[name]){
			lvlFunc [name].action();
		}
	}

	//TODO: stop error -> do not let level to zero or far higher
	function displayLevelDown(){
		console.log("GO DOWN: level " + (level+1));
		level += 1;
		if( lvlFunc[level] ){
			lvlFunc[level].action();
			removeHidden(buttons.levelUp);
		} else {
			level -= 1;
		}
	}

	function displayLevelUp(){
		console.log("GO UP: level " + (level-1));
		level -= 1;
		if(level===2){
			addHidden( buttons.levelUp );
			lvlFunc[level].action();
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
			element.classList.remove('hidden');
			visibleElements.push( element );
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