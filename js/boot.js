var Boot = {
	
	preload: function () {
		this.load.image('preloaderBackground', 'img/preloader_background.png');
		this.load.image('preloaderBar', 'img/preloadr_bar.png');
	},
	
	create: function () {
		this.input.maxPointers = 3;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.scale.pageAlignHorizontally = true;
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.minWidth = 320;
            this.scale.minHeight = 180;
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.setScreenSize(true);
        }

        this.state.start('Preloader');
    }
	
};