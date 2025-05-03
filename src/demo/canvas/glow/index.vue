<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { registEvent, rafLoop, setElement, randomHexColor, } from '@thing772/utils'
import { debounce } from 'lodash-es'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let ctx: CanvasRenderingContext2D
let w = window.innerWidth, h = window.innerHeight

let times = ref(2)
let color = ref(randomHexColor())
let blur = ref(8)
let animation = ref(false)

useGui({
  查看源码() {
    emit("check-source")
  },
  发光程度: {
    value: [times.value, 1, 20, 1],
    onFinishChange(v: number) {
      times.value = v
    }
  },
  发光颜色: {
    isColor: true,
    value: [color.value],
    onFinishChange(n: string) {
      color.value = n
    }
  },
  扩散: {
    value: [blur.value, 4, 100, 1],
    onFinishChange(n: number) {
      blur.value = n
    }
  },
  光晕动画: {
    value: [animation.value],
    onFinishChange(n: boolean) {
      animation.value = n
    }
  }
})

watch([times, color, blur], () => {
  if (animation.value) return
  draw()
})

watch(animation, (newV) => {
  if (newV) {
    stopRafLoop = rafLoop(() => {
      // console.log("动画中")
      animate(50)
    })
  } else if (stopRafLoop) {
    stopRafLoop()
    stopRafLoop = undefined
  }
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

  draw()
}

function glow(draw: () => void, options?: { color?: string, blur?: number, times?: number }) {
  let { color = randomHexColor(), blur = 8, times = 2 } = options ?? {}
  /**
   * shadowBlur 表示阴影半径。当阴影半径增加，阴影的扩散程度扩大，阴影的强烈度下降。
   * 而半径减小时，扩散程度也减小，强度增加。
   * 使用多重阴影，可以使扩散和强度都保持在较理想状态
   */

  for (let i = 0; i < times; i++) {
    ctx.shadowColor = color
    ctx.shadowBlur = blur;
    draw()
  }
  ctx.shadowColor = ""
  ctx.shadowBlur = 0
}

function draw(options?: { blur?: number }) {
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = "white"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.font = "100px Consolas"
  glow(() => {
    ctx.fillText("hello world", w / 2, h / 2)
  }, { color: color.value, times: times.value, blur: options?.blur ?? blur.value })
}

const animate = (function () {
  let blur = 1
  let flag = false
  let stepBlur = 0.2
  return (maxBlur = 20) => {
    if (blur < maxBlur && !flag) blur += stepBlur
    if (blur >= maxBlur && !flag) { flag = true }
    if (blur > 0 && flag) blur -= stepBlur
    if (blur <= 0 && flag) flag = false
    draw({ blur })
  }
})()


onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  const uninstallResize = registEvent(window, 'resize', debounce(setCanvasSize, 100))
  setCanvasSize()
  draw()

  setElement(canvas, { 'background-color': '#0d0d0d' })

  onUnmounted(() => {
    uninstallResize()
    if (stopRafLoop) stopRafLoop()
  })
})

</script>

<style scoped>
canvas {
  cursor: pointer;
}
</style>
