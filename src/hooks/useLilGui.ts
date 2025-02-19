import { setupLilGui, type GuiConfig } from '@thing772/utils'



export default function (config: GuiConfig) {
  if (!config.title) {
    let title = useRoute().meta.title as string
    if (title) config.title = title
  }
  let ret = setupLilGui(config)

  onUnmounted(() => {
    ret.gui.destroy()
  })

  return ret
}
