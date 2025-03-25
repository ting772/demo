<template>
  <el-input class="input" v-model="text" placeholder="输入ICON中显示的字" size="large" @keyup.enter="onEnter"></el-input>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { alignBy } from '@/utils/utils'
import { setupGrid, setElement, rafLoop } from '@thing772/utils'
import { bfsGenerator, type Index, bfs } from './bfs'
import useTimer from '@/hooks/useTimer'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

let bg = '#cbc262', color = '#fff', fontSize = 26
let radius = 10
let w = 64, h = 64
const canvasRef = ref()
let canvas, ctx
let text = ref('')

function onEnter() {
  draw()
}

useGui({
  设置背景色: {
    value: [bg],
    isColor: true,
    onChange(n: string) {
      bg = n
      draw()
    }
  },
  设置文字颜色: {
    value: [color],
    isColor: true,
    onChange(n: string) {
      color = n
      draw()
    }
  },
  设置文字大小: {
    value: [fontSize, 14, 30, 1],
    onChange(n: string) {
      fontSize = n
      draw()
    }
  },
  设置尺寸: {
    value: [w, 32, 64, 1],
    onChange(n: string) {
      w = n
      h = n
      canvas.width = w
      canvas.height = h
      draw()
    }
  },
  设置圆角: {
    value: [radius, 0, 100, 1],
    onChange(n: string) {
      radius = n
      draw()
    }
  },
  图标下载() {
    if (canvas) download(canvas)
  },
  查看源码() {
    emit("check-source")
  }
})

function download(canvas) {
  let url = canvas.toDataURL()
  let a = document.createElement('a')
  a.download = 'icon.png'
  document.body.appendChild(a)
  a.href = url
  a.click()
  document.body.removeChild(a)
}

function draw() {
  ctx.clearRect(0, 0, w, h)
  ctx.save()

  //换border-radius
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(canvas.width - radius, 0);
  ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
  ctx.lineTo(canvas.width, canvas.height - radius);
  ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
  ctx.lineTo(radius, canvas.height);
  ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();

  // 裁剪路径（这样之后的绘制只在这个路径内可见）
  ctx.clip();


  Object.assign(ctx, {
    fillStyle: bg,
  })
  ctx.fillRect(0, 0, w, h)

  Object.assign(ctx, {
    fillStyle: color,
    textAlign: 'center',
    textBaseline: 'middle',
    font: `bold ${fontSize}px aria`
  })
  ctx.fillText(text.value, w / 2, h / 2 + 2)
  ctx.restore()
}

onMounted(() => {
  canvas = canvasRef.value
  canvas.width = w
  canvas.height = h
  ctx = canvas.getContext('2d')
  draw()
})

</script>
<style scoped>
canvas {
  position: absolute;
  top: 50%;
  left: 50%;
}

.input {
  position: fixed;
  left: 50%;
  top: 20%;
  width: 500px;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px 5px #409EFF;
}
</style>
