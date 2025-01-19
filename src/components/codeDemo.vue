<template>
  <div class="container">
    <div class="code-side">
      <el-tabs type="border-card">
        <el-tab-pane :label="item.name" v-for="item in codes" :key="item.name" lazy>
          <high-light :code="item.code" :lang="item.lang" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="display-side">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import HighLight from './hilight.vue'

const props = defineProps<{
  codes: { name: string, code: string, lang: string; }[];//代码
}>()

</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  overflow-y: auto;
}

.code-side {
  width: 800px;
  flex: none;
}

.display-side {
  flex: 1;
  height: 100%;
  min-width: 1000px;
  overflow: auto;
}

:deep(.el-tabs) {
  width: 100%;
  height: calc(100% - 4px);
}

:deep(.el-tabs__content) {
  padding: 0;
  overflow: auto;
}

:deep(.el-tab-pane) {
  height: 100%;
}
</style>
