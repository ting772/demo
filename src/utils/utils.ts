import { loopNGetResult } from '@thing772/utils'
export { randIndex, randArr, generateRandomIntArray, randomInt } from './rand'
export { arrayChunk, swapArrayItem } from './array'

export function isDef(obj: any) { return obj != undefined }
export function isFunc(obj: any) { return typeof obj === 'function' }
export function identity(x: any) { return x }

/**
 * 返回一个可重复利用元素的数组
 * @param createFn 元素工厂函数
 * @returns (n:number)=>元素[], 传入需要元素的数量，如果不够则会调用元素工厂函数
 */
export function reusableArray<T>(createFn: () => T) {
  let arr = [] as T[]

  function get(count: number) {
    const diff = count - arr.length
    if (diff > 0) {
      arr.push(...loopNGetResult(createFn, diff))
    } else if (diff < 0) {
      arr = arr.slice(0, diff)
    }

    return arr
  }

  //用于更新已有元素
  get.update = function (cb: (item: T) => void) {
    arr.forEach(item => cb(item))
  }

  return get
}

/**
 * 将n1对齐到n2的整数倍
 * @param n1 被对齐的数
 * @param n2 用来对齐的数
 */
export function alignBy(n1: number, n2: number) {
  return ~~(n1 / n2) * n2
}

export function alignBy2(n1: number, n2: number, type: "floor" | "ceil" | "round" = "floor") {
  return Math[type](n1 / n2) * n2
}


/**
 * 从给定点pos，沿着direction向量指定的方向，移动length
 * @param pos
 * @param direction
 * @param length
 */
export function movePtWithDirection(pos: { x: number; y: number; }, direction: { dx: number; dy: number }, length: number) {
  const { dx, dy } = direction
  const len = Math.sqrt(dx ** 2 + dy ** 2)
  return {
    x: pos.x + (dx * length / len),
    y: pos.y + (dy * length / len)
  }
}

export function outBounds(value: number, min: number, max: number) {
  return value < min || value > max
}

/**
 * 计算2颜色的插值
 * @param color1 - 起始颜色
 * @param color2 - 终点颜色
 */
export function interpolateColor(color1: string, color2: string) {
  if (!OffscreenCanvas) {
    console.warn('不支持OffscreenCanvas')
    return
  }

  const canvas = new OffscreenCanvas(101, 1)
  const ctx = canvas.getContext("2d")!
  const grad = ctx.createLinearGradient(0, 0, 100, 0)
  grad.addColorStop(0, color1)
  grad.addColorStop(1, color2)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 101, 1)
  let all = ctx.getImageData(0, 0, 101, 1).data

  function getIndex(data: Uint8ClampedArray, index: number) {
    return {
      r: data[index * 4 + 0],
      g: data[index * 4 + 1],
      b: data[index * 4 + 2],
      a: data[index * 4 + 3],
    }
  }
  /**
    * @param {number} ratio - 插值比例,0-1
    */
  return (ratio: number) => {
    let x = Math.max(0, Math.min(100, ~~(ratio * 100)))
    return getIndex(all, x)
  }
}

export function drawCurve(ctx: CanvasRenderingContext2D, points: { x: number; y: number }[], ctxOptions: object): void
export function drawCurve(ctx: CanvasRenderingContext2D, points: { x: number; y: number }[], optionFn: (index: number, total: number) => object): void
export function drawCurve(ctx: CanvasRenderingContext2D, points: { x: number; y: number }[], param: any) {
  ctx.save()
  if (typeof param == 'object') {
    Object.assign(ctx, param)
  }
  let optionFn = typeof param == 'function' ? param : undefined

  let [start, ...others] = points
  ctx.beginPath()
  ctx.moveTo(start.x, start.y)
  if (!optionFn) {
    for (let pt of others) {
      ctx.lineTo(pt.x, pt.y)
    }
    ctx.stroke()
  } else {
    let index = 0, total = others.length
    for (let pt of others) {
      Object.assign(ctx, optionFn(index, total))
      ctx.lineTo(pt.x, pt.y)
      ctx.stroke()
      index++
      if (index >= total) break
      ctx.beginPath()
      ctx.moveTo(pt.x, pt.y)
    }
  }
  ctx.restore()
}
