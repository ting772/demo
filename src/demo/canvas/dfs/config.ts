import code from "./index.vue?raw"
import component from './index.vue'
import display from './display.png'
import dfsCode from './dfs?raw'

export default {
  codes: [
    {
      name: "index.vue",
      code,
      lang: "js"
    },
    {
      name: "dfs.ts",
      code: dfsCode,
      lang: 'ts'
    }
  ],
  component,
  display,
  title: "canvas网格——深度优先搜索",
  descriptions: ""
}
