var position;
var stickPosition;
var delta;
var squareRad;
var contour;
var stick;
var margin;
var isTouchDevice = 'ontouchstart' in document.documentElement;

var Joystick = function Joystick(game) {
	
    create: function(){
	    this.position=new Phaser.Point(0,0); //position of the whole joystick
	    this.stickPosition=new Phaser.Point(0,0); //position of the stick

	    this.delta=new Phaser.Point(0,0); //vector from joystick to finger
        this.stick=game.add.sprite(this.stickPosition.x, this.stickPosition.y, 'stick');
//	    this.stickSize = new Phaser.Point(this.stick.body.width,this.stick.body.height); 
//	    this.halfStickSize=new Phaser.Point(this.stickSize.x>>1,this.stickSize.y>>1);
	
//	    this.squareRad=this.halfStickSize.x*this.halfStickSize.y; //compared with square magnitude of delta in setPosition() to determine what to do

        this.contour=game.add.sprite(this.position.x, this.position.y, 'contour');
//	    this.contourSize = new Phaser.Point(this.contour.body.width,this.contour.body.height); 
//	    this.halfContourSize=new Phaser.Point(this.contourSize.x>>1,this.contourSize.y>>1);


//	    this.margin=new Margin(-this.halfSize.x,-this.halfSize.x);
    },
	
    update: function(){
        if(isTouchDevice){ //draw joystick if TOUCH_PRESSED
            this.position = new Phaser.Point(game.input.x, game.input.y);
            this.stickPosition = new Phaser.Point(game.input.x, game.input.y);        }
    }
};
/*
    setPosition: function(fingerPosition){ //TOUCH_MOVED
            this.computeDelta(fingerPosition); //compute the vector from finger to joystick 
            
            var sMag = this.delta.squareMagnitude(); //square magnitude of delta
            if(sMag >= this.squareRad){ //joystick moves if the finger is out of the joystick contour
                this.stickPosition.initV(fingerPosition); //stick moves under the finger
                
                this.delta.normalize(); //delta is now a direction
                this.delta.scale(this.halfSize.X,2); //delta is now the stick position relative to the whole joystick
                
                this.position.initV(fingerPosition); //joystick contour moves under the finger
                this.position.subtract(this.delta); //joystick contour is moved in order to keep stick direction
                this.clamp();// the joystick contour can't go out of the screen
            
            }else //finger is inside the joystick contour. We move the stick only
                this.stickPosition.initV(fingerPosition); //stick is moved under the finger
                
            this.computeDirection(); //gives the stick direction to the space ship
    },
    computeDelta: function(position){ //compute the vector from finger to joystick 
        this.delta.initV(position);
        this.delta.subtract(this.position);
    },
    computeDirection: function(){ //sends the joystick direction to the space ship
        player.direction.initV(this.delta);
        player.direction.scale(1/this.halfSize.X,2); //normalize D
    },
    clamp: function(){ //joystick contour can't go out of screen
        if(this.position.Y<this.margin.top)this.position.Y=this.margin.top;
        if(this.position.X>this.margin.right)this.position.X=this.margin.right;
        if(this.position.Y>this.margin.bottom)this.position.Y=this.margin.bottom;
        if(this.position.X<this.margin.left)this.position.X=this.margin.left;
    },
    release: function(){ //TOUCH_RELEASED
        this.stickPosition.initV(this.position);
        player.direction.init(.0,.0);    
    },
    init: function(fingerPosition){ //TOUCH_PRESSED
        this.position.initV(fingerPposition);
        this.stickPosition.initV(fingerPosition);
        this.clamp();
        this.computeDelta(fingerPosition);
        this.computeDirection();
    }
};

var pos = new Phaser.Point(game.input.x, game.input.y);

var direction = Phaser.Point.subtract(this.iniPos, pos);
var magnitude = direction.getMagnitudeSq();
if (magnitude > this.distSq) {
  direction = Phaser.Point.subtract(pos, this.iniPos);
  direction = direction.setMagnitude(this.dist);
  var newPos = Phaser.Point.add(this.iniPos, direction);
  pos.copyFrom(newPos);
}

this.alien.position.copyFrom(pos);
*/