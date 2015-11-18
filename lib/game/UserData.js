'use strict'

UserData.prototype.userName = undefined;
UserData.prototype.upgrades = undefined;
UserData.prototype.currency = 0;
UserData.prototype.settings = undefined;
UserData.prototype.currFactor = 1;
UserData.prototype.treeFactor = 1;
UserData.prototype.timestamp = undefined;

//constructor
function UserData(userDataFromDB){

	console.log('inn í userData constr');
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









