<template>
  <div class="common-layout">
    <el-container class="container">
      <!-- <el-header>
        <Nav :navbar="navbar"></Nav>
      </el-header> -->
      <el-main class="main">
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Nav from '@/components/navMenu.vue'

const navbar = ref([
  {
    label: "Demo",
    key: 'demo',
    handle: () => { console.log(1) }
  }
])


</script>

<style lang="scss" scoped>
.common-layout {
  width: 100vw;
  height: 100vh;
}

.container {
  width: 100%;
  height: 100%;
}

.main {
  flex: 1;
}
</style>
