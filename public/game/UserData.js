'use strict'

UserData.prototype.userName = undefined;
UserData.prototype.upgrades = undefined;
UserData.prototype.currency = 0;
UserData.prototype.settings = undefined;
UserData.prototype.currFactor = 0;
UserData.prototype.treeFactor = 1;
UserData.prototype.timestamp = undefined;
UserData.prototype.score = undefined;


//constructor
function UserData(userDataFromDB){

	console.log(userDataFromDB)
	var data = JSON.parse(userDataFromDB);

	this.userName = data.userName;
	this.upgrades = data.upgrades;
	this.currency = data.currency;
	this.settings = data.settings;
	this.currFactor = data.currFactor;
	this.treeFactor = data.treeFactor;
	this.timestamp = data.timestamp;
	this.score = data.score;
	console.log('inn í userData constr', data);
	//implements
};


//getters
UserData.prototype.getUpgrades = function(){
	return this.upgrades;
};

UserData.prototype.getCurrency = function(){
	return this.currency;
};

UserData.prototype.getSettings = function(){
	return this.settings;
};
				   
UserData.prototype.getCurrFactor = function(){
	return this.currFactor;
};

UserData.prototype.getTreeFactor = function(){
	return this.treeFactor;
};

UserData.prototype.getTimestamp = function(){
	return this.timestamp;
};

//setters

UserData.prototype.setUpgrades = function(upgrades){
	this.upgrades = upgrades;
}

UserData.prototype.setCurrency = function(currency){
	this.currency = currency;
};

UserData.prototype.setSettings = function(settings){
	this.settings = settings;
};

UserData.prototype.setCurrFactor = function(currFactor){
	this.currFactor = currFactor;
};

UserData.prototype.setTreeFactor = function(treeFactor){
	this.treeFactor = treeFactor;
}

UserData.prototype.setTimestamp = function(timestamp){
	this.timestamp = timestamp;
};

UserData.prototype.createJSONstring = function(){
				 
	var string = '{"userName": "'+this.userName+'","upgrades": [['+this.upgrades[0].toString()+'],['+this.upgrades[1].toString()+'],['+this.upgrades[2].toString()+']], "currency": '+this.currency+', "settings": "'+this.settings+'", "currFactor": '+this.currFactor+', "treeFactor": '+this.treeFactor+', "timestamp": '+ Date.now() +', "score": '+this.score+' }';

	console.log(string);
	return string;

}









