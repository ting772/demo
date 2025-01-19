import { isDef, randomInt } from '@/utils/utils';
import { Grid, type Position } from './grid'

export enum DIRECTION {
  UP = 1,
  DOWN = -1,
  LEFT = 2,
  RIGHT = -2
}

type Speed = 1 | 2 | 3 | 4 | 5

type SnakeOptions = {
  grid: InstanceType<typeof Grid>;
  speed?: Speed;
  onStart?: () => void;
  onEnd?: () => void;
  onEat?: () => void;
}


type SnakeStartOptions = {
  size?: number;
  direction?: DIRECTION;
}

type Snake = {
  head: SnakeNode | null,
  tail: SnakeNode | null
}

type SnakeNode = {
  x: number;
  y: number;
  prev: SnakeNode | null;
  next: SnakeNode | null;
}

export class SnakeGame {
  grid: InstanceType<typeof Grid>;
  snake?: Snake | null;
  direction?: DIRECTION;
  speed?: Speed;
  uninstallKeyboardEvent?: () => void;
  moveStep: number;
  foodPos?: Position | null
  onStart?: () => void;
  onEnd?: () => void;
  onEat?: () => void;

  constructor(options: SnakeOptions) {
    let { grid, speed, onStart, onEnd, onEat } = options
    this.grid = grid
    this.speed = speed ?? 1
    this.moveStep = [0, 100, 80, 64, 32, 16][this.speed] || 16
    this.onStart = onStart
    this.onEat = onEat
    this.onEnd = onEnd
  }

  append(options: Position) {
    let { x, y } = options
    let node: SnakeNode = { x, y, prev: null, next: null }
    if (!this.snake) throw Error("init start game first")
    let snake = this.snake
    if (!snake.head) {
      snake.head = node
      snake.tail = node
    } else {
      let tail = snake.tail!
      snake.tail = node
      tail.next = node
      node.prev = tail
    }
  }

  //判断是否结束
  isEnd() {
    if (!this.snake) throw Error("init start game first")
    let head = this.snake.head!
    // console.log('是否越界：', isOutBound(head), '是否交叉：', isCross())
    return this.grid.isOutBound(head) || this.isCross()
  }

  //判断是否交叉
  isCross() {
    if (!this.snake) throw Error("init start game first")
    let head = this.snake.head!
    let current = head.next
    while (current) {
      if (head.x == current.x && head.y == current.y) return true
      current = current.next
    }
    return false
  }

  //画蛇
  drawSnake() {
    if (!this.snake) throw Error("init start game first")
    let { snake } = this
    this.grid.fresh()
    let current = snake.head as SnakeNode | null
    while (current) {
      this.grid.fillGrid({
        position: { x: current.x, y: current.y }
      })
      // console.log(current.x, current.y)
      current = current.next
    }
  }

  //画食物
  drawFood() {
    if (this.foodPos) {
      this.grid.fillGrid({
        position: { ...this.foodPos }
      })
    }
  }

  draw() {
    this.drawSnake()
    this.drawFood()
  }

  changeDirection(dir?: DIRECTION) {
    if (isDef(dir)) {
      dir = dir!
      let direction = this.direction!
      if (dir == direction || dir + direction == 0 || ![1, 2].includes(Math.abs(dir))) return
      this.direction = dir
    }
  }

  /**
   * 检查是否吃到食物
   * @param headPos 头节点坐标
   * @returns boolean true代表吃到食物，false表示没有吃到
   */
  testEatFood(headPos: Position) {
    let foodPos = this.foodPos
    let head = headPos
    return foodPos ? head.x == foodPos.x && head.y == foodPos.y : false
  }

  //移动
  move() {
    if (!this.snake) throw Error("init start game first")
    let { snake, direction } = this
    let head = snake.head!
    let tail = snake.tail!

    let nextHead: SnakeNode
    switch (direction!) {
      case DIRECTION.UP:
        nextHead = {
          x: head.x,
          y: head.y - 1,
          prev: null,
          next: null
        }
        break;

      case DIRECTION.DOWN:
        nextHead = {
          x: head.x,
          y: head.y + 1,
          prev: null,
          next: null
        }
        break;

      case DIRECTION.LEFT:
        nextHead = {
          x: head.x - 1,
          y: head.y,
          prev: null,
          next: null
        }
        break;

      case DIRECTION.RIGHT:
        nextHead = {
          x: head.x + 1,
          y: head.y,
          prev: null,
          next: null
        }
        break;
    }
    if (this.testEatFood(nextHead!)) {
      this.foodPos = null
      this.onEat?.()
      nextHead.next = head
      head.prev = nextHead
      snake.head = nextHead
    } else {
      snake.tail = tail.prev
      tail.prev!.next = null
      snake.head = tail
      tail.prev = null
      tail.next = head
      head.prev = tail
      tail.x = nextHead.x
      tail.y = nextHead.y
    }
    return this.isEnd() ? false : (this.draw(), true)
  }

  setupKeyboardEvent() {
    let fn = (e: KeyboardEvent) => {
      this.changeDirection({
        w: DIRECTION.UP,
        s: DIRECTION.DOWN,
        a: DIRECTION.LEFT,
        d: DIRECTION.RIGHT
      }[e.key]
      )
    }
    document.addEventListener('keydown', fn)
    this.uninstallKeyboardEvent = () => document.removeEventListener('keydown', fn)
  }

  //生成食物坐标
  generateFood() {
    if (!this.foodPos) {
      this.foodPos = {
        x: randomInt(this.grid.xMax),
        y: randomInt(this.grid.yMax)
      }
    }
  }

  start(options?: SnakeStartOptions) {
    let {
      size = 5,
      direction = DIRECTION.RIGHT,
    } = options || {}
    this.direction = direction
    this.onStart?.()
    let snake = this.snake = {
      head: null,
      tail: null
    } as Snake
    //添加头节点
    this.append({ x: 10, y: 10 })
    let i = size
    while (--i > 0) {
      let tail = snake.tail
      if (!tail) throw Error("snake tail not init");
      ({
        [DIRECTION.UP]: () => { this.append({ x: tail.x, y: tail.y - 1 }) },
        [DIRECTION.DOWN]: () => { this.append({ x: tail.x, y: tail.y + 1 }) },
        [DIRECTION.LEFT]: () => { this.append({ x: tail.x + 1, y: tail.y }) },
        [DIRECTION.RIGHT]: () => { this.append({ x: tail.x - 1, y: tail.y }) }
      }[direction])();
    }
    this.generateFood()
    this.draw()
    if (!this.uninstallKeyboardEvent) {
      this.setupKeyboardEvent()
    }
    let time: number, raf: number, success, run = (t: number) => {
      if (!time || (t - time >= this.moveStep)) {
        time = t
        success = this.move()

        //随机生成食物
        if (randomInt(1000) > 500) {
          this.generateFood()
        }
        if (!success) {
          raf = 0
          this.onEnd?.()
          return
        }
      }
      raf = requestAnimationFrame(run)
    }
    raf = requestAnimationFrame(run)
    return {
      stop() {
        if (raf) { cancelAnimationFrame(raf) }
      }
    }
  }

  reset() {
    this.snake = null
    this.foodPos = null
  }

  restart(options?: SnakeStartOptions) {
    this.reset()
    this.start(options)
  }

  uninstall() {
    this.uninstallKeyboardEvent?.()
  }
}