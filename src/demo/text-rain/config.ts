import code from "./index.vue?raw"
import codeScene from '@/lib/canvas/scene?raw'
import codeTextRain from '@/lib/canvas/textRain?raw'
import component from "./index.vue"
import display from './display.png'

export default {
  codes: [
    {
      name: "index.vue",
      code,
      lang: "js"
    },
    {
      name: "scene.ts",
      code: codeScene,
      lang: "ts"
    },
    {
      name: "textRain.ts",
      code: codeTextRain,
      lang: "ts"
    },
  ],
  component,
  display,
  title: "文字雨",
  descriptions: ""
}
