/**
 * 将arr按chunkSize个一组并存入一个数组中，返回最终的新数组
 * @param arr 待分组数组
 * @param chunkSize 每个分组的元素数量
 * @returns Array[]
 */
export function arrayChunk(arr: unknown[], chunkSize: number) {
  return arr.reduce((res: unknown[], item, index) => {
    if (index % chunkSize == 0) {
      res.push(arr.slice(index, index + chunkSize))
    }
    return res
  }, [])
}

/**
 * 交换数组中index1和index2处的元素
 * @param arr 数组
 * @param index1 索引
 * @param index2 索引
 */
export function swapArrayItem(arr: unknown[], index1: number, index2: number) {
  let temp = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = temp
}

