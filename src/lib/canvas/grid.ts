import { isDef } from "@/utils/utils";

type GridOptions = {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  gridSize: number;
  background?: string;
}

export type Position = {
  x: number;
  y: number;
}

type FillGridOptions = {
  x: number;
  y: number;
  w?: number;
  h?: number;
  size?: number;
  color?: string;
}

export class Grid {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  gridSize: number;
  xMax: number;
  yMax: number;
  background: string = '#000';

  constructor(options: GridOptions) {
    let {
      canvas,
      width,
      height,
      gridSize,
      background
    } = options

    let nx = Math.floor(width / gridSize)
    let ny = Math.floor(height / gridSize)
    let w = nx * gridSize
    let h = ny * gridSize
    canvas.width = w
    canvas.height = h

    this.canvas = canvas
    this.ctx = canvas.getContext("2d")!;
    this.gridSize = gridSize
    this.xMax = nx - 1
    this.yMax = ny - 1
    if (isDef(background)) this.background = background!
    this.fresh()
  }

  posX2X(x: number) {
    return x * this.gridSize
  }

  posY2Y(y: number) {
    return y * this.gridSize
  }

  isOutBound({ x, y }: Position) {
    return x < 0 || x > this.xMax || y < 0 || y > this.yMax
  }

  fillGrid(options: FillGridOptions) {
    const {
      x, y, w, h,
      color = '#fff',
      size = this.gridSize,
    } = options
    let { ctx } = this
    let prevStyle = ctx.fillStyle
    ctx.fillStyle = color
    ctx.fillRect(this.posX2X(x), this.posY2Y(y), size * (w ?? 1), size * (h ?? 1))
    ctx.fillStyle = prevStyle
  }

  fresh() {
    let { ctx, canvas } = this
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = this.background
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}
