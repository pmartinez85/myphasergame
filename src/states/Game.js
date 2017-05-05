/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}
  preload () {
    this.game.load.spritesheet('player', 'assets/player.png',28,22)
    this.game.load.image('ground', 'assets/ground.png')

  }
  create (){
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.player = game.add.sprite(250,50, 'player')
    this.ground = game.add.sprite(760/2-160, 400/2,'ground')

    game.physics.arcade.enable(this.player)
    game.physics.arcade.enable(this.ground)

    this.player.body.gravity.y= 600
    // this.ground.body.gravity.y= -600
    this.ground.body.immovable = true


    this.player.body.setSize(20,20,0,0);

    this.player.animations.add('idle', [3,4,5,4],5,true)
    this.player.animations.play('idle')


  }

  update(){

    this.game.physics.arcade.collide(this.player, this.ground)

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