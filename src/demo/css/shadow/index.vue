<template>
  <div>
    <el-checkbox v-model="boxShadowFlag" label="添加shadow-box" border />
    <el-checkbox v-model="roundFlag" label="round-border" border />
    <el-checkbox v-model="filterFlag" label="filter:drop-shadow" border />
    <div :class="ctClass">
      测试文本
      <div class="circle">
        测试文本2
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const boxShadowFlag = ref(false)
const roundFlag = ref(false)
const filterFlag = ref(false)
const ctClass = computed(() => ([
  'container',
  {
    'has-shadow-box': boxShadowFlag.value,
    'round-border': roundFlag.value,
    'filter': filterFlag.value
  }
]))
</script>
<style lang="scss" scoped>
.container {
  width: 500px;
  height: 300px;
  margin: 20px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(242.5, 208.5, 157.5);

  &.has-shadow-box {
    box-shadow: 10px 0 5px 10px #67C23A;
  }

  &.round-border {
    border-radius: 20px 120px;
  }

  &.filter {
    filter: drop-shadow(10px 0 5px #000000);
  }
}

.circle {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  clip-path: circle(100px);
  background-color: pink;
}
</style>
