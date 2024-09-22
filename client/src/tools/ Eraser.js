import Brush from './Brush'

class  Eraser extends Brush {
  constructor(canvas) {
    super(canvas)
    this.ctx.strokeStyle='white'
  }
}
export default Eraser