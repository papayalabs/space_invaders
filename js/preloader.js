var Preloader = {

	preload: function () {

		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(game.world.centerX-125,game.world.centerY, 'preloaderBar');
		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.progress = this.game.add.text(game.world.centerX+200,game.world.centerY+15, this.load.progress+' % ',{ font: '42px Arial', fill: '#fff' });
	    this.progress.anchor.setTo(0.5, 0.5);
	    this.progress.visible = true;
		this.load.setPreloadSprite(this.preloadBar);	
	    this.load.image('main_menu', 'img/space-invaders.jpg');
        this.load.audio('music', 'snd/bgm/Mission Plausible.ogg');

	    this.load.spritesheet('invader', 'img/enemies/enemy'+alien_colors[game.rnd.integerInRange(0,3)]+game.rnd.integerInRange(1,5)+'.png', 93, 93);
	    this.load.spritesheet('kaboom', 'img/explode.png', 128, 128);

	    this.load.image('touch', 'img/touch.png')
	    this.load.image('fire', 'img/fire.png')

	    this.load.image('button', 'img/button.png')
	    this.load.image('contour', 'img/contour.png')
		this.load.image('stick', 'img/stick.png')
		
	    this.load.image('ship', 'img/player/playerShip'+game.rnd.integerInRange(1,3)+'_'+ship_colors[game.rnd.integerInRange(0,3)]+'.png');
 		this.load.image('laser', 'img/lasers/laser'+laser_colors[game.rnd.integerInRange(0,1)]+'0'+game.rnd.integerInRange(1,7)+'.png');
 		this.load.image('alienBullet', 'img/lasers/laser'+laser_colors[game.rnd.integerInRange(0,1)]+'0'+game.rnd.integerInRange(8,9)+'.png');
 		this.load.image('starfield', 'img/starfield.jpg');
        this.load.audio('laser', 'snd/sfx/laser2.ogg');
        this.load.audio('explosion', 'snd/explosion.ogg');

	    this.load.image('game-over', 'img/game_over.png');
        this.load.audio('music-end', 'snd/bgm/Retro Mystic.ogg');

	},

    loadUpdate: function() {
	    this.progress.setText(this.load.progress+' % ');
    },

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
		this.state.start('MainMenu');

	},

	// update: function () {

	// 	//	You don't actually need to do this, but I find it gives a much smoother game experience.
	// 	//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
	// 	//	You can jump right into the menu if you want and still play the music, but you'll have a few
	// 	//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
	// 	//	it's best to wait for it to decode here first, then carry on.
	// 	
	// 	//	If you don't have any music in your game then put the game.state.start line into the create function and delete
	// 	//	the update function completely.
	// 	
	// 	if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
	// 	{
	// 		this.ready = true;
	// 		this.state.start('MainMenu');
	// 	}

	// }

};