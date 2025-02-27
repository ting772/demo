<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { registEvent } from '@thing772/utils'
import { Noise, type NoiseType } from 'noisejs'
import { debounce } from 'lodash-es'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let w = innerWidth, h = innerHeight
let ctx: CanvasRenderingContext2D
let scaleX = ref(0.01), scaleY = ref(0.01), scaleV = ref(1)
let noise = shallowRef(new Noise(Math.random()))


let algorithm = ref<NoiseType>('simplex2')

let renderNoise = () => {
  let image = ctx.getImageData(0, 0, w, h)

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let v = ~~Math.min(255, (Math.abs(noise.value[algorithm.value](x * scaleX.value, y * scaleY.value)) * scaleV.value * 256))
      image.data[(y * w + x) * 4 + 0] = v
      image.data[(y * w + x) * 4 + 1] = v
      image.data[(y * w + x) * 4 + 2] = v
      image.data[(y * w + x) * 4 + 3] = 255
    }
  }

  ctx.putImageData(image, 0, 0)
}

useGui({
  噪声生成算法: {
    value: [algorithm.value, ['simplex2', 'perlin2'] as const],
    onFinishChange(name: NoiseType) {
      algorithm.value = name
    }
  },
  x方向缩放因子: {
    value: [scaleX.value, 0.001, 0.5, 0.001],
    onFinishChange(n: number) {
      scaleX.value = n
    }
  },
  y方向缩放因子: {
    value: [scaleY.value, 0.001, 0.5, 0.001],
    onFinishChange(n: number) {
      scaleY.value = n
    }
  },
  值放缩因子: {
    value: [scaleV.value, 0.01, 255, 0.1],
    onFinishChange(n: number) {
      scaleV.value = n
    }
  },
  重新生成随机种子() {
    noise.value = new Noise(Math.random())
  },
  查看源码() {
    emit("check-source")
  }
})

const canvasRef = ref()

onMounted(() => {
  const canvas = canvasRef.value
  canvas.width = w
  canvas.height = h
  ctx = canvas.getContext('2d', { willReadFrequently: true })!

  const unistall = registEvent(window, 'resize', debounce(() => {
    w = ~~(innerWidth / 1)
    h = ~~(innerHeight / 1)
    canvas.width = w
    canvas.height = h
    renderNoise()
  }, 100))

  let stopWatch = watchEffect(renderNoise)

  onUnmounted(() => {
    unistall()
    stopWatch()
  })
})
</script>
