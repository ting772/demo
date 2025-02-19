import code from "./index.vue?raw"
import audioWave from "@/lib/canvas/audio-wave?raw"
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
      name: "audio-wave",
      code: audioWave,
      lang: "ts"
    },
  ],
  component,
  display,
  title: "音频波形",
  descriptions: ""
}
