<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { registEvent, rafLoop, setElement, drawLine, randomHexColor, interpolateColor, getHelixPoints, helixPointsGenerator, drawHelixCurve } from '@thing772/utils'
import { debounce } from 'lodash-es'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let ctx: CanvasRenderingContext2D
let w = window.innerWidth, h = window.innerHeight
let type = ref("颜色渐变螺旋线")
const options = ["普通螺旋线", "颜色渐变螺旋线", "逐渐生成螺旋线"] as const

let times = ref(1)
let degEnd = ref(360 * 5.6)
let degStart = ref(0)

useGui({
  螺旋线: {
    value: [type.value, options],
    onChange(name: typeof options[number]) {
      type.value = name
    }
  },
  "逐渐生成动画参数": [
    {
      "逐渐生成动画速度倍数": {
        value: [times.value, 1, 20, 1],
        onFinishChange(v: number) {
          times.value = v
        }
      },
      "逐渐生成动画的起始角度": {
        value: [degStart.value, 0, 360, 1],
        onFinishChange(v: number) {
          degStart.value = v
        }
      },
      "逐渐生成动画的终止角度": {
        value: [degEnd.value, 0, 360 * 10, 1],
        onFinishChange(v: number) {
          degEnd.value = v
        }
      }
    },
  ],
  查看源码() {
    emit("check-source")
  },
})

let stopRafLoop: (() => void) | undefined;

watch(type, () => {
  draw(ctx)
})

watch([times, degStart, degEnd], () => {
  if (type.value != '逐渐生成螺旋线') return
  draw(ctx)
})

function draw(ctx: CanvasRenderingContext2D) {
  console.log('开始画')
  ctx.clearRect(0, 0, w, h)
  if (stopRafLoop) {
    stopRafLoop()
    stopRafLoop = undefined
  }
  switch (type.value) {
    case '普通螺旋线':
      drawHelix(ctx)
      break

    case '颜色渐变螺旋线':
      const interpolate = interpolateColor(randomHexColor(), randomHexColor())
      if (interpolate) {
        drawHelix2(ctx, interpolate)
      } else {
        drawHelix(ctx)
      }
      break

    case '逐渐生成螺旋线': {
      const interpolate = interpolateColor(randomHexColor(), randomHexColor())
      let pts = helixPointsGenerator({ count: 1000, rStart: 100, rEnd: Math.min(w / 2, h / 2), degStart: degStart.value, degEnd: degEnd.value }, { x: w / 2, y: h / 2 })
      let arr = [] as { x: number; y: number }[]

      stopRafLoop = rafLoop(() => {
        for (let i = 0; i < times.value; i++) {
          const { value, done } = pts.next()
          if (done) {
            stopRafLoop = undefined
            ctx.clearRect(0, 0, w, h)
            drawHelix3(ctx, arr, interpolate)
            return false
          }
          arr.push(value)
        }
        ctx.clearRect(0, 0, w, h)
        drawHelix3(ctx, arr, interpolate)
      })
    }

      break
  }
}

/**
 * 画普通螺旋线
 * @param ctx
 */
function drawHelix(ctx: CanvasRenderingContext2D) {
  const line = drawLine(ctx, { strokeStyle: "pink", lineCap: 'round' })
  line(...getHelixPoints({ count: 1000, rStart: 100, rEnd: Math.min(w / 2, h / 2), degStart: 90, degEnd: 360 }, { x: w / 2, y: h / 2 }))
}

/**
 * 画颜色渐变的螺旋线
 * @param ctx
 * @param interpolate - 颜色渐变插值器
 */
function drawHelix2(ctx: CanvasRenderingContext2D, interpolate: (ratio: number) => string) {
  let pts = getHelixPoints({ count: 1000, rStart: 100, rEnd: Math.min(w / 2, h / 2), degStart: 0, degEnd: 360 * 5.6 }, { x: w / 2, y: h / 2 })
  drawHelixCurve(ctx, pts, {
    onSegmentStyle: (index: number, total: number) => {
      return {
        strokeStyle: interpolate(index / (total - 1)),
        lineWidth: Math.max(1, 10 * (index / (total - 1))),
        lineCap: 'round'
      }
    }
  })
}

function drawHelix3(ctx: CanvasRenderingContext2D, pts: any[], interpolate?: (ratio: number) => string) {
  if (pts.length < 2) return
  if (!interpolate) {
    Object.assign(ctx, { strokeStyle: "pink" })
    drawHelixCurve(ctx, pts)
  } else {
    drawHelixCurve(ctx, pts, {
      onSegmentStyle: (index: number, total: number) => {
        return {
          strokeStyle: interpolate(index / (total - 1)),
          lineWidth: Math.max(1, 10 * (index / (total - 1))),
          lineCap: 'round'
        }
      }
    })
  }

}

const canvasRef = ref()

onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')

  const uninstallResize = registEvent(window, 'resize', debounce(() => {
    w = window.innerWidth
    h = window.innerHeight
    Object.assign(canvas, {
      width: w,
      height: h
    })
    draw(ctx)
  }, 100), { immediate: true })

  setElement(canvas, { 'background-color': '#0d0d0d' })

  onUnmounted(() => {
    uninstallResize()
  })
})

</script>

<style scoped>
canvas {
  cursor: pointer;
}
</style>
