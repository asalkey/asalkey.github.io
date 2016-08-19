
BasicGame.Lose = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.Lose.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

   	this.music = this.game.add.audio('cat-song',1,true);
    this.music.play('',0,1,true,true);

		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.startGame, this);

    this.add.sprite(265, 100, 'lose');
		this.add.sprite(200, 300, 'intro-cat');


	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

    counter = 0;
		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
