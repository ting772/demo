import code from "./index.vue?raw"
import fallingBalls from "@/lib/canvas/falling-balls?raw"
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
      name: "falling-balls.ts",
      code: fallingBalls,
      lang: "ts"
    },
    {
      name: "ball.ts",
      code: ball,
      lang: "ts"
    },
  ],
  component,
  display,
  title: "下落的小球",
  descriptions: ""
}
