import { setupLilGui, type GuiConfig } from '@/utils/lilgui'



export default function (config: GuiConfig) {
  let ret = setupLilGui(config)

  onUnmounted(() => {
    ret.gui.destroy()
  })

  return ret
}
