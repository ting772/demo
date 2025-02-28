import code from "./index.vue?raw"
import component from './index.vue'
import display from './display.png'
import bfsCode from './bfs?raw'

export default {
  codes: [
    {
      name: "index.vue",
      code,
      lang: "js"
    },
    {
      name: "bfs.ts",
      code: bfsCode,
      lang: 'ts'
    }
  ],
  component,
  display,
  title: "canvas网格——广度优先搜索",
  descriptions: ""
}
