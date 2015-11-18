
Button.prototype.centerX = undefined;
Button.prototype.centerY = undefined;
Button.prototype.image = undefined;
Button.prototype.audio = undefined;
Button.prototype.actionFunc = undefined;
Button.prototype.height = undefined;
Button.prototype.width = undefined;

function Button(pos, img, audio, actionFunc){

	this.centerX = pos.centerX;
	this.centerY = pos.centerY;
	this.height = pos.height;
	this.width = pos.width;
	this.image = img;
	this.audio = audio;
	this.actionFunc = actionFunc;
}

Button.prototype.render = function(){
	
	this.drawAt(g_ctx, this.centerX, this.centerY,this.width, this.height);
	//implement plz
};

Button.prototype.action = function(){
	
	//leikur['displayScreen'] = 1;


	this.actionFunc();
	///NOTA ÞETTA !!!!!
	//gameEngine[this.actionFunc]();

	//implement plz
};

Button.prototype.getPosition = function(){
	return {x: this.centerX,
			y: this.centerY,
			width: this.width,
			height: this.height};
}

Button.prototype.getImage = function(){
	return this.image;
}

Button.prototype.getAudioPath = function(){
	//implement plz
}

Button.prototype.drawAt = function (ctx, x, y, w, h) {

	ctx.drawImage(this.image, x, y, w, h);
    //ctx.drawImage(this.image,
                  //x, y);
};