<template>
  <div class="box">
    <p class="header">
      <el-button class="start-btn" :disabled="!end" type="primary" @click="restart">重新开始</el-button>
      <el-text type="success" size="large">分数：{{ score }}</el-text>
    </p>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Grid } from '@/lib/canvas/grid'
import { SnakeGame } from '@/lib/canvas/snake'
const canvasRef = ref()
const end = ref(false)
const score = ref(0)
let restart = () => { }

onMounted(() => {
  const canvas = canvasRef.value

  const grid = new Grid({
    canvas,
    width: 800,
    height: 400,
    gridSize: 10,
    // background: '#f00',
  })

  const game = new SnakeGame({
    grid,
    speed: 4,
    onStart() {
      score.value = 0
      end.value = false
    },
    onEat() {
      score.value++
    },
    onEnd() {
      end.value = true
    }
  })
  game.start()

  restart = () => {
    game.restart()
  }
})

</script>

<style scoped lang="scss">
.box {
  padding: 20px;
}

.header {
  display: flex;
}

.start-btn {
  margin-right: 20px;
}
</style>
