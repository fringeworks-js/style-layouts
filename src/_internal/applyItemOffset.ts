import {
  clsLayoutItemOffsetX,
  clsLayoutItemOffsetY,
  clsLayoutItemOffsetZ,
  varLayoutItemOffsetX,
  varLayoutItemOffsetY,
  varLayoutItemOffsetZ,
} from '../_constants';
import type { LayoutStyle } from '../types';
import hasValue from './hasValue';
import mergeClassName from './mergeClassName';
import unit from './unit';

/**
 * 子要素のオフセットに関する設定の適用
 * @param result
 * @param itemOffsetX 横方向のオフセット（数値はpx）
 * @param itemOffsetY 縦方向のオフセット（数値はpx）
 * @param itemOffsetZ 重なり順
 */
export default function applyItemOffset(
  result: LayoutStyle,
  itemOffsetX: number | string | undefined,
  itemOffsetY: number | string | undefined,
  itemOffsetZ: number | undefined,
): void {
  for (const [value, cls, name] of [
    [itemOffsetX, clsLayoutItemOffsetX, varLayoutItemOffsetX],
    [itemOffsetY, clsLayoutItemOffsetY, varLayoutItemOffsetY],
  ] as const) {
    if (hasValue(value)) {
      result.className = mergeClassName(result.className, cls);
      result.style ??= {};
      result.style[name] = unit(value);
    }
  }
  if (hasValue(itemOffsetZ)) {
    result.className = mergeClassName(result.className, clsLayoutItemOffsetZ);
    result.style ??= {};
    result.style[varLayoutItemOffsetZ] = `${itemOffsetZ}`;
  }
}
