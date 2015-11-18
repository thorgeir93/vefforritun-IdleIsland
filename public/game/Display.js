'use strict'
function Display(image,buttons,upgrades){
	
	this.image = image;
	this.Buttons = buttons;
	this.upgrades = upgrades;
	console.log('inn í disp constructor');

	//implement plz
}

Display.prototype.Buttons = undefined;
Display.prototype.image = undefined;
Display.prototype.upgrades = undefined;


Display.prototype.render = function(score){
	this.drawAt(g_ctx, 0, 0);

	for(var i = 0; i<this.Buttons.length; i++){
		this.Buttons[i].render();
	}

	g_ctx.fillStyle = "black";
	g_ctx.font="20px Georgia";
	g_ctx.fillText(score,900,150);

	g_ctx.fillStyle = "white";
	//implements plz
};




Display.prototype.drawAt = function (ctx, x, y) {
	ctx.fillRect(0,0,1000,600);
	ctx.drawImage(this.image, x, y);

    //ctx.drawImage(this.image,
                  //x, y);
};

Display.prototype.renderUpgrades = function(upgrades){
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

Display.prototype.findButtonForClick = function(e,upgrades){

	var mouseX = e.pageX - $('#myCanvas').offset().left;
	var mouseY = e.pageY - $('#myCanvas').offset().top;

	for (var i = 0; i < this.Buttons.length; i++) {
		var cords = this.Buttons[i].getPosition();
		if(cords.x <= mouseX && mouseX <= cords.x+cords.width && cords.y <= mouseY && mouseY <= cords.y+cords.height){
			this.Buttons[i].action();
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