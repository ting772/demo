import code from "./index.vue?raw"
import component from "./index.vue"
import bubble from '@/lib/algorithm/sort/bubble?raw'
import selection from '@/lib/algorithm/sort/selection?raw'
import insertion from '@/lib/algorithm/sort/insertion?raw'
import merge from '@/lib/algorithm/sort/merge?raw'
import display from './display.png'

export default {
  codes: [
    {
      name: "index.vue",
      code,
      lang: "js"
    },
    {
      name: "bubble.ts",
      code: bubble,
      lang: "ts"
    },
    {
      name: "selection.ts",
      code: selection,
      lang: "ts"
    },
    {
      name: "insertion.ts",
      code: insertion,
      lang: "ts"
    },
    {
      name: "merge.ts",
      code: merge,
      lang: "ts"
    },
  ],
  component,
  display,
  title: "排序算法可视化",
  descriptions: ""
}
