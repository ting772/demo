import code from "./index.vue?raw"
import component from './index.vue'
import particle from '@/utils/class/particle?raw'
import textParticle from '@/lib/canvas/text-particle?raw'
import display from './display.png'

export default {
  codes: [
    {
      name: "index.vue",
      code,
      lang: "js"
    },
    {
      name: "textParticle.ts",
      code: textParticle,
      lang: "ts"
    },
    {
      name: "particle.ts",
      code: particle,
      lang: "ts"
    },
  ],
  component,
  display,
  title: "文字粒子化",
  descriptions: ""
}
