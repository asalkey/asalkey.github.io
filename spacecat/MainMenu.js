
BasicGame.MainMenu = function (game) {
	this.music = null;
};

BasicGame.MainMenu.prototype = {

	create: function () {
   	this.music = this.game.add.audio('cat-song',1,true);
    this.music.play('',0,1,true,true);

		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.startGame, this);

    this.add.sprite(265, 100, 'intro-screen');
		this.add.sprite(200, 300, 'intro-cat');
	},

	update: function () {

	},

	startGame: function (pointer) {
		this.music.stop();
		this.state.start('Game');
	}

};
