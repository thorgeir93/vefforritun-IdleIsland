'use strict'

function Calculator(text){
	console.log('inn i calculator constr',text)
}

Calculator.prototype.prices = [[10,1000,1000000],[100,10000,100000000],[1000,100000,1000000000000]];
Calculator.prototype.factors = [[1,5,10],[2,7,15],[3,9,20]];
Calculator.prototype.difference = 0;

Calculator.prototype.calculateCurrency = function(time, currency, currFactor){
	var tala = (time/1000)*currFactor;
	var intTala = parseInt(tala, 10)
	var difference = tala - intTala;
	this.difference += difference;
	if(this.difference >= 1){
		this.difference -= 1;
		intTala += 1;
	}

	return currency + intTala;

};

Calculator.prototype.calculateTreeFactor = function(upgrades){

	var factor = 0;
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if(upgrades[i][j] === 2){
				factor += 1;
			}
		}
	}
	return factor;
};

Calculator.prototype.calculateOfflineCurrency = function(date){
	//implement plz
};

Calculator.prototype.createFactor = function(upgrades){
	
	var factor = 0;
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if(upgrades[i][j] === 2){
				factor += this.factors[i][j];
			}
		}
	}
	return factor;
};