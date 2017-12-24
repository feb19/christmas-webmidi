import * as PIXI from 'pixi.js'

export default class SnowCircle {

  constructor(stage, x, y, velocity, maxY) {
    this.isDead = false
    this.x = x
    this.y = y
    this.maxY = maxY
    this.radius = velocity
    this.life = 0

    this.g = new PIXI.Graphics()
    this.g.alpha = 0.5 * velocity * 0.1
    stage.addChild(this.g)
  }

  draw() {
    if (this.isDead) {
      return
    }
    this.g.clear()
    this.life ++

    if (this.life > 1000) {
      this.g.alpha -= .001
    }
    if (this.g.alpha <= 0) {
      this.isDead = true
      this.g.clear()
    }

    this.g.lineStyle(0).beginFill(0xffffff).drawCircle(this.x, this.y, this.radius).endFill()
    this.y += this.radius / 10

    if (this.y > this.maxY + this.radius) {
      this.isDead = true
      this.g.clear()
    }
  }
}
