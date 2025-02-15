import type { RouteRecordRaw } from "vue-router"
import { h } from 'vue'
import CodeDemo from '@/components/codeDemo.vue'
import { getDemoConfig } from '@/loadDemo'

let routes = [] as RouteRecordRaw[]

function autoLoad() {
  const config = getDemoConfig()

  for (let path in config) {
    let { codes, component } = config[path]
    let c = function demo() {
      return h(
        CodeDemo,
        //@ts-ignore
        { codes },
        ({ checkSource }: { checkSource: Function }) => {
          return h(
            component!,
            {
              onCheckSource: () => {
                checkSource()
              }
            },
          )
        }
      )
    } as any
    c.displayName = `Demo(${path})`
    let routePath = path.replace(/.*\/demo\//, '').replace('/config\.ts', '').split('/').join('-')
    config[path].routeName = routePath
    routes.push({
      /**
       * 路径生成
       * 1级目录 如 demo/dir1生成路径dir1
       * 多级目录如 demo/dir1/sub1则生成 dir1-sub1
       */
      path: routePath,
      name: routePath,
      component: c
    })
  }
}

autoLoad()

export default {
  path: '/demo',
  children: routes
}
