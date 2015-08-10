var music;
var stateText;

var MainMenu = {

	create: function () {
      this.game.add.image(0,0,'main_menu');
      stateText = game.add.text(game.world.centerX,0,'PRESIONE ESPACIO O CLICK PARA JUGAR', { font: '32px Arial', fill: '#fff' });
      stateText.anchor.setTo(0.5, 0.5);
      stateText.visible = true;
      game.add.tween(stateText).to( { y: 445 }, 2400, Phaser.Easing.Bounce.Out, true);
      music = game.add.audio('music');
      music.loop = true;
      music.play();
	},

	update: function () {
        if (this.game.input.activePointer.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
          music.stop();      
          this.startGame();
        }
	},
	
	render: function() {
	  // game.debug.soundInfo(music, 20, 32);
	},

 	startGame: function (pointer) {
		this.state.start('Game');
	}
	

};