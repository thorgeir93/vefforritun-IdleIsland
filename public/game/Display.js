'use strict'
function Display(image,buttons){
	
	this.image = image;
	this.Buttons = buttons;
	console.log('inn í disp constructor');

	//implement plz
}

Display.prototype.Buttons = undefined;
Display.prototype.image = undefined;


Display.prototype.render = function(){
	this.drawAt(g_ctx, 0, 0);

	for(var i = 0; i<this.Buttons.length; i++){
		this.Buttons[i].render();
	}
	//implements plz
};


Display.prototype.drawAt = function (ctx, x, y) {
	ctx.fillRect(0,0,1000,600);
	ctx.drawImage(this.image, x, y);

    //ctx.drawImage(this.image,
                  //x, y);
};

Display.prototype.findButtonForClick = function(e){

	var mouseX = e.pageX - $('#myCanvas').offset().left;
	var mouseY = e.pageY - $('#myCanvas').offset().top;

	for (var i = 0; i < this.Buttons.length; i++) {
		var cords = this.Buttons[i].getPosition();
		if(cords.x <= mouseX && mouseX <= cords.x+cords.width && cords.y <= mouseY && mouseY <= cords.y+cords.height){
			this.Buttons[i].action();
		}
	}
}