<template>
  <div class="common-layout">
    <el-container class="container">
      <el-main class="main">
        <el-row class="row" :gutter="20">
          <el-col v-for="item in configs" :key="item.routeName" :span="4">
            <el-card class="demo-card" :body-style="{ padding: '0px' }" shadow="always"
              @click="$router.push({ name: item.routeName })">
              <el-image class="image" :src="item.display" fit="cover" />
              <template #footer>
                <el-text tag="p">{{ item.title }}</el-text>
                <el-text tag="p" :line-clamp="2">{{ item.descriptions || '暂无描述' }}</el-text>
              </template>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { getDemoConfig } from '@/loadDemo'
let configs = Object.values(getDemoConfig())
console.log(configs)
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

.row {
  gap: 20px 0;
}

.demo-card {
  width: 100%;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  .image {
    width: 100%;
    height: 200px;
  }
}
</style>
