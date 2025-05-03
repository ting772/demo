<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { registEvent, rafLoop, setElement, drawLine, randomBetween, ptOffset, loopNGetResult, randomHexColor, angleToPos } from '@thing772/utils'
import { debounce } from 'lodash-es'
import { movePtWithDirection, outBounds } from '@/utils/utils'
import type { Pos } from '@thing772/utils/dist/typings/main';

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let ctx: CanvasRenderingContext2D
let w = window.innerWidth, h = window.innerHeight


useGui({
  查看源码() {
    emit("check-source")
  }
})

type LineOptions = {
  length: number;
  step1: number;
  step2: number
}

let lineCount = 100

function generateP1Random() {
  let p1 = { x: randomBetween(0, w, true), y: randomBetween(0, h, true) }
  return p1
}

/**
 * 给定起始点
 * @param {{x:number;y:number}} p1 - 起始点
 * @param {object} param1
 * @param {number} param1.length - 用于计算沿屏幕中心-起点方向length长度的终点坐标
 * @param {number} param1.step1 - 起点沿屏幕中心-起点方向的移动速度
 * @param {number} param1.step2 - 终点沿屏幕中心-起点方向的移动速度
 */
function line(p1: Pos, {
  length,
  step1,
  step2
}: LineOptions) {

  let color = randomHexColor()
  const center = { x: w / 2, y: h / 2 }
  let dire = ptOffset(center, p1)
  let p2 = movePtWithDirection(p1, dire, length)
  return {
    draw(ctx: CanvasRenderingContext2D) {

      //出了视口，重置为中点
      if (outBounds(p1.x, 0, w) || outBounds(p1.y, 0, h)) {
        p1 = { ...center }
        p2 = movePtWithDirection(center, dire, 0.1)
        return
      }
      drawLine(ctx, {
        strokeStyle: color,
        lineWidth: 1,
        lineCap: 'round'
      })(p1, p2)

      p1 = movePtWithDirection(p1, dire, step1)
      p2 = movePtWithDirection(p2, dire, step2)
    }
  }
}
/**
 * 生成环状射线
 * @param {{x:number;y:number}} center - 环的中点
 * @param {number} r - 环的半径
 * @param {object} args
 * @param {[number,number,boolean]} args.lengthArgs - 随机生成长度的参数（randomBetween的入参)
 * @param {[number,number,boolean]} args.step1Args - 随机生成速度的参数（randomBetween的入参)
 * @param {number} [count=1000]
 */
function generateRoundPointLines(center: Pos, r: number, args: { lengthArgs: [number, number, boolean], step1Args: [number, number, boolean] }, count = 1000) {
  return loopNGetResult((index) => {
    let p1 = angleToPos(center, index * 360 / count, r)
    const length = randomBetween(...args.lengthArgs)
    const step1 = randomBetween(...args.step1Args)
    const step2 = step1 * (+randomBetween(0.8, 1, false).toFixed(2))
    return line(p1, { length, step1, step2 })
  }, count)
}

const canvasRef = ref()

function setCanvasSize() {
  w = window.innerWidth
  h = window.innerHeight
  Object.assign(canvasRef.value, {
    width: w,
    height: h
  })
}

onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  const uninstallResize = registEvent(window, 'resize', debounce(setCanvasSize, 100))

  setCanvasSize()

  setElement(canvas, { 'background-color': '#0d0d0d' })

  let group1 = loopNGetResult(() => {
    const length = randomBetween(1, 5)
    const step1 = randomBetween(1, 5)
    const n = + randomBetween(0.8, 1, false).toFixed(2)
    const step2 = step1 * n

    return line(generateP1Random(), {
      length,
      step1,
      step2
    })
  }, lineCount)

  let group2 = generateRoundPointLines({ x: w / 2, y: h / 2 }, Math.min(w, h) / 2 - 100, {
    step1Args: [0.1, 2, false],
    lengthArgs: [1, 20, false]
  }, 100)

  let group3 = generateRoundPointLines({ x: w / 2, y: h / 2 }, Math.min(w, h) / 2 - 200, {
    step1Args: [0.1, 2, false],
    lengthArgs: [1, 20, false]
  }, 100)

  let lines = group1.concat(group2, group2, group3)

  const stopAni = rafLoop(() => {
    ctx.clearRect(0, 0, w, h)
    lines.forEach(line => {
      line.draw(ctx)
    })
  })

  onUnmounted(() => {
    uninstallResize()
    stopAni()
  })
})
</script>

<style scoped>
canvas {
  cursor: pointer;
}
</style>
