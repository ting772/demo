<template>
  <div class="box">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script setup lang="ts">
import { Scene } from '@/lib/canvas/scene'
import { TextRain } from '@/lib/canvas/textRain'

const canvas = ref()

onMounted(() => {
  let parent = canvas.value.parentNode
  let { width, height } = parent.getBoundingClientRect()
  let scene = new Scene({
    width,
    height,
    canvas: canvas.value
  })

  let rain = new TextRain(scene)
  rain.start()
})

</script>

<style lang="scss" scoped>
.box,
canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
