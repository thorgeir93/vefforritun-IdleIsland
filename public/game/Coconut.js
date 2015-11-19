Coconut.prototype.topX = undefined;
Coconut.prototype.topY = undefined;
Coconut.prototype.image = undefined;
Coconut.prototype.audio = undefined;
Coconut.prototype.height = undefined;
Coconut.prototype.width = undefined;
Coconut.prototype.Xvel = 2;
Coconut.prototype.Yvel = -20;

function Coconut(pos, img, audio){

	this.topX = pos.topX;
	this.topY = pos.topY;
	this.height = pos.height;
	this.width = pos.width;
	this.image = img;
	this.audio = audio;
	this.actionFunc = actionFunc;
}

Coconut.prototype.render = function(){
	
	this.drawAt(g_ctx, this.topX, this.topY,this.width, this.height);
	//implement plz
};


Coconut.prototype.getPosition = function(){
	return {x: this.topX,
			y: this.topY,
			width: this.width,
			height: this.height};
}

Coconut.prototype.getImage = function(){
	return this.image;
}

Coconut.prototype.getAudioPath = function(){
	//implement plz
}

Coconut.prototype.drawAt = function (ctx, x, y, w, h) {

	ctx.drawImage(this.image, x, y, w, h);
    //ctx.drawImage(this.image,
                  //x, y);
};
