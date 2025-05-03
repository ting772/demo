export type CometOptions = {
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  ax?: number;
  ay?: number;
}

export type Pos = { x: number; y: number; }

/**
 * 彗星对象，
 * 需要重写draw方法
 */
export class Comet<T extends CometOptions = CometOptions, N extends Pos = Pos> {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  ax = 0;
  ay = 0;
  maxLength = 100

  children = [] as N[]

  constructor(options: T) {
    Object.assign(this, options)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  draw(ctx: CanvasRenderingContext2D, node: N) {
    throw Error("需要重写draw方法")
  }

  /**
   * 计算更新节点属性
   * @param node 节点
   * @returns {false|void} 返回false，表示节点以及后续节点无需更新可以舍弃
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateNode(node: N): false | void {
    throw Error('需要重写updateNode方法')
  }

  /**
   * 计算是否还可以添加新的头节点
   * @returns {boolean} 返回true表示可以继续增加（当子节点长度在maxLength内时），false表示不能增加了
   */
  continue() {
    return true
  }

  update() {
    let arr = [] as typeof this.children
    if (this.maxLength > this.children.length && this.continue()) {
      let clone = { ...this.children[0] }
      clone.x += this.vx
      clone.y += this.vy
      this.vx += this.ax
      this.vy += this.ay
      arr.push(clone)
    }

    if (this.children.length == 0) return
    for (let item of this.children) {
      let ret = this.updateNode(item)
      if (ret === false) {
        break
      }
      arr.push(item)
    }

    this.children = arr
    if (arr.length == 0) {
      this.onAllDone()
    }
  }

  onAllDone() {
    console.debug("彗星节点全部消失")
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.children.length == 0) return
    for (let item of this.children) {
      this.draw(ctx, item)
    }
  }
}
