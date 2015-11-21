
Button.prototype.topX = undefined;
Button.prototype.topY = undefined;
Button.prototype.image = undefined;
Button.prototype.audio = undefined;
Button.prototype.actionFunc = undefined;
Button.prototype.height = undefined;
Button.prototype.width = undefined;

function Button(pos, img, audio, actionFunc){

	this.topX = pos.topX;
	this.topY = pos.topY;
	this.height = pos.height;
	this.width = pos.width;
	this.image = img;
	this.audio = audio;
	this.actionFunc = actionFunc;
}

Button.prototype.render = function(){
	
	this.drawAt(g_ctx, this.topX, this.topY,this.width, this.height);
	//implement plz
};

Button.prototype.action = function(i){
	this.actionFunc(i);
};

Button.prototype.getPosition = function(){
	return {x: this.topX,
			y: this.topY,
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