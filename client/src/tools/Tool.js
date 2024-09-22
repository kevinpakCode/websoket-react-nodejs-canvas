class Tool {
  constructor(canvas, socket, id) {
    this.canvas = canvas
    this.socket = socket
    this.id = id
    this.ctx = canvas.getContext('2d')
    this.destoryEvents()
  }

  set fillColor(color) {
    this.ctx.fillStyle = color
  }
  set strokeColor(color) {
    this.ctx.strokeStyle = color
  }
  set lineWidth(width) {
    this.ctx.lineWidth = width
  }

  destoryEvents() {
    this.canvas.onmounsemove = null
    this.canvas.onmounsedown = null
    this.canvas.onmounseup = null
  }
}

export default Tool