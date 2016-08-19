
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

      this.background = this.add.sprite(350, 300, 'preloaderImage');
      this.preloadBar = this.add.sprite(300, 400, 'preloaderText');
      this.load.setPreloadSprite(this.preloadBar);

      this.game.stage.backgroundColor = '#66CEFF';
    // Pre-game screen assets
      this.game.load.image('intro-cat', 'assets/images/introcat.png');
      this.game.load.image('intro-screen', 'assets/images/intro.png');
      this.game.load.image('win', 'assets/images/win.png');
      this.game.load.image('lose', 'assets/images/lose.png')
      this.game.load.audio('cat-song', ['assets/audio/cat_song.wav']);
    // Game assets
      this.game.load.image('cat', 'assets/images/cat.png');;
      this.game.load.image('stars', 'assets/images/farback.gif');
      this.game.load.image('star', 'assets/images/star.png');
      this.game.load.image('enemy', 'assets/images/asteroid.png');
      this.game.load.audio('game-play', ['assets/audio/game_play.mp3']);
      this.game.load.audio('explosion', ['assets/audio/explosion.wav']);
      this.game.load.audio('starpickup', ['assets/audio/collectcoin.wav']);



	},

	create: function () {
    this.preloadBar.cropEnabled = false;
		this.state.start('MainMenu');
	},

};
