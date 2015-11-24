'use strict'
function Display(image,buttons,upgrades, sprite){
	
	this.image = image;
	this.Buttons = buttons;
	this.upgrades = upgrades;
	
	if(sprite){
		this.sprites = sprite;
	}
	this.animationFrame = 0;
	this.animationCurrentTime = 0;

}

Display.prototype.Buttons = undefined;
Display.prototype.image = undefined;
Display.prototype.upgrades = undefined;
Display.prototype.coconuts = [];
Display.prototype.showArrow = false;

Display.prototype.sprites = undefined;

Display.prototype.render = function(currency, score, isFriend, upgrades){
	//g_ctx.aglobalAlpha = 0.0;
	//g_ctx.fillStyle = 'tranparent';
	//console.log(g_canvasW);
	g_ctx.clearRect(0,0,g_canvasW,g_canvasH);
	g_ctx.fillStyle = 'rgba(0, 0, 0, 0.0)';
	this.drawAt(g_ctx, islandPos.x, islandPos.y);


	for(var i = 0; i<this.Buttons.length; i++){

		if(!(this.Buttons[i].image.name === "downLvl")){
			this.Buttons[i].render();
		}else if(this.showArrow){
			this.Buttons[i].render();
		}
	}


	for(var i = 0; i<this.coconuts.length; i++){
		this.coconuts[i].render();
	}

	var x = 20;
	var y = g_canvasH*0.8;
	var pos1 = {
		x: x,
		y: y
	};

	var pos2 = {
		x: x,
		y: y+25
	};

	if (isFriend) {

	var font = "bold 20px Arial";

	g_ctx.fillStyle = "white";
	g_ctx.font=font;
	g_ctx.fillText('Coconuts :  '+currency,pos1.x,pos1.y);

	g_ctx.font=font;
	g_ctx.fillText('Score : '+score,pos2.x,pos2.y);

	}

	//implements plz
};

Display.prototype.renderSprites = function(upgrades){
	var flag = true;

	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++ ){
			if(upgrades[j][i] === 2){

				if(i === 0){

					this.sprites[i][j+1].draw(this.sprites[i][j+1].CurrentFrame)
				}else{
					console.log(this.sprites[i][j].CurrentFrame, this.sprites[i][j].CurrentTime, this.sprites[i][j].shouldAnimate)
					this.sprites[i][j].draw(this.sprites[i][j].CurrentFrame)
				}
				
				flag = false;
			}

		}
	}

	if(flag){
		this.sprites[0][0].draw(this.sprites[0][0].CurrentFrame)
	}
}

Display.prototype.destroyCoconuts = function(){
	this.coconuts = [];

}

Display.prototype.createCoconut = function(coconut){
	this.coconuts.push(coconut)
}

Display.prototype.update = function(dt){
	if(this.coconuts){
		for(var i = 0; i<this.coconuts.length; i++){
			var kill = this.coconuts[i].update(dt);
			if(kill === -1){
				this.coconuts.splice(i,1);
			}

		}
	}

	if(this.sprites){
		this.sprites[0][0].update(dt);
		for(var i = 0; i < 3; i++){
			for(var j = 0; j < 3; j++){
				if(i === 0){

					this.sprites[i][j+1].update(dt)
				}else{
					this.sprites[i][j].update(dt)
				}
			}	
		}
	}
}

Display.prototype.drawAt = function (ctx, x, y) {
	ctx.fillRect(0,0,1000,600);

	for(var i = 0; i<this.image.length; i++){

		ctx.drawImage(this.image[i], x, y);
		
	}
};



var counter = 0;
Display.prototype.renderUpgrades = function(upgrades){

	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){	
			if(upgrades[i][j] === 0){
				this.drawUpgrade(g_ctx,this.upgrades[1][i][j].image, this.upgrades[1][i][j].getPosition().x, this.upgrades[1][i][j].getPosition().y);
			}else if(upgrades[i][j] === 1){
				this.drawUpgrade(g_ctx,this.upgrades[0][i][j].image, this.upgrades[0][i][j].getPosition().x, this.upgrades[0][i][j].getPosition().y);
			}else if(upgrades[i][j] === 2){
				this.drawUpgrade(g_ctx,this.upgrades[2][i][j].image, this.upgrades[2][i][j].getPosition().x, this.upgrades[2][i][j].getPosition().y);
			}
		}
	}
};


Display.prototype.drawUpgrade = function(ctx, image, x, y, w, h){
	
	ctx.drawImage(image, x, y);

	//draw rectangle around the image
	ctx.rect(x, y, image.width, image.height);
	ctx.stroke();
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 4;
};


Display.prototype.findButtonForClick = function(e,upgrades){

	var mouseX = e.pageX - $('#myCanvas').offset().left;
	var mouseY = e.pageY - $('#myCanvas').offset().top;

	for (var i = 0; i < this.Buttons.length; i++) {
		
		if(!(this.Buttons[i].image.name === "downLvl")){
			var cords = this.Buttons[i].getPosition();
			if(cords.x <= mouseX && mouseX <= cords.x+cords.width && cords.y <= mouseY && mouseY <= cords.y+cords.height){
				this.Buttons[i].action();
			}
		}else if(this.showArrow){
			var cords = this.Buttons[i].getPosition();
			if(cords.x <= mouseX && mouseX <= cords.x+cords.width && cords.y <= mouseY && mouseY <= cords.y+cords.height){
				this.Buttons[i].action();
			}
		}
	}

	if(this.upgrades){
		for(var i = 0; i < 3; i++){
			for(var j = 0; j < 3; j++){	

				if(upgrades[i][j] === 1){
					var cords = this.upgrades[0][i][j].getPosition();
					if(cords.x <= mouseX && mouseX <= cords.x+cords.width && cords.y <= mouseY && mouseY <= cords.y+cords.height){
						var index = [i,j];
						this.upgrades[0][i][j].action(index);
					}
				}
			
			}
		}
		
	}
	//til að taka bara takkana sem er hægt að kaupa (fyrir upgrade menu)
}