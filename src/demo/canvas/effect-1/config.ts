import code from "./index.vue?raw"
import component from './index.vue'
import particle from '@/utils/class/particle?raw'
import display from './display.png'

export default {
  codes: [
    {
      name: "index.vue",
      code,
      lang: "js"
    },
    {
      name: "particle.ts",
      code: particle,
      lang: "js"
    },
  ],
  component,
  display,
  title: "鼠标滑过小球堆的效果",
  descriptions: ""
}
