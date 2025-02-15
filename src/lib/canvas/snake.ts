import { isDef, randomInt } from '@/utils/utils';
import { Grid, type Position } from './grid'

export enum DIRECTION {
  UP = 1,
  DOWN = -1,
  LEFT = 2,
  RIGHT = -2
}

export type Speed = 1 | 2 | 3 | 4 | 5

type SnakeOptions = {
  grid: InstanceType<typeof Grid>;
  speed?: Speed;
  onStart?: () => void;
  onEnd?: () => void;
  onEat?: () => void;
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

type SnakeStartOptions = {
  length: number;
  direction: DIRECTION
}

export class SnakeGame {
  grid: InstanceType<typeof Grid>;
  snake?: Snake | null;
  direction?: DIRECTION;
  speed?: Speed;
  unitSize = 1;
  _moveStep = 1;
  uninstallKeyboardEvent?: () => void;
  foodPos?: Position | null
  onStart?: () => void;
  onEnd?: () => void;
  onEat?: () => void;
  _started = false;
  stopRaf?: () => void

  constructor(options: SnakeOptions) {
    let { grid, speed, onStart, onEnd, onEat } = options
    this.grid = grid
    this.setSpeed(speed ?? 1)
    this.onStart = onStart
    this.onEat = onEat
    this.onEnd = onEnd
  }

  //判断是否结束
  isEnd() {
    if (!this.snake) throw Error("init start game first")
    let head = this.snake.head!
    // console.log('是否越界：', isOutBound(head), '是否交叉：', _isCross())
    return this.grid.isOutBound(head) || this._isCross()
  }

  //判断是否交叉
  _isCross() {
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
  _drawSnake() {
    if (!this.snake) throw Error("init start game first")
    let { snake } = this
    this.grid.fresh()
    let current = snake.head as SnakeNode | null
    while (current) {
      this.grid.fillGrid({
        x: current.x,
        y: current.y,
        w: this.unitSize,
        h: this.unitSize
      })
      current = current.next
    }
  }

  //画食物
  _drawFood() {
    if (this.foodPos) {
      this.grid.fillGrid({
        ...this.foodPos,
        w: this.unitSize,
        h: this.unitSize
      })
    }
  }

  draw() {
    this._drawSnake()
    this._drawFood()
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
  _testEatFood(headPos: Position) {
    let foodPos = this.foodPos
    let head = headPos
    return foodPos ? head.x == foodPos.x && head.y == foodPos.y : false
  }

  //移动
  _move() {
    if (!this.snake) throw Error("init start game first")
    let { snake, direction, _moveStep } = this
    let head = snake.head!
    let tail = snake.tail!

    let nextHead: SnakeNode

    switch (direction!) {
      case DIRECTION.UP:
        nextHead = {
          x: head.x,
          y: head.y - _moveStep,
          prev: null,
          next: null
        }
        break;

      case DIRECTION.DOWN:
        nextHead = {
          x: head.x,
          y: head.y + _moveStep,
          prev: null,
          next: null
        }
        break;

      case DIRECTION.LEFT:
        nextHead = {
          x: head.x - _moveStep,
          y: head.y,
          prev: null,
          next: null
        }
        break;

      case DIRECTION.RIGHT:
        nextHead = {
          x: head.x + _moveStep,
          y: head.y,
          prev: null,
          next: null
        }
        break;
    }
    if (this._testEatFood(nextHead!)) {
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

  _setupKeyboardEvent() {
    let fn = (e: KeyboardEvent) => {
      console.log(e.key)
      this.changeDirection({
        w: DIRECTION.UP,
        s: DIRECTION.DOWN,
        a: DIRECTION.LEFT,
        d: DIRECTION.RIGHT
      }[e.key]
      )
    }
    window.addEventListener('keydown', fn)
    this.uninstallKeyboardEvent = () => window.removeEventListener('keydown', fn)
  }

  //生成食物坐标
  _generateFood() {
    if (!this.foodPos) {
      this.foodPos = {
        x: randomInt(this.grid.xMax),
        y: randomInt(this.grid.yMax)
      }
    }
  }

  _createSnake({ length, direction }: SnakeStartOptions) {
    let snake = this.snake = {
      head: null,
      tail: null
    } as Snake

    const _append = (options: Position) => {
      let { x, y } = options
      let node: SnakeNode = { x, y, prev: null, next: null }

      let snake = this.snake!
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

    //添加头节点
    _append({ x: 50, y: 10 })
    let i = length
    while (--i > 0) {
      let tail = snake.tail!;
      ({
        [DIRECTION.UP]: () => { _append({ x: tail.x, y: tail.y - 1 }) },
        [DIRECTION.DOWN]: () => { _append({ x: tail.x, y: tail.y + 1 }) },
        [DIRECTION.LEFT]: () => { _append({ x: tail.x + 1, y: tail.y }) },
        [DIRECTION.RIGHT]: () => { _append({ x: tail.x - 1, y: tail.y }) }
      }[direction])();
    }

    this._drawSnake()
  }

  setSpeed(n: Speed) {
    this.speed = n
    this._moveStep = 1
  }

  start(options?: SnakeStartOptions) {
    if (this._started) return
    this._started = true
    let {
      length = 1,
      direction = DIRECTION.RIGHT,
    } = options || {}
    this.direction = direction
    this.onStart?.()

    this._createSnake({ length, direction })
    this._generateFood()
    this.draw()
    if (!this.uninstallKeyboardEvent) {
      this._setupKeyboardEvent()
    }
    let time: number, raf: number, success, run = (t: number) => {
      if (!time) {
        time = t
      }
      success = this._move()

      //随机生成食物
      if (randomInt(1000) > 500) {
        this._generateFood()
      }
      if (success) {
        raf = requestAnimationFrame(run)
        return
      }

      raf = 0
      this.onEnd?.()
      return
    }
    raf = requestAnimationFrame(run)
  }

  reset() {
    this.snake = null
    this.foodPos = null
    this._started = false
    this.stopRaf?.()
  }

  restart(options?: SnakeStartOptions) {
    this.reset()
    this.start(options)
  }

  destory() {
    this.uninstallKeyboardEvent?.()
  }
}
