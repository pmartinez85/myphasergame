/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}
  preload () {
    this.game.load.spritesheet('player', 'assets/player.png',28,22)
    this.game.load.image('ground', 'assets/ground.png')
    this.game.load.image('wall', 'assets/wall.png')
    this.game.load.image('enemy', 'assets/enemy.png')
    this.game.load.image('coin', 'assets/coin.png')
    this.game.load.audio('jump', 'assets/jump.wav', '/assets/jump.mp3')
    this.game.load.audio('coins', 'assets/coin.wav', '/assets/coin.mp3')
    this.game.load.audio('dead', 'assets/dead.wav', '/assets/dead.mp3')

  }
  create (){
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.player = game.add.sprite(250,101, 'player')
    this.enemy = game.add.sprite(400,400/2-20, 'enemy')
    this.coin = game.add.sprite(420,100, 'coin')
    this.ground = game.add.sprite(760/2-160, 400/2,'ground')
    this.wall1 = game.add.sprite(760/2-160, 400/2-80,'wall')
    this.wall2 = game.add.sprite(760/2+140, 400/2-80,'wall')

    this.jumpSound = this.game.add.audio('jump')
    this.deadSound = this.game.add.audio('dead')
    this.coinSound = this.game.add.audio('coins')

    game.physics.arcade.enable(this.player)
    game.physics.arcade.enable(this.ground)
    game.physics.arcade.enable(this.wall1)
    game.physics.arcade.enable(this.wall2)
    game.physics.arcade.enable(this.enemy)
    game.physics.arcade.enable(this.coin)

    this.player.body.gravity.y= 600

    this.ground.body.immovable = true
    this.wall1.body.immovable = true
    this.wall2.body.immovable = true
    this.enemy.body.immovable = true
    this.coin.body.immovable = true


    this.player.body.setSize(20,20,0,0);

    this.player.animations.add('idle', [3,4,5,4],5,true)
    this.player.animations.play('idle')
    this.cursor = game.input.keyboard.createCursorKeys()
    this.hasJumped = false

  }

  update(){

    this.game.physics.arcade.collide(this.player, this.ground)
    this.game.physics.arcade.collide(this.player, this.wall1)
    this.game.physics.arcade.collide(this.player, this.wall2)
    this.game.physics.arcade.collide(this.player, this.enemy)
    this.game.physics.arcade.collide(this.player, this.coin)

    this.inputs()
    if(this.player.body.touching.down){
      this.hasJumped = false
    }


  }

  inputs (){

    if (this.cursor.left.isDown){
      this.player.body.velocity.x = -50
      this.player.frame = 2
    }
    else if (this.cursor.right.isDown){
      this.player.body.velocity.x = 50
      this.player.frame = 2
    }
    else {
      this.player.body.velocity.x = 0
    }

    if (this.cursor.up.isDown){
      this.jumpPlayer();
    }
    if (this.game.physics.arcade.collide(this.player, this.enemy) == true){
      this.deadPlayer();
    }
    if (this.game.physics.arcade.collide(this.player, this.coin) == true) {
      this.coinPlayer();
    }
  }

  jumpPlayer () {
    this.player.body.velocity.y = -220
    this.jumpSound.play()
    this.hasJumped = true
  }

  coinPlayer () {
    this.coinSound.play()

  }

  deadPlayer(){
    this.deadSound.play()


  }

  render () {
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}


// create () {
//   const bannerText = 'Phaser + ES6 + Webpack'
//   let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
//   banner.font = 'Bangers'
//   banner.padding.set(10, 16)
//   banner.fontSize = 40
//   banner.fill = '#77BFA3'
//   banner.smoothed = false
//   banner.anchor.setTo(0.5)
//
//   this.mushroom = new Mushroom({
//     game: this,
//     x: this.world.centerX,
//     y: this.world.centerY,
//     asset: 'mushroom'
//   })
//
//   this.game.add.existing(this.mushroom)
// }