/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Player from '../sprites/Player'


export default class extends Phaser.State {
  init () {}
  preload () {
    this.game.load.spritesheet('player', 'assets/player.png', 28, 22)
    this.game.load.image('ground', 'assets/ground.png')
    this.game.load.image('wall', 'assets/wall.png')
    this.game.load.image('enemy', 'assets/enemy.png')
    this.game.load.image('coins', 'assets/coin.png')
    this.game.load.image('explosion', 'assets/exp.png');
    this.game.load.audio('jump', 'assets/jump.wav', '/assets/jump.mp3')
    this.game.load.audio('soundCoins', 'assets/coin.wav', '/assets/coin.mp3')
    this.game.load.audio('dead', 'assets/dead.wav', '/assets/dead.mp3')

  }

  spawnPlayer(){
    if(this.playerIsDead){
      this.player.x=380
      this.player.y=101
    }
  }
  create (){
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    if (this.playerIsDead == true) {this.spawnPlayer()}
    this.player = new Player({
    game: this,
    x: this.world.centerX,
    y: this.world.centerY,
    asset: 'player'
  })
    game.input.onDown.add(shake, this);
    this.putCoinsOnlevel()
    this.player = game.add.sprite(250,101, 'player')
    this.enemy = game.add.sprite(400,400/2-20, 'enemy')
    this.coins = game.add.sprite(420,100, 'coins')
    this.ground = game.add.sprite(760/2-160, 400/2,'ground')
    this.wall1 = game.add.sprite(760/2-160, 400/2-40,'wall')
    this.wall2 = game.add.sprite(760/2+140, 400/2-80,'wall')

    this.jumpSound = this.game.add.audio('jump')
    this.deadSound = this.game.add.audio('dead')
    this.coinSound = this.game.add.audio('soundCoins')

    game.physics.arcade.enable(this.player)
    game.physics.arcade.enable(this.ground)
    game.physics.arcade.enable(this.wall1)
    game.physics.arcade.enable(this.wall2)
    game.physics.arcade.enable(this.enemy)
    game.physics.arcade.enable(this.coins)

    this.player.body.gravity.y= 600

    this.ground.body.immovable = true
    this.wall1.body.immovable = true
    this.wall2.body.immovable = true
    this.enemy.body.immovable = true


    this.player.body.setSize(20,20,0,0);

    this.player.animations.add('idle', [3,4,5,4],5,true)
    this.player.animations.play('idle')
    this.cursor = game.input.keyboard.createCursorKeys()
    this.hasJumped = false

    emitter = game.add.emitter(0, 0, 100);

    emitter.makeParticles('explosion');
    emitter.gravity = 200;

    game.input.onDown.add(particleBurst, this);

  }

  dead() {

    //  You can set your own intensity and duration
    game.camera.shake(0.05, 500);
    this.spawnPlayer();
    this.particleBurst();

  }

  particleBurst(pointer) {

    //  Position the emitter where the mouse/touch event was
    emitter.x = pointer.x;
    emitter.y = pointer.y;

    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    emitter.start(true, 2000, null, 10);

  }

  update(){

    this.game.physics.arcade.collide(this.player, this.ground)
    this.game.physics.arcade.collide(this.player, this.wall1)
    this.game.physics.arcade.collide(this.player, this.wall2)
    this.game.physics.arcade.collide(this.player, this.enemy)
    this.game.physics.arcade.overlap(this.player, this.coins)
    this.game.physics.arcade.collide(this.player, this.level)

    this.inputs()
    if(this.player.body.touching.down){
      this.hasJumped = false
    }


  }

  dead(){
    //so

  }

  loadlevel(){
    this.level = this.game.add.group();
    this.level.enableBody = true;
    this.ground = game.add.sprite(760/2-160, 400/2,'ground')
    this.ground = game.add.sprite(760/2-160, 400/2-80,'wall')
    this.ground = game.add.sprite(760/2+140, 400/2-80,'wall')

    this.level.setAll('body.immovable', true)
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
    if (this.game.physics.arcade.collide(this.player, this.enemy)){
      this.deadPlayer();
    }
    if (this.game.physics.arcade.collide(this.player, this.coins)) {
      this.takeCoin();
    }
  }

  putCoinsOnlevel(){
    this.coins = game.add.group();
    this.coins.body.immovable = true;
    game.add.sprite(420,100, 'coins', 0,this.coins)
    game.add.sprite(460,100, 'coins', 0,this.coins)
    game.add.sprite(480,100, 'coins', 0,this.coins)




  }

  takeCoin(player, coins){
    console.log('coin')
    coin.body.enable = false
    game.add.tween(coin).to({width:0}).start()
    this.coinSound.play()




  }
  jumpPlayer () {
    this.player.body.velocity.y = -220
    this.jumpSound.play()
    this.hasJumped = true
  }
  // coinPlayer () {
  //   this.coinSound.play()
  // }

  deadPlayer(){
    this.deadSound.play()
  }


  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
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