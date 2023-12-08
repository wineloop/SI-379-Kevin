
export default class TitleScene extends Phaser.Scene {
    constructor() {
		super({key:'titleScene'});
	}

	preload() {
		this.load.image('background', '/assets/titleScreen.png');
	}

	clickButton() {
		this.scene.switch('gameScene');
	}

	enterButtonHoverState(text: any) {
		text.setStyle({ fill: '#ff0'});
	}

	enterButtonRestState(text: any) {
		text.setStyle({ fill: 'FFFFFF' });
	}

	create() {
		var bg = this.add.image(0,0,'background');
		bg.setOrigin(0,0);
		bg.displayWidth = 800
		bg.displayHeight = 600
		

		var text = this.add.text(310,300, 'CLICK HERE TO START');
		text.setInteractive({ useHandCursor: true });
		text.on('pointerover', () => this.enterButtonHoverState(text) )
		text.on('pointerout', () => this.enterButtonRestState(text) );
		text.on('pointerdown', () => this.clickButton());
	}
}