import { clsLayoutItemRatio, varLayoutItemRatio } from '../_constants';
import type { LayoutStyle } from '../types';
import hasValue from './hasValue';
import mergeClassName from './mergeClassName';

/**
 * 子要素の縦横比に関する設定の適用
 * @param result
 * @param itemRatioX
 * @param itemRatioY
 */
export default function applyItemRatio(
  result: LayoutStyle,
  itemRatioX: number | null | undefined,
  itemRatioY: number | null | undefined,
): void {
  // 子要素の縦横比
  if (hasValue(itemRatioX) || hasValue(itemRatioY)) {
    result.className = mergeClassName(result.className, clsLayoutItemRatio);
    result.style ??= {};
    result.style[varLayoutItemRatio] =
      `${itemRatioX ?? 1} / ${itemRatioY ?? 1}`;
  }
}
