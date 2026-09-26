import {
  clsLayoutItemCountX,
  clsLayoutItemCountY,
  varLayoutItemCountX,
  varLayoutItemCountY,
} from '../_constants';
import type { LayoutStyle } from '../types';
import hasValue from './hasValue';
import mergeClassName from './mergeClassName';

export default function applyItemCount(
  result: LayoutStyle,
  itemCountX: number | null | undefined,
  itemCountY: number | null | undefined,
): void {
  if (hasValue(itemCountX)) {
    result.className = mergeClassName(result.className, clsLayoutItemCountX);
    result.style ??= {};
    result.style[varLayoutItemCountX] = `${itemCountX}`;
  }
  if (hasValue(itemCountY)) {
    result.className = mergeClassName(result.className, clsLayoutItemCountY);
    result.style ??= {};
    result.style[varLayoutItemCountY] = `${itemCountY}`;
  }
}
