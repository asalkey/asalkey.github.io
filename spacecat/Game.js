BasicGame.Game = function (game) {

    //inventory = new Inventory(this.game);
	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

var numOfAsteroids = 3;
var numOfStars = 25;
var cat;
var asteroidGroup;
var starGroup;
var counterText;
var counter = 0;
var starPickup;
var music;
var explosion;

BasicGame.Game.prototype = {

	create: function () {
        music = this.game.add.audio('game-play',1,true);
        music.play('',0,1,true,true);

        this.stars = this.game.add.tileSprite(0, 0, 800, 600, 'stars');
        starPickup = this.game.add.audio('starpickup',1,true);

        explosion = this.game.add.audio('explosion',1,true);

        cat = this.game.add.sprite(100, 245, 'cat');
        this.game.physics.enable(cat, Phaser.Physics.ARCADE);
        cat.body.collideWorldBounds = true;

        // Then in our group we do this:
        starGroup = this.game.add.group();
        for(var i=0; i < numOfStars; i++) {
          var stars = starGroup.create(this.game.world.randomX,this.game.world.randomY, 'star');
          this.game.physics.enable(stars, Phaser.Physics.ARCADE);
        }
        starGroup.setAll('body.collideWorldBounds', true);

       asteroidGroup = this.game.add.group();
       for (var i = 0; i < numOfAsteroids; i++)
       {
         var asteroid = asteroidGroup.create(this.game.rnd.integerInRange(100, 700), this.game.rnd.integerInRange(32, 200), 'enemy');
         this.game.physics.enable(asteroid, Phaser.Physics.ARCADE);
         asteroid.body.velocity.x = this.game.rnd.integerInRange(-200, 200);
         asteroid.body.velocity.y = this.game.rnd.integerInRange(-200, 200);
       }

       asteroidGroup.setAll('body.collideWorldBounds', true);
       asteroidGroup.setAll('body.bounce.x', 1);
       asteroidGroup.setAll('body.bounce.y', 1);
       asteroidGroup.setAll('body.minBounceVelocity', 0);

       counterText = this.game.add.text(this.game.world.width - 200, 10, 'Time: 0', { font: "34px Arial", fill: "#ffffff", align: "right" });


       this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);


	},

	update: function () {

        this.game.physics.arcade.collide(asteroidGroup);
        this.game.physics.arcade.overlap(cat, starGroup, this.collectStars, null, this);
        this.game.physics.arcade.overlap(cat, asteroidGroup, this.asteroid_hit_cat, null, this);

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.stars.tilePosition.x -= 2;

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            cat.x -= 4;
            cat.angle = -15;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            cat.x += 4;
            cat.angle = 15;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            cat.y += 4;
            cat.angle = 15;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            cat.y -= 4;
            cat.angle = 15;
        }
        else
        {
            cat.rotation = 0;
        }

	},

	quitGame: function (pointer) {
    music.stop();
		this.state.start('MainMenu');

	},

  updateCounter: function () {
    counter++;
    counterText.setText('Time: ' + counter);
  },

  collectStars: function(cat,star) {
    starPickup.play('',0,1,false);

    star.kill();

    if (starGroup.countLiving() == 0){
        music.stop();
        this.state.start('Win');
    }
  },

  asteroid_hit_cat: function(cat,asteroid){
    cat.kill();
    explosion.play('',0,1,false);
    music.stop();
    this.state.start('Lose');
  }
};


