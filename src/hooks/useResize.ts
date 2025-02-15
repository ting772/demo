export default function (ele: HTMLElement | typeof window, resizeFn: () => void, options?: { immediate?: boolean }) {
  ele.addEventListener('resize', resizeFn)
  onUnmounted(() => {
    ele.removeEventListener('resize', resizeFn)
  })

  if (options?.immediate) {
    resizeFn()
  }
}
