import code from "./index.vue?raw"
import drawPriceCode from '@/lib/draw-price?raw'
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
      name: 'draw-price.ts',
      code: drawPriceCode,
      lang: 'ts'
    }
  ],
  component,
  display,
  title: "抽奖",
  descriptions: ""
}
