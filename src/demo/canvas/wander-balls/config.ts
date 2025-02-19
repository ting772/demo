import code from "./index.vue?raw"
import wanderBalls from "@/lib/canvas/wander-balls?raw"
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
      name: "wander-balls.ts",
      code: wanderBalls,
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
  title: "矩形区域内飘荡的小球",
  descriptions: ""
}
