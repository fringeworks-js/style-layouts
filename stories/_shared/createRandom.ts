/**
 * シード付きの乱数生成関数を作る（mulberry32）
 *
 * 同じシードからは常に同じ数列を返すため、レンダリングのたびに結果が変わらない。
 * `Math.random()`と違い純粋なので、React Compilerの制約にも抵触しない。
 * @param seed シード
 * @returns 0以上scale未満の整数を返す関数
 */
export default function createRandom(seed: number) {
  let state = seed >>> 0;
  return (scale: number): number => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    const value = ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    return Math.floor(value * scale);
  };
}
