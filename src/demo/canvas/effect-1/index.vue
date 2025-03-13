<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup lang="ts">
import useGui from '@/hooks/useLilGui'
import { registEvent, isPointInCycle, rafLoop, setElement, ptOffset, distance, randomBetween } from '@thing772/utils'
import { alignBy, movePtWithDirection } from '@/utils/utils'
import { Particle } from '@/utils/class/particle'
import { throttle } from 'lodash-es'

const emit = defineEmits<{
  (e: 'check-source'): void
}>()

type ExtendParticle = Particle & { originPos: { x: number; y: number; } }
let nRow = 20, nCol = 30, r = 10, gridSize = 20, w = 0, h = 0
let gapX = 25, gapY = 25, ballColor = '#53e953'
let particles: ExtendParticle[] = [], ctx: CanvasRenderingContext2D
let scopeR = 50

function createParticles() {
  particles = []

  for (let y = 0; y < nRow; y++) {
    for (let x = 0; x < nCol; x++) {
      let posX = -1 * (nCol - 1 - x) * gapY + w / 2 + (nCol - 1) * gapY / 2
      let posY = -1 * (nRow - 1 - y) * gapX + h / 2 + (nRow - 1) * gapX / 2
      let p = new Particle({
        x: posX,
        y: posY,
        tx: posX,
        ty: posY,
        r,
        fx: randomBetween(0.01, 0.5, false),
        fy: randomBetween(0.01, 0.5, false),
        color: ballColor
      }) as ExtendParticle
      p.originPos = {
        x: posX,
        y: posY
      }
      particles.push(p)
    }
  }
}

function updateParticles(props: object) {
  particles.forEach(particle => {
    Object.assign(particle, props)
  })
}

useGui({
  球阵列行数: {
    value: [nRow, 1, 50, 1],
    onFinishChange(n: number) {
      nRow = n
      createParticles()
    }
  },
  球阵列列数: {
    value: [nCol, 1, 50, 1],
    onFinishChange(n: number) {
      nCol = n
      createParticles()
    }
  },
  球阵列列间距: {
    value: [gapY, 6, 50, 2],
    onFinishChange(n: number) {
      gapY = n
      createParticles()
    }
  },
  球阵列行间距: {
    value: [gapX, 6, 50, 2],
    onFinishChange(n: number) {
      gapX = n
      createParticles()
    }
  },
  影响半径: {
    value: [scopeR, 10, 500, 1],
    onFinishChange(n: number) {
      scopeR = n
      createParticles()
    }
  },
  小球半径: {
    value: [r, 4, 100, 1],
    onFinishChange(n: number) {
      r = n
      updateParticles({ r })
      calc()
    }
  },
  球颜色: {
    value: [ballColor],
    isColor: true,
    onFinishChange(color: string) {
      ballColor = color
      updateParticles({ color })
    }
  },
  查看源码() {
    emit("check-source")
  }
})

const canvasRef = ref()

const updateView = () => {
  w = alignBy(innerWidth, gridSize)
  h = alignBy(innerHeight, gridSize)
  Object.assign(canvasRef.value, {
    width: w,
    height: h
  })
}

let pt: { x: number; y: number }
const calc = () => {
  if (pt) {
    for (let particle of particles) {
      let { originPos } = particle
      if (isPointInCycle(pt, scopeR, originPos)) {
        let ri = scopeR - distance(pt, originPos)
        let targetPos = movePtWithDirection(originPos, ptOffset(pt, originPos), ri * (ri / scopeR))
        Object.assign(particle, {
          tx: targetPos.x,
          ty: targetPos.y,
          done: false
        })
      } else {
        Object.assign(particle, {
          tx: originPos.x,
          ty: originPos.y,
          done: false
        })
      }
    }
  }
}

onMounted(() => {
  let canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  const uninstallResize = registEvent(window, 'resize', throttle(() => {
    updateView()
    createParticles()
  }, 100), { immediate: true })

  const uninstallMove = registEvent(canvas, 'mousemove', (e: unknown) => {
    let { offsetX, offsetY } = e as MouseEvent
    if (!pt) pt = { x: offsetX, y: offsetY }
    else {
      pt.x = offsetX
      pt.y = offsetY
    }
    calc()
  })

  setElement(canvas, { 'background-color': '#0d0d0d' })
  createParticles()

  const stopAni = rafLoop(() => {
    ctx.clearRect(0, 0, w, h)
    for (let particle of particles) {
      particle.update()
      particle.render(ctx)
    }
  })

  onUnmounted(() => {
    uninstallResize()
    stopAni()
    uninstallMove()
  })
})
</script>

<style scoped>
canvas {
  cursor: pointer;
}
</style>
