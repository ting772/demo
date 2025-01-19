import type { RouteRecordRaw } from "vue-router"
import { h } from 'vue'
import CodeDemo from '@/components/codeDemo.vue'

let routes = [] as RouteRecordRaw[]

type Config = {
  [path: string]: {
    codes: { name: string, code: string, lang: string }[],
    component: RouteRecordRaw['component']
  }
}

function autoLoad() {
  const configs = import.meta.glob('../demo/**/config.ts', {
    import: 'default',
    eager: true,
  }) as Config

  let entries = Object.entries(configs)
  for (let [path, { codes, component }] of entries) {
    let c = function demo() {
      return h(
        CodeDemo,
        {
          codes,
        },
        () => h(component!)
      )
    } as any
    c.displayName = `Demo(${path})`
    routes.push({
      /**
       * 路径生成
       * 1级目录 如 demo/dir1生成路径dir1
       * 多级目录如 demo/dir1/sub1则生成 dir1-sub1
       */
      path: path.replace(/\.\.\/demo\//, '').replace('/config\.ts', '').split('/').join('-'),
      component: c
    })
  }
}

autoLoad()

export default {
  path: '/demo',
  children: routes
}
