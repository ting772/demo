import code from "./index.vue?raw"
import ball from "@/utils/class/ball.ts?raw"
import component from './index.vue'
import display from './display.png'

export default {
  codes: [
    {
      name: "index.vue",
      code,
      lang: "js"
    },
    {
      name: "ball.ts",
      code: ball,
      lang: "ts"
    },
  ],
  component,
  display,
  title: "会动的眼球",
  descriptions: ""
}
