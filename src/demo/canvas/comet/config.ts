import code from "./index.vue?raw"
import component from './index.vue'
import core from '@/utils/class/comet?raw'
import display from './display.png'

export default {
  codes: [
    {
      name: "index.vue",
      code,
      lang: "js"
    },
    {
      name: "comet.ts",
      code: core,
      lang: "js"
    },
  ],
  component,
  display,
  title: "点击烟花效果",
  descriptions: ""
}
