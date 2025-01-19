import code from './index.vue?raw'
import grid from '@/lib/canvas/grid?raw'
import snake from '@/lib/canvas/snake?raw'
import component from './index.vue'

export default {
  codes: [
    {
      name: "index.vue",
      code,
      lang: 'js'
    },
    {
      name: "grid.ts",
      code: grid,
      lang: 'ts'
    },
    {
      name: "snake.ts",
      code: snake,
      lang: 'ts'
    }
  ],
  component
}
