import { fillDefaults } from '@fringeworks/utils/object/fillDefaults';
import { clsLayout, clsLayoutFlow } from '../_constants';
import applyGap from '../_internal/applyGap';
import applyItemRatio from '../_internal/applyItemRatio';
import applyItemSize from '../_internal/applyItemSize';
import mergeClassName from '../_internal/mergeClassName';
import type { CreateLayoutStyle, LayoutStyle } from '../types';
import type { FlowLayoutOptions } from './types';

/**
 * flowレイアウト
 *
 * - 子要素を並べて配置し、親要素のサイズに達したら折り返す
 * - stackとの違いは flex-wrap: wrap が常に有効な点
 */
const flow: CreateLayoutStyle<FlowLayoutOptions> = (options = {}) => {
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
      clsLayoutFlow,
      clsLayout.direction[direction],
      clsLayout.align.x[alignX],
      clsLayout.align.y[alignY],
      clsLayout.adjust.x[adjustX],
      clsLayout.adjust.y[adjustY],
    ),
    style: {},
  };

  // 間隔の適用
  applyGap(result, gap, gapX, gapY);

  // 子要素のサイズ
  // 交差軸のadjustは折り返しと両立しないため、CSS側でスタイルを当てない
  applyItemSize(result, itemSizeX, itemSizeY);

  // 子要素の縦横比
  applyItemRatio(result, itemRatioX, itemRatioY);

  return result;
};
export default flow;
