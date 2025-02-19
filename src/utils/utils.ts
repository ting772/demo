import { loopNGetResult } from '@thing772/utils'
export { randIndex, randArr, generateRandomIntArray, randomInt } from './rand'
export { arrayChunk, swapArrayItem } from './array'

export function isDef(obj: any) { return obj != undefined }
export function isFunc(obj: any) { return typeof obj === 'function' }
export function identity(x: any) { return x }

/**
 * 返回一个可重复利用元素的数组
 * @param createFn 元素工厂函数
 * @returns (n:number)=>元素[], 传入需要元素的数量，如果不够则会调用元素工厂函数
 */
export function reusableArray<T>(createFn: () => T) {
  let arr = [] as T[]

  function get(count: number) {
    let diff = count - arr.length
    if (diff > 0) {
      arr.push(...loopNGetResult(createFn, diff))
    } else if (diff < 0) {
      arr = arr.slice(0, diff)
    }

    return arr
  }

  //用于更新已有元素
  get.update = function (cb: (item: T) => void) {
    arr.forEach(item => cb(item))
  }

  return get
}
