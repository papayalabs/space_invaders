var player;
var aliens;
var cursors;
var lasers;
var laserTime = 0;
var score = 0;
var scoreString = '';
var scoreText;
var stateText;
var laser_sound;
var explosion_sound;
var alienBullet;
var firingTimer = 0;
var livingAliens = [];
var ship_colors = ['blue','green','red','orange']
var alien_colors = ['Black','Blue','Green','Red'] 
var laser_colors = ['Blue','Red']
var lives = 3;
var liveString = '';
var liveText;
var alienFireSpeed = 2000;
var button;

var Game = {
	
	buttonAction: function() {

	    this.fireLaser();

	},
	
	toDrag: function() {
		player.inputEnabled = true;
        player.input.enableDrag();
	},
	
	create: function() {

	    game.physics.startSystem(Phaser.Physics.ARCADE);
	
        // Sonidos
        laser_sound = game.add.audio('laser');
        explosion_sound = game.add.audio('explosion');
 
	    //  Campo de estrellas
	    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
	    //  Jugador
	    player = game.add.sprite(400, 500, 'ship');
	    player.anchor.setTo(0.5, 0.5);
	    game.physics.enable(player, Phaser.Physics.ARCADE);

	    //  Enemigos
	    aliens = game.add.group();
	    aliens.enableBody = true;
	    aliens.physicsBodyType = Phaser.Physics.ARCADE;
	
	    // Balas de los Aliens
	    alienBullets = game.add.group();
	    alienBullets.enableBody = true;
	    alienBullets.physicsBodyType = Phaser.Physics.ARCADE;
	    alienBullets.createMultiple(30, 'alienBullet');
	
	    //  Laseres
	    lasers = game.add.group();
	    lasers.enableBody = true;
	    lasers.physicsBodyType = Phaser.Physics.ARCADE;
	    lasers.createMultiple(100, 'laser');

	    //  El puntaje
	    score = 0;
	    scoreString = 'PUNTAJE: ';
	    scoreText = game.add.text(10, 10, scoreString + score, { font: '18px Arial', fill: '#fff' });

	    //  Las vidas
	    lives = 3;
	    liveString = 'VIDAS: ';
	    liveText = game.add.text(700, 10, liveString + lives, { font: '18px Arial', fill: '#fff' });
	
	    //  Texto
	    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '64px Arial', fill: '#fff' });
	    stateText.anchor.setTo(0.5, 0.5);
	    stateText.visible = false;

        // Crear Enemigos
        // Se crean aliens en 3 filas 5 columnas = 15 aliens
	    this.createAliens();
  		 
	    //  Un grupo de explosiones
	    explosions = game.add.group();
	    explosions.createMultiple(30, 'kaboom');
	
	    //Botones
	    button = game.add.button(10, 460, 'button', this.buttonAction, null, 2, 1, 0);
 	    button = game.add.button(660, 460, 'button', this.buttonAction, null, 2, 1, 0);
  
	    //  Controles de keyboard y mouse
	    cursors = game.input.keyboard.createCursorKeys();
	    fire = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
    	game.input.onDown.add(this.toDrag, this);

	},

    createAliens: function() {
		for (var y = 0; y < 3; y++)
	    {
	        for (var x = 0; x < 5; x++)
	        {
		       // Se crea cada alien 100px de distancia en x y 80px de distancia en y
	            var alien = aliens.create(x * 100, y * 80, 'invader');
	            alien.anchor.setTo(0.5, 0.5);
	            alien.body.moves = false;
	        }
	    }

	    aliens.x = 100;
	    aliens.y = 50;
	
	    //  Movemos el grupo de aliens
	    var tween = game.add.tween(aliens).to( { x: 200 }, alienFireSpeed, Phaser.Easing.Linear.None, true, 0, 1000, true);

	    //  tween loop y descender
	    tween.onLoop.add(this.descend, this);
	},
	
	descend: function() {
	    aliens.y += 10;
	},
	
	
	update: function() {
		
		//  Efecto de movimiento al starfield
	    starfield.tilePosition.y += 2;

	    if (player.alive)
	    {
	        //  Paramos al pana
	        player.body.velocity.setTo(0, 0);

            // Checkeamos las teclas, nos movemos
	        if (cursors.left.isDown)
	        {
	            player.body.velocity.x = -200;
	        }
	        else if (cursors.right.isDown)
	        {
	            player.body.velocity.x = 200;
	        }
	        else if (cursors.up.isDown)
	        {
	            player.body.velocity.y = -200;
	        }
	        else if (cursors.down.isDown)
	        {
	            player.body.velocity.y = 200;
	        }
	
	        // Dispara si se presiona el mouse
	        if (fire.isDown)
			{
				this.fireLaser();
			}	
			
			//Dispara los aliens
			if (game.time.now > firingTimer)
	        {
	            this.fireAlien();
	        }

	    }
	
		if (button.input.pointerDown(game.input.activePointer.id)) {
					this.fireLaser();
		}
        game.physics.arcade.overlap(lasers, aliens, this.collision, null, this);
        game.physics.arcade.overlap(alienBullets, player, this.alienHitPlayer, null, this);
	},
	
	
	render: function() {
		
	},
	
	
	collision: function (bullet, alien) {

	    //  Cuando hay colision entre alien y laser matamos los dos
	    laser.kill();
	    alien.kill();
	
	    // Aumentamos el puntaje
	    score += 10;
	    scoreText.text = scoreString + score;
	
	    //  Creamos una explosion en las coordenas del alien
	    var explosion = explosions.getFirstExists(false);
	    explosion.reset(alien.body.x, alien.body.y);
     	explosion.animations.add('kaboom');
	    explosion.play('kaboom', 30, false, true);
	    explosion_sound.play();
	
	    if (aliens.countLiving() == 0)
	    {
	        score += 100;
	        scoreText.text = scoreString + score;

	        stateText.text = "GANASTE!!";
	        stateText.visible = true;
	
         	game.input.onTap.addOnce(this.restart,this);

	    }

	},
	
	alienHitPlayer: function(player, bullet) {

		bullet.kill();

	    lives = lives-1;
	    liveText.text = liveString + lives;

	    //  Creamos una explosion en las coordenas del alien
	    var explosion = explosions.getFirstExists(false);
	    explosion.reset(player.body.x, player.body.y);
	    explosion.animations.add('kaboom');
	    explosion.play('kaboom', 30, false, true);
	    explosion_sound.play();
	
	    // Cuando el jugar muere
	    if (lives <= 0)
	    {
	        player.kill();
	        alienBullets.callAll('kill');
            this.gameOver();
	    }
	    
		
	},
	
	gameOver: function (pointer) {
		this.state.start('GameOver');
	},
		
	fireLaser: function() {
		
	    if (game.time.now > laserTime)
	    {
	        laser = lasers.getFirstExists(false);

	        if (laser)
	        {
	            laser.reset(player.x, player.y + 8);
	            laser.body.velocity.y = -400;
	            laserTime = game.time.now + 200;
	        }
	    }
        laser_sound.play();

	},
	
	fireAlien: function() {
		//  Agarramos el primer bullet
	    alienBullet = alienBullets.getFirstExists(false);

        // tamano de array de enemigos = 0
	    livingAliens.length=0;

	    aliens.forEachAlive(function(alien){

	        // ponemos cada alien vivo en el array
	        livingAliens.push(alien);
	    });


	    if (alienBullet && livingAliens.length > 0)
	    {

	        var random=game.rnd.integerInRange(0,livingAliens.length-1);

	        // seleccionamos uno al azar
	        var shooter=livingAliens[random];
	
	        // Disparamos desde este alien
	        alienBullet.reset(shooter.body.x, shooter.body.y);

	        game.physics.arcade.moveToObject(alienBullet,player,120);
	        firingTimer = game.time.now + alienFireSpeed;
	    }
	},
	
	restart: function () {

        //Recreamos los aliens
	    aliens.removeAll();
	    this.createAliens();
	    lives = 3;
	    alienFireSpeed = alienFireSpeed - 200;
	    if(alienFireSpeed <= 0) alienFireSpeed = 200;

	    //revivimos al jugados
	    player.revive();
	
	    //escondemos el texto
	    stateText.visible = false;

	}

};