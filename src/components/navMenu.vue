<template>
  <el-menu :default-active="activeIndex" class="menu" mode="horizontal" @select="handleSelect">
    <template v-for="item in navbar">
      <el-menu-item v-if="!item.children" :index="item.key" :disabled="item.disabled">{{ item.label }}</el-menu-item>
      <el-sub-menu v-else :index="item.key" :disabled="item.disabled">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </template>
  </el-menu>
</template>
<script setup lang="ts">

const props = defineProps<{
  navbar: NavMenuItem[]
}>()

const activeIndex = ref()

function handleSelect(v: any) {
  console.log(v)
}

</script>

<style lang="scss" scoped>
.menu {
  justify-content: flex-end;
}
</style>
