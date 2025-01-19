<template>
  <div class="box">
    <el-checkbox v-model="blurSelf" label="模糊自身" border />
    <el-checkbox v-model="blurBackdrop" label="模糊背后" border />
    <div class="container">
      <div class="el1">
        财联社11月5日电，日本厚生劳动省公布的人口动态统计初步数据显示，2024年1月至6月出生的婴儿数量为329998人，
        较去年同期减少6.3%。预计日本今年全年出生人数或将首次低于70万。（央视新闻）
      </div>
      <div :class="el2Class">
        财联社11月5日电，德国舍弗勒集团（Schaeffler）11月5日宣布，将在欧洲裁员约4700人，其中在德国将裁员约2800个岗位。
      </div>
    </div>
  </div>
</template>
<script setup>
const blurSelf = ref(false)
const blurBackdrop = ref(false)
const el2Class = computed(() => ([
  "el2",
  {
    'blur-self': blurSelf.value,
    'blur-backdrop': blurBackdrop.value
  }
]))
</script>

<style scoped>
.box {
  padding: 20px;
}

.container {
  width: 100%;
  height: 500px;
  position: relative;
  margin-top: 20px;
}

.el1,
.el2 {
  width: 300px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 22px;
}

.el1 {
  transform: translate(-50%, -50%);
  background-color: pink;
}

.el2 {
  transform: translate(-25%, -25%);
  background-color: #fff;

  &.blur-self {
    filter: blur(2px);
  }

  &.blur-backdrop {
    backdrop-filter: blur(2px);
    background-color: transparent;
    border: 1px solid #67C23A;
  }
}
</style>
