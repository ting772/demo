<template>
  <div class="container">
    <slot :check-source="source"></slot>
  </div>
  <el-dialog v-model="open" title="" width="50vw" top="50px">
    <el-tabs type="border-card">
      <el-tab-pane :label="item.name" v-for="item in codes" :key="item.name" lazy>
        <high-light :code="item.code" :lang="item.lang" />
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="open = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import HighLight from './hilight.vue'

defineProps<{
  codes: { name: string, code: string, lang: string; }[];//代码
}>()

const open = ref(false)

function source() {
  open.value = true
}

</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}

.el-tabs {
  height: calc(100vh - 200px);
}

:deep(.el-tabs__content) {
  overflow: auto;
  padding: 0;
}
</style>
