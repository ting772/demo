/**
 * timer.value=setTimeout(fn,time)正常赋值是启动定时器，
 * timer.value=0是销毁定时器
 * 组件销毁前自动清理定时器
 * @returns
 */
export default function () {
  let timer = ref(0)

  watch(timer, (newV, oldV) => {
    if (newV == 0 && oldV > 0) {
      clearInterval(oldV)
    }
  }, { flush: 'sync' })

  onBeforeUnmount(() => {
    timer.value = 0
  })

  return timer
}
