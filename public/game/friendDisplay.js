'use strict'
function friendDisplay(image,buttons,upgrades){
	
	this.image = image;
	this.Buttons = buttons;
	//this.upgrades = upgrades;

}

friendDisplay.prototype.Buttons = undefined;
friendDisplay.prototype.image = undefined;
//friendDisplay.prototype.upgrades = undefined;
//friendDisplay.prototype.coconuts = [];
friendDisplay.prototype.showArrow = true;

friendDisplay.prototype.render = function(currency, score ){
	this.drawAt(g_ctx, 0, 0);
	for(var i = 0; i<this.Buttons.length; i++){
		if(!(this.Buttons[i].image.name === "downLvl")){
			this.Buttons[i].render();
		}else if(this.showArrow){
			this.Buttons[i].render();
		}
	}

	/*for(var i = 0; i<this.coconuts.length; i++){
		this.coconuts[i].render();
	}*/
/*
	g_ctx.fillStyle = "black";
	g_ctx.font="20px Georgia";
	g_ctx.fillText('Your Coconuts :  '+currency,780,150);

	g_ctx.font="20px Georgia";
	g_ctx.fillText('Your score: '+score,820,200);

	g_ctx.fillStyle = "white";*/
	//implements plz
};


/*friendDisplay.prototype.createCoconut = function(coconut){
	this.coconuts.push(coconut)
}

friendDisplay.prototype.update = function(dt){
	if(this.coconuts){
		for(var i = 0; i<this.coconuts.length; i++){
			var kill = this.coconuts[i].update(dt);
			if(kill === -1){
				this.coconuts.splice(i,1);
			}

		}
	}
}*/

friendDisplay.prototype.drawAt = function (ctx, x, y) {
	ctx.fillRect(0,0,1000,600);

	for(var i = 0; i<this.image.length; i++){

		ctx.drawImage(this.image[i], x, y);
		
	}
    //ctx.drawImage(this.image,
                  //x, y);
};



/*var counter = 0;
friendDisplay.prototype.renderUpgrades = function(upgrades){

	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){	


			if(upgrades[i][j] === 0){
				g_ctx.drawImage(this.upgrades[1][i][j].image, this.upgrades[1][i][j].getPosition().x, this.upgrades[1][i][j].getPosition().y);
			}else if(upgrades[i][j] === 1){
				g_ctx.drawImage(this.upgrades[0][i][j].image, this.upgrades[0][i][j].getPosition().x, this.upgrades[0][i][j].getPosition().y);
			}else if(upgrades[i][j] === 2){
				g_ctx.drawImage(this.upgrades[2][i][j].image, this.upgrades[2][i][j].getPosition().x, this.upgrades[2][i][j].getPosition().y);
			}
		
		}
	}
};
*/
friendDisplay.prototype.findButtonForClick = function(e){

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

	/*if(this.upgrades){
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
		
	}*/
	//til að taka bara takkana sem er hægt að kaupa (fyrir upgrade menu)
}