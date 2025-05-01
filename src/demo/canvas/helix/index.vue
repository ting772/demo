<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { getHelixPoints } from '@/utils/curve';
import { drawCurve, interpolateColor } from '@/utils/utils';
import { registEvent, rafLoop, setElement, drawLine, rgb, randomHexColor } from '@thing772/utils'
import { throttle } from 'lodash-es'

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

/**
 * 画普通螺旋线
 * @param ctx
 */
function drawHelix(ctx: CanvasRenderingContext2D) {
  const line = drawLine(ctx, { strokeStyle: "pink" })
  line(...getHelixPoints({ count: 1000, rStart: 100, rEnd: Math.min(w / 2, h / 2), degStart: 90, degEnd: 360 }, { x: w / 2, y: h / 2 }))
}

/**
 * 画颜色渐变的螺旋线
 * @param ctx
 * @param interpolate - 颜色渐变插值器
 */
function drawHelix2(ctx: CanvasRenderingContext2D, interpolate: (ratio: number) => { r: number; g: number; b: number; a: number }) {
  let pts = getHelixPoints({ count: 500, rStart: 100, rEnd: Math.min(w / 2, h / 2), degStart: 0, degEnd: 360 * 5.5 }, { x: w / 2, y: h / 2 })

  drawCurve(ctx, pts, (index: number, total: number) => {
    let v = interpolate(index / (total - 1))
    return {
      strokeStyle: rgb(v.r, v.g, v.b, v.a,),
      lineWidth: Math.max(1, 10 * (index / (total - 1)))
    }
  })
}

const canvasRef = ref()

onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')

  const uninstallResize = registEvent(window, 'resize', throttle(() => {
    w = window.innerWidth
    h = window.innerHeight
    Object.assign(canvas, {
      width: w,
      height: h
    })
  }, 100), { immediate: true })

  const interpolate = interpolateColor(randomHexColor(), randomHexColor())
  setElement(canvas, { 'background-color': '#0d0d0d' })

  if (interpolate) {
    drawHelix2(ctx, interpolate)
  } else {
    drawHelix(ctx)
  }

  const stopAni = rafLoop(() => {
    // ctx.clearRect(0, 0, w, h)

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
