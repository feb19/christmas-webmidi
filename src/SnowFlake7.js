
export default class SnowFlake7 {

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
    this.rate = 1
    this.g = new PIXI.Graphics()
    stage.addChild(this.g)
  }

  draw() {
    if (this.isDead) {
      return
    }

    var degree = this.degree
    this.g.clear()
    var r = 1
    for (var i = 0; i < 12; i++) {
      this.circleX = this.radius * r * Math.cos(degree/180 * Math.PI)
      this.circleY = this.radius * r * Math.sin(degree/180 * Math.PI)
      degree+=30
      r = r == 1 ? this.rate : 1
      this.circleX2 = this.radius * r * Math.cos(degree/180 * Math.PI)
      this.circleY2 = this.radius * r * Math.sin(degree/180 * Math.PI)
      this.g.lineStyle(1, 0xffffff).moveTo(
        this.circleX + this.x,
        this.circleY + this.y).lineTo(
        this.circleX2 + this.x,
        this.circleY2 + this.y)
    }

    degree = this.degree


    this.rate += (0.4 - this.rate) * 0.05
    this.y += this.radius/20
    this.degree+=0.4
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
