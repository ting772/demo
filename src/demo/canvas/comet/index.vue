<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { registEvent, rafLoop, setElement, drawCycle, randomHexColor, randomBetween, looseEqual, distance } from '@thing772/utils'
import { debounce } from 'lodash-es'
import { Comet, type CometOptions } from '@/utils/class/comet'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let ctx: CanvasRenderingContext2D
let w = window.innerWidth, h = window.innerHeight

useGui({
  查看源码() {
    emit("check-source")
  },
})

let stopRafLoop: (() => void) | undefined;

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

  onUnmounted(() => {
    uninstallResize()
    if (stopRafLoop) stopRafLoop()
  })

  type Node = {
    x: number;
    y: number;
    r: number;
    opacity: number;
    color: string;
  }

  type WidgetComet = Comet<CometOptions, Node> & { flag?: boolean; }
  let comets = [] as WidgetComet[]

  function start() {
    if (stopRafLoop) stopRafLoop()
    stopRafLoop = rafLoop(() => {
      ctx.clearRect(0, 0, w, h)
      console.debug("comets个数", comets.length)
      if (comets.length == 0) {
        stopRafLoop = void 0
        return false
      }
      comets.forEach(comet => {
        comet.render(ctx)
        comet.update()
      })
    })
  }

  registEvent(canvas, "mouseup", (e) => {
    const { offsetX, offsetY } = e as MouseEvent

    let count = 10
    let deg = 0
    for (let index = 0; index < count; index++, deg += 360 / count) {
      let v = randomBetween(5, 10)
      let a = randomBetween(0.01, 0.1, false)
      let r = randomBetween(v / 2, v)
      let decayR = r / 10
      let decayOpacity = randomBetween(0.1, 0.2, false)
      let R = Math.min(w / 2, h / 2)

      let options = {
        x: offsetX,
        y: offsetY,
        vy: v * Math.cos(deg),
        vx: v * Math.sin(deg),
        ay: a * Math.cos(deg) + randomBetween(0.5, 1),
        ax: a * Math.sin(deg),
      }
      let comet = new Comet<CometOptions, Node>(options) as WidgetComet
      comet.children = [{
        x: options.x,
        y: options.y,
        r,
        opacity: randomBetween(0.5, 1, false),
        color: randomHexColor()
      }]

      comet.draw = (ctx, node) => {
        const { x, y, opacity, r, color } = node
        drawCycle(ctx, x, y, r, {
          fillStyle: color,
          globalAphoa: opacity
        })
      }

      comet.updateNode = (node) => {
        node.r -= decayR
        node.opacity -= decayOpacity
        if (node.r < 0 || node.opacity < 0) return false
      }

      comet.continue = function () {
        if (this.flag === false) return false
        if (distance({ x: offsetX, y: offsetY }, this.children[0]) > R) {
          return this.flag = false
        }
        let yFlag = looseEqual(this.vy, 0, 0.2)
        let xFlag = looseEqual(this.vx, 0, 0.2)
        this.flag = !(yFlag && xFlag)
        return this.flag
      }

      comet.onAllDone = function () {
        let index = comets.findIndex(item => item == comet)
        if (index != -1) {
          comets.splice(index, 1)
        }
      }
      comets.push(comet)
    }



    start()
  })

  start()
})

</script>

<style scoped>
canvas {
  cursor: pointer;
}
</style>
