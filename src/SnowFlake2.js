
import * as PIXI from 'pixi.js'

export default class SnowFlake2 {

  constructor(stage, x, y, velocity, maxY) {
    this.x = x
    this.y = y
    this.maxY = maxY
    this.circleX = 0
    this.circleY = 0
    this.radius = 4
    this.targetRadius = 4 + Math.random() * velocity
    this.degree = Math.random() * 360
    this.isDead = false
    this.rate = 0

    this.g = new PIXI.Graphics()
    stage.addChild(this.g)
  }

  draw() {
    if (this.isDead) {
      return
    }

    this.g.clear()
    var degree = this.degree

    for (var j = 0; j < 2; j++) {
      for (var i = 0; i < 6; i++) {
        this.circleX = this.radius * (1+j*0.1) * Math.cos(degree/180 * Math.PI) * this.rate
        this.circleY = this.radius * (1+j*0.1) * Math.sin(degree/180 * Math.PI) * this.rate
        this.g.lineStyle(1, 0xffffff).moveTo(
          this.circleX + this.x,
          this.circleY + this.y).lineTo(
          this.getRotatePoint(this.circleX, this.circleY, 60).x + this.x,
          this.getRotatePoint(this.circleX, this.circleY, 60).y + this.y)
        degree+=60
      }
    }

    for (var i = 0; i < 6; i++) {

      this.g.lineStyle(1, 0xffffff).moveTo(
        this.x,
        this.y).lineTo(
        this.circleX + this.x,
        this.circleY + this.y)

      this.circleX = this.radius * Math.cos(degree/180 * Math.PI)
      this.circleY = this.radius * Math.sin(degree/180 * Math.PI)

      degree = degree + 60;
    }

    this.y += this.radius/20
    this.rate += (1 - this.rate) * 0.1
    this.degree+=0.1
    if (this.targetRadius - this.radius < 0.001) {
      this.radius = this.targetRadius
    } else {
      this.radius += (this.targetRadius - this.radius) * 0.1
    }

    if (this.y > this.maxY + this.radius) {
      this.isDead = true
      this.g.clear()
    }
  }

  getRotatePoint(x, y, angle) {
    var cos = Math.cos(angle / 180 * Math.PI)
    var sin = Math.sin(angle / 180 * Math.PI)
    var px = x * cos - y * sin
    var py = x * sin + y * cos
    return {x: px, y: py}
  }
}
