var Boot = {
	
	preload: function () {
		this.load.image('preloaderBackground', 'img/preloader_background.png');
		this.load.image('preloaderBar', 'img/preloadr_bar.png');
	},
	
	create: function () {

 		this.state.start('Preloader');

	}
	
	
};