
type noise2d = (x: number, y: number) => number;

declare module 'noisejs' {
  export class Noise {
    constructor(seed: number);
    simplex2: noise2d;
    perlin2: noise2d;
  }

  export type NoiseType = keyof Noise
}
