/*settings.js*/
//document.addEventListener('DOMContentLoaded',function() {
//	console.log('DOM loaded');
//	Buttons.init();
//});

var Buttons = (function() {
	
	var theGame;

	var level;

	var lvlFunc = {};

	//ELEMENTS
	var buttons = {};
	var numButtons;

	var allBtnElements;
	var circleBtnElements;
	var arrowsBtnElements;

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
		
		circleBtnElements = document.querySelector('.circle-buttons');
		arrowsBtnElements = document.querySelector('.arrows-buttons');
		allBtnElements = document.querySelector('.buttons');

		buildButtons();

		circleBtnElements.appendChild( buttons.upgrade );
		circleBtnElements.appendChild( buttons.settings );

		arrowsBtnElements.appendChild( buttons.levelDown );
		arrowsBtnElements.appendChild( buttons.levelUp );
	}


	function buildButtons(){
		buttons.upgrade = elementCreator('button','upgrade','upgrade');
		buttons.settings = elementCreator('button','settings','settings');
		
		buttons.levelDown= elementCreator('button','level-down','level-down', '&#9660');
		buttons.levelUp= elementCreator('button','level-up','level-up hidden', '&#9650');
		
		buttons.upgrade.addEventListener('click', displayUpgrades);
		//buttons.settings.addEventListener('click', displayUpgrades);
		buttons.levelDown.addEventListener('click', displayLevelDown);
		buttons.levelUp.addEventListener('click', displayLevelUp);
	}

	//
	// DISPLAYS
	//
	function displayUpgrades(){
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