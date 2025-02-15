
import type { RouteRecordRaw } from "vue-router"

type Config = {
  [path: string]: {
    codes: { name: string, code: string, lang: string }[];
    component: RouteRecordRaw['component'];
    routeName?: string;//路由解析时添加进来
    display: string;//首页demo展示图片
    title: string;//首页展示标题
    descriptions: string;//首页展示描述
  }
}

let demoConfig: Config

export function getDemoConfig() {
  if (demoConfig) return demoConfig

  demoConfig = import.meta.glob('./demo/**/config.ts', {
    import: 'default',
    eager: true,
  }) as Config

  return demoConfig
}
