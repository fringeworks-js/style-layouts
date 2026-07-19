import {
  clsLayoutItemSizeX,
  clsLayoutItemSizeY,
  varLayoutItemSizeX,
  varLayoutItemSizeY,
} from '../_constants';
import type { LayoutStyle } from '../types';
import hasValue from './hasValue';
import mergeClassName from './mergeClassName';
import unit from './unit';

export default function applyItemSize(
  result: LayoutStyle,
  itemSizeX: number | null | undefined,
  itemSizeY: number | null | undefined,
): void {
  if (hasValue(itemSizeX)) {
    result.className = mergeClassName(result.className, clsLayoutItemSizeX);
    result.style ??= {};
    result.style[varLayoutItemSizeX] = unit(itemSizeX);
  }
  if (hasValue(itemSizeY)) {
    result.className = mergeClassName(result.className, clsLayoutItemSizeY);
    result.style ??= {};
    result.style[varLayoutItemSizeY] = unit(itemSizeY);
  }
}
