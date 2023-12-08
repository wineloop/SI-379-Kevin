import Phaser from 'phaser'

let highScore = 10000
let cursors: any
let player: any
let ground: any
let map: any
let groundLayer: any
let ghosts: any
let finalGhost: any
let finalGhostHealth: any

let deathAnimation: any

let startTime: any
let finalTime: any
let showScore: any
let counter: any

function randomCoords() {
	return [Math.floor(Math.random() * (865 - 0 + 1)), Math.floor(Math.random() * (460 - 0 + 1))]
}
export default class GameScene extends Phaser.Scene {
	
	constructor() {
		super('gameScene')
	}
	
	preload() {
		this.load.image('player', 'assets/playerr.png')
		this.load.atlas('a-player', 'assets/playerr.png', '/assets/playerr.json')
		this.load.image('ghost', 'assets/ghost.png')
		this.load.atlas('a-ghost', 'assets/ghost.png', '/assets/ghost.json')
		this.load.image('finalGhost', 'assets/finalGhost.png')
		this.load.atlas('a-finalGhost', 'assets/finalGhost.png', '/assets/finalGhost.json')
		this.load.image('tiles', 'assets/tiles.png')
		this.load.tilemapTiledJSON('map', 'assets/map.json')
	}

	create() {
		startTime = new Date();
		map = this.make.tilemap({key: 'map'});
		ground = map.addTilesetImage('tiles');

		deathAnimation = false
		showScore = false
		counter = 0
		
		map.addTilesetImage("tiles", "tiles", 32, 32)
		groundLayer = map.createLayer('Tile Layer 1', ground, 0, 0);
    	groundLayer.setCollisionByExclusion([-1]);
		this.physics.world.bounds.width = groundLayer.width;
    	this.physics.world.bounds.height = groundLayer.height;

		this.anims.create({
			key: 'ghost_idle',
			frames: this.anims.generateFrameNames('a-ghost', {prefix:'ghost' ,start: 1, end: 2}),
			frameRate: 8,
			repeat: -1
		});
		ghosts = []
		for (let i = 0; i < 5; i++) {
			const coords = randomCoords()
			const ghost = this.physics.add.sprite(coords[0],coords[1], 'a-ghost')
			ghost.name = String(i)
			this.physics.add.collider(groundLayer, ghost)
			ghost.anims.play('ghost_idle', true)
			ghosts.push(ghost)
		}

		player = this.physics.add.sprite(200,200, 'a-player')
		player.setBounce(0.2)
		player.setCollideWorldBounds(true)
		this.physics.add.collider(groundLayer, player)
		cursors = this.input.keyboard.createCursorKeys()

		this.cameras.main.setBounds(0, 0, 950, 620);
		this.cameras.main.startFollow(player);
		this.cameras.main.setZoom(1.5);

		this.cameras.main.setBackgroundColor('#374a6d');

		this.anims.create({
			key: 'walk',
			frames: this.anims.generateFrameNames('a-player', {prefix:'player' ,start: 1, end: 8}),
			frameRate: 8,
			repeat: -1
		});

		this.anims.create({
			key: 'jump',
			frames: this.anims.generateFrameNames('a-player', {prefix:'player' ,start: 16, end: 26}),
			frameRate: 8,
			repeat: -1
		});
		 
		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNames('a-player', {prefix:'player' ,start: 9, end: 15}),
			frameRate: 6,
			repeat: -1
		});

		this.anims.create({
			key: 'attack',
			frames: this.anims.generateFrameNames('a-player', {prefix:'player' ,start: 27, end: 30}),
			frameRate: 8,
			repeat: -1
		});

		this.anims.create({
			key: 'ghost_death',
			frames: this.anims.generateFrameNames('a-ghost', {prefix:'ghost' ,start:3, end: 25}),
			frameRate: 15,
		});

		this.anims.create({
			key: 'player_damaged',
			frames: this.anims.generateFrameNames('a-player', {prefix:'player' ,start: 31, end: 33}),
			frameRate: 8,
			repeat: -1
		});

		this.anims.create({
			key: 'finalGhost_idle',
			frames: this.anims.generateFrameNames('a-finalGhost', {prefix:'finalGhost' ,start: 1, end: 2}),
			frameRate: 8,
			repeat: -1
		});

		this.anims.create({
			key: 'finalGhost_damaged',
			frames: this.anims.generateFrameNames('a-finalGhost', {prefix:'finalGhost' ,start:2, end: 3}),
			frameRate: 10,
		});

		this.anims.create({
			key: 'finalGhost_death',
			frames: this.anims.generateFrameNames('a-finalGhost', {prefix:'finalGhost' ,start:3, end: 25}),
			frameRate: 15,
		});

		finalGhostHealth = Math.floor(Math.random() * (20 - 10 + 1) + 10)

		
	}
	update() {
		if (player.active && cursors.left.isDown) // if the left arrow key is down
		{
			player.body.setVelocityX(-200); // move left
			player.anims.play('walk', true);
			player.flipX = true;
		}
		else if (player.active && cursors.right.isDown) // if the right arrow key is down
		{
			player.body.setVelocityX(200); // move right
			player.anims.play('walk', true);
			player.flipX = false;
		}
		else if (player.active && (cursors.up.isDown) && player.body.onFloor())
		{
			player.body.setVelocityY(-400); // jump up
			player.anims.play('jump', true);
		}
		else if(player.active && (cursors.space.isDown)) {
			player.body.setVelocityX(0);
			player.anims.play('attack', true);
			for (let i = 0; i < ghosts.length; ++i){
				if (Math.abs(player.body?.position.x - ghosts[i].body?.position.x) < 50 && Math.abs(player.body?.position.y - ghosts[i].body?.position.y) < 50) {
						ghosts[i].anims.play("ghost_death")
						ghosts.splice(i, 1)
				}
				if(ghosts.length === 0){
					const coords = randomCoords()
					finalGhost = this.physics.add.sprite(coords[0],coords[1], 'a-finalGhost')
					this.physics.add.collider(groundLayer, finalGhost)
					finalGhost.anims.play('finalGhost_idle', true)
				}
			}

			if (finalGhost && Math.abs(player.body?.position.x - finalGhost?.body?.position.x) < 80 && Math.abs(player.body?.position.y - finalGhost?.body?.position.y) < 80) {
				if(finalGhostHealth > 0 && deathAnimation === false){
					deathAnimation = true
					finalGhost?.anims.play("finalGhost_damaged", true).on('animationcomplete', () => {
						finalGhost?.anims.play("finalGhost_idle", true);
						finalGhostHealth = finalGhostHealth - 1;
						deathAnimation = false
						if(finalGhostHealth <= 0){
							finalGhost?.anims.play("finalGhost_death")
							finalGhost = null
							finalTime = new Date();
							player.active = false;
							showScore = true;
						}
					});
				}

			}
		}
		else {
			player.body.setVelocityX(0);
			player.anims.play('idle', true);
		}
		if (showScore === true && counter === 0) {
			++counter;
			(finalTime - startTime)/1000 < highScore ? highScore = (finalTime - startTime)/1000 : highScore = highScore
			this.add.text(player.body?.position.x-50, player.body?.position.y-120, "HIGH SCORE: " + highScore + " SECONDS")
			this.add.text(player.body?.position.x-50, player.body?.position.y-100, "SCORE: " + (finalTime - startTime)/1000 + " SECONDS")
			var text = this.add.text(player.body?.position.x-50, player.body?.position.y-80, 'CLICK HERE TO START OVER');
			text.setInteractive({ useHandCursor: true });
			text.on('pointerover', () => this.enterButtonHoverState(text) )
			text.on('pointerout', () => this.enterButtonRestState(text) );
			text.on('pointerdown', () => this.clickButton());
			showScore = false
		}
	}

	clickButton() {
		this.scene.restart()
		this.scene.switch('titleScene');
	}

	enterButtonHoverState(text: any) {
		text.setStyle({ fill: '#ff0'});
	}

	enterButtonRestState(text: any) {
		text.setStyle({ fill: 'FFFFFF' });
	}
}
