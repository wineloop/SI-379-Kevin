import Phaser from 'phaser'

import GameScene from './GameScene'
import TitleScene from './TitleScene'

var gameScene = new GameScene();
var titleScene = new TitleScene();

const config = {
	type: Phaser.CANVAS,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
		},
	},
}


var game = new Phaser.Game(config)

game.scene.add('titleScene', titleScene);
game.scene.add("gameScene", gameScene);

game.scene.start('titleScene');
