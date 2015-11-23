function Sprite(sheet,frameHeight,frameWidth,cx,cy, animationTime, frames, scale) {

    this.spriteSheet = sheet;
    this.frameHeight = frameHeight;
    this.frameWidth = frameWidth;
    this.cx = cx;
    this.cy = cy;
    this.shouldAnimate = false;
    this.animationTime = animationTime;
    this.animationFrames = frames;
    this.scale = scale;
}

Sprite.prototype.frameHeight = undefined;
Sprite.prototype.frameWidth = undefined;

Sprite.prototype.spriteSheet = undefined;
Sprite.prototype.animationTime = undefined;

Sprite.prototype.cx = undefined;
Sprite.prototype.cy = undefined;

Sprite.prototype.shouldAnimate = undefined;

Sprite.prototype.animationFrames = undefined;
Sprite.prototype.scale = undefined;


Sprite.prototype.draw = function(frame){
    if(this.shouldAnimate){


        g_ctx.drawImage(this.spriteSheet, this.frameWidth*frame, 0, this.frameWidth, this.frameHeight, this.cx, this.cy, this.frameWidth*this.scale, this.frameHeight*this.scale);
    

    }else{
        g_ctx.drawImage(this.spriteSheet, this.frameWidth*0, 0, this.frameWidth, this.frameHeight, this.cx, this.cy, this.frameWidth*this.scale, this.frameHeight*this.scale);
    }
}
