import { varLayoutGapX, varLayoutGapY } from '../_constants';
import type { LayoutStyle } from '../types';
import unit from './unit';

/**
 * 間隔に関する設定の適用
 *
 * - コンテナー自身で使う値のため、未指定でも常に出力する（子要素がレイアウトのコンテナーでも親の値を継承させない）
 * @param result
 * @param gap 横縦共通の間隔
 * @param gapX 横方向の間隔（未指定なら`gap`）
 * @param gapY 縦方向の間隔（未指定なら`gap`）
 */
export default function applyGap(
  result: LayoutStyle,
  gap: number,
  gapX: number | undefined,
  gapY: number | undefined,
): void {
  result.style ??= {};
  result.style[varLayoutGapX] = unit(gapX ?? gap);
  result.style[varLayoutGapY] = unit(gapY ?? gap);
}
