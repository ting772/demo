
export function randIndex(arr: any[]) {
  return Math.floor(Math.random() * arr.length)
}

export function randArr<K = unknown>(arr: K[]) {
  return arr[randIndex(arr)]
}

/**
 * 生成一个数组并返回，该数组元素都是随机正整数[1,max]
 * @param count 数组元素个数
 * @param max 数组元素最大值（包含）
 * @returns number[]
 */
export function generateRandomIntArray(count: number, max: number = 1000) {
  let ret = [] as number[]
  for (let i = 0; i < count; i++) {
    ret.push(randomInt(max))
  }
  return ret
}


export function randomInt(max: number = 1000) {
  return Math.ceil(Math.random() * max)
}
