<template>
  <div class="box">
    <p>
      <el-button type="primary" :disabled="timer != 0" @click="getNumbers">生成随机数</el-button>
      <el-button type="success" :disabled="!it || timer != 0" @click="next">排序下一步</el-button>
      <el-button type="success" @click="autoStart">自动开始</el-button>
    </p>
    <p>
      <el-select v-model="algorithm" placeholder="选择算法" size="large" style="width: 240px" :disabled="timer != 0">
        <el-option v-for="item in algorithms" :key="item.label" :label="item.label" :value="item.value" />
      </el-select>

      <el-input-number v-model="count" :step="1" size="large" />
    </p>
    <div ref="node"></div>
  </div>
</template>

<script setup lang="ts">
import { vertBarChart } from '@/lib/d3/vertBarChar'
import { generateRandomIntArray } from '@/utils/utils'
import bubble from '@/lib/algorithm/sort/bubble'
import selection from '@/lib/algorithm/sort/selection'
import insertion from '@/lib/algorithm/sort/insertion'
import merge from '@/lib/algorithm/sort/merge'

const node = ref()
const algorithms = [
  {
    label: "冒泡排序",
    value: bubble
  },
  {
    label: "选择排序",
    value: selection
  },
  {
    label: "插入排序",
    value: insertion
  },
  {
    label: "归并排序",
    value: merge
  },
]
const algorithm = ref(algorithms[0].value)

let handle: ReturnType<typeof vertBarChart<Obj>> | null

interface Obj {
  id: number;
  value: number;
}

//排序算法生成器
type Generator = (arr: Obj[], selector: (obj: Obj) => number) => { next: Function }

let width = 700, height = 400
let sortDone = false
let count = ref(20)
let arr = shallowRef<Obj[]>([])
let it = shallowRef<ReturnType<Generator>>()//算法步骤迭代器

/**
 * 1.生成随机正整数。
 * 2.随机数数组传入排序算法生成器，获得算法步骤迭代器。
 */
function getNumbers() {
  //生成30个，0-1000的正整数
  arr.value = generateRandomIntArray(count.value).map((n, index: number) => ({
    id: index,
    value: n
  }))
  sortDone = false
  it.value = algorithm.value(arr.value, (obj: Obj) => obj.value)
}

//下一步迭代
function next() {
  let { value, done } = it.value!.next()
  sortDone = done
  if (done) {
    ElMessage({
      showClose: true,
      message: '已经排序完毕',
      type: 'success',
      grouping: true,
    })
    return
  } else {
    arr.value = value
  }
}

let timer = ref(0)

//生成随机整数数组并开始迭代
function autoStart() {
  if (timer.value == 0) {
    //没有开始或者已经结束排序
    if (!it.value || sortDone) {
      getNumbers()
    }
    timer.value = setInterval(() => {
      if (sortDone) {
        clearTimer()
        return
      }
      next()
    }, 50)
  }
}

function clearTimer() {
  clearInterval(timer.value)
  timer.value = 0
}


//数组更新，更新视图|或者清空画布
watch(() => arr.value, (arr) => {
  if (arr.length > 0) {
    //初始图表
    if (!handle) {
      handle = vertBarChart<Obj>({
        width,
        height,
        getX: (obj: Obj) => obj.id,
        getY: (obj: Obj) => obj.value
      })
      node.value.appendChild(handle!.svg)
    }

    //更新图表数据
    handle.update(arr)
  } else if (handle) {
    node.value.removeChild(handle.svg)
    handle = null
  }
})

onUnmounted(() => {
  if (timer.value != 0) {
    clearInterval(timer.value)
  }
})

onMounted(() => {
  getNumbers()
})
</script>

<style scoped lang="scss">
.box {
  padding: 20px;
}
</style>
