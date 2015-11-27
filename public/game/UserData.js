'use strict';

UserData.prototype.userName = undefined;
UserData.prototype.upgrades1 = undefined;
UserData.prototype.upgrades2 = undefined;
UserData.prototype.currency = 0;
UserData.prototype.settings = undefined;
UserData.prototype.currFactor = 0;
UserData.prototype.treeFactor = 1;
UserData.prototype.timestamp = undefined;
UserData.prototype.score = undefined;


//constructor
function UserData(userDataFromDB){

	
	var data = JSON.parse(userDataFromDB);

	this.userName = data.userName;
	this.upgrades1 = data.upgrades1;
	this.upgrades2 = data.upgrades2;
	this.currency = data.currency;
	this.settings = data.settings;
	this.currFactor = data.currFactor;
	this.treeFactor = data.treeFactor;
	this.timestamp = data.timestamp;
	this.score = data.score;

	
	//implements
}


//getters
UserData.prototype.getUpgrades1 = function(){
	return this.upgrades1;
};

UserData.prototype.getUpgrades2 = function(){
	return this.upgrades2;
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

UserData.prototype.setupgrades1 = function(upgrades1){
	this.upgrades1 = upgrades1;
};

UserData.prototype.setupgrades2 = function(upgrades2){
	this.upgrades2 = upgrades2;
};

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
};

UserData.prototype.setTimestamp = function(timestamp){
	this.timestamp = timestamp;
};

UserData.prototype.createJSONstring = function(){

	var string = '{"userName": "'+this.userName+'","upgrades1": [['+this.upgrades1[0].toString()+'],['+this.upgrades1[1].toString()+'],['+this.upgrades1[2].toString()+']],"upgrades2": [['+this.upgrades2[0].toString()+'],['+this.upgrades2[1].toString()+'],['+this.upgrades2[2].toString()+']], "currency": '+this.currency+', "settings": {"audio-slider":'+this.settings['audio-slider']+'}, "currFactor": '+this.currFactor+', "treeFactor": '+this.treeFactor+', "timestamp": '+ Date.now() +', "score": '+this.score+' }';

	
	return string;

};









