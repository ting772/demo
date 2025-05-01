import { setupLilGui, type GuiConfig } from '@thing772/utils'



export default function (config: GuiConfig) {
  if (!config.title) {
    const title = useRoute().meta.title as string
    if (title) config.title = title
  }
  const ret = setupLilGui(config)

  onUnmounted(() => {
    ret.gui.destroy()
  })

  return ret
}
