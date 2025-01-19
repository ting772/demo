//查看 https://easings.net/

export function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

export function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}