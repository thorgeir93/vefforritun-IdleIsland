'use strict';

function Calculator(){
}


Calculator.prototype.prices1 = [[10,1000,1000000],[100,10000,100000000],[1000,100000,1000000000000]];
Calculator.prototype.factors1 = [[1,5,10],[2,7,15],[3,9,20]];

Calculator.prototype.prices2 = [[10*100,1000*100,1000000*100],[100*100,10000*100,100000000*100],[1000*100,100000*100,1000000000000*100]];
Calculator.prototype.factors2 = [[1*2,5*2,10*20],[2*2,7*2,15*2],[3*2,9*2,20*2]];

Calculator.prototype.difference = 0;

Calculator.prototype.calculateCurrency = function(time, currency, currFactor){
	var tala = (time/1000)*currFactor;
	var intTala = parseInt(tala, 10);
	var difference = tala - intTala;
	this.difference += difference;
	if(this.difference >= 1){
		this.difference -= 1;
		intTala += 1;
	}	

	return currency + intTala;


};

Calculator.prototype.calculateCurrencyOffline = function(time, currency, currFactor){
	var tala = (time/1000)*currFactor;
	var intTala = parseInt(tala, 10);
	var difference = tala - intTala;
	this.difference += difference;
	if(this.difference >= 1){
		this.difference -= 1;
		intTala += 1;
	}	

	return intTala;


};

Calculator.prototype.calculateTreeFactor = function(upgrades,upgrades2){

	var factor = 0;
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if(upgrades[i][j] === 2){
				factor += 1;
			}
		}
	}

	for (i = 0; i < 3; i++) {
		for (var k = 0; k < 3; k++) {
			if(upgrades2[i][k] === 2){
				factor += 1;
			}
		}
	}
	return factor;
};

Calculator.prototype.calculateOfflineCurrency = function(date, currency, factor){
	var timeElapsedInSecs = (Date.now() - date);
	var curr = this.calculateCurrency(timeElapsedInSecs,currency, factor);
	
	return curr;


};

Calculator.prototype.calculateOfflineScore = function(date, currency, factor){
	var timeElapsedInSecs = (Date.now() - date);
	var curr = this.calculateCurrencyOffline(timeElapsedInSecs,currency, factor);
	
	return curr;


};

Calculator.prototype.createFactor = function(upgrades,upgrades2){
	
	var factor = 0;

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if(upgrades[i][j] === 2){
					factor += this.factors1[i][j];
				}
			}
		}

		for (i = 0; i < 3; i++) {
			for (var k = 0; k < 3; k++) {
				if(upgrades2[i][k] === 2){
					factor += this.factors2[i][k];
				}
			}
		}

		
		return factor;
	
};