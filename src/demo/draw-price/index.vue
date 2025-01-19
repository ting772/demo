<template>
  <div class="box">
    <div>
      <el-button type="primary" @click="startWander">巡航</el-button>
      <el-button type="primary" @click="stop">停止</el-button>
      <el-button type="primary" @click="mock">模拟接口返回预制数据</el-button>
    </div>
    <el-card class="card" shadow="always">
      <el-form :model="form">
        <el-form-item label="设定巡航速度">
          <el-select placeholder="选择速度值，越大越快" v-model="form.speed" style="width:150px;">
            <el-option v-for="n in 10" :value="n">{{ n }}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设定最终选中项索引">
          <el-input placeholder="输入抽奖选中项索引" v-model.number="form.targetIndex" style="width:150px;" />
        </el-form-item>
        <el-form-item label="轮转次数">
          <el-input placeholder="输入抽奖轮转次数" v-model.number="form.loopTimes" style="width:150px;" />
        </el-form-item>
        <el-form-item label="旋转方向">
          <el-switch v-model="form.direction" active-text="正向" inactive-text="反向" :active-value="DIRECTION.NORMAL"
            :inactive-value="DIRECTION.REVERSE" />
        </el-form-item>
      </el-form>
      <el-button style="margin-left:20px;margin-left: auto;" type="primary" @click="startDraw">抽奖</el-button>
    </el-card>
    <el-card class="demo-card" shadow="always">
      <div style="display:flex;">
        <div :class="['block', selectedIndex == index ? 'selected' : '']" v-for="(,index) in arr">{{ index }}</div>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { drawPrice, DIRECTION } from '@/lib/draw-price.ts'
import { randIndex } from '@/utils/utils'

const arr = [...Array(10)]
const form = reactive({
  targetIndex: 2,
  loopTimes: 2,
  direction: DIRECTION.NORMAL,
  speed: 5
})
const selectedIndex = ref(1)
const { wander, stop, draw } = drawPrice(arr, {
  speed: form.speed,
  startIndex: selectedIndex.value,
  onProcessing: (index: number) => {
    selectedIndex.value = index
  },
  onDone(index: number) {
    ElMessage({
      showClose: true,
      message: '已经抽奖完毕',
      type: 'success',
      grouping: true,
    })
    selectedIndex.value = index
  }
})

function startWander() {
  wander({ ...form })
}

function startDraw() {
  draw({ ...form })
}

function mock() {
  startWander()
  setTimeout(() => {
    form.targetIndex = randIndex(arr)
    startDraw()
  }, 2500)
}

</script>
<style scoped lang="scss">
.box {
  padding: 20px;
}

.card {
  width: 480px;
  margin: 20px 0;
}

.block {
  width: 50px;
  height: 50px;
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E6E8EB;

  &.selected {
    color: #fff;
    background-color: #F56C6C;
  }
}
</style>
