import { fillDefaults } from '@fringeworks/utils/object/fillDefaults';
import {
  clsLayout,
  clsLayoutLimitToItems,
  clsLayoutStack,
} from '../_constants';
import applyGap from '../_internal/applyGap';
import applyItemRatio from '../_internal/applyItemRatio';
import applyItemSize from '../_internal/applyItemSize';
import mergeClassName from '../_internal/mergeClassName';
import type { CreateLayoutStyle, LayoutStyle } from '../types';
import type { StackLayoutOptions } from './types';

/**
 * stackレイアウト
 *
 * - 子要素を一列に並べて配置する
 * - 子要素ごとに指定を変える場合はstackItemを使う
 */
const stack: CreateLayoutStyle<StackLayoutOptions> = (options = {}) => {
  const {
    direction,
    alignX,
    alignY,
    adjustX,
    adjustY,
    gap,
    gapX,
    gapY,
    itemSizeX,
    itemSizeY,
    itemRatioX,
    itemRatioY,
    limitToItems,
  } = fillDefaults(options, {
    direction: 'x',
    alignX: 'left',
    alignY: 'top',
    adjustX: 'none',
    adjustY: 'none',
    gap: 0,
  });

  const result: LayoutStyle = {
    className: mergeClassName(
      clsLayoutStack,
      clsLayout.direction[direction],
      clsLayout.align.x[alignX],
      clsLayout.align.y[alignY],
      clsLayout.adjust.x[adjustX],
      clsLayout.adjust.y[adjustY],
      limitToItems ? clsLayoutLimitToItems : undefined,
    ),
    style: {},
  };

  // 間隔の適用
  applyGap(result, gap, gapX, gapY);

  // 子要素のサイズ
  // 主軸・交差軸による違いや、adjustとの組み合わせはCSS側で扱う
  applyItemSize(result, itemSizeX, itemSizeY);

  // 子要素の縦横比
  applyItemRatio(result, itemRatioX, itemRatioY);

  return result;
};
export default stack;
