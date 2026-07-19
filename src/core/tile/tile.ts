import maybeDefault from '@niche-works/utils/object/maybeDefault';
import { clsLayout, clsLayoutTile } from '../_constants';
import applyGap from '../_internal/applyGap';
import applyItemRatio from '../_internal/applyItemRatio';
import applyItemSize from '../_internal/applyItemSize';
import mergeClassName from '../_internal/mergeClassName';
import type { CreateLayoutStyle, LayoutStyle } from '../types';
import type { TileLayoutOptions } from './types';

/**
 * tileレイアウト
 *
 * - 子要素の高さ・幅を基準にして格子状に並べる
 * - 親要素のサイズが子要素に依存していないことを前提とする
 */
const tile: CreateLayoutStyle<TileLayoutOptions> = (options = {}) => {
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
  } = maybeDefault(
    options,
    {
      direction: 'x',
      alignX: 'left',
      alignY: 'top',
      adjustX: 'none',
      adjustY: 'none',
    },
    { overwriteNull: true },
  );

  const result: LayoutStyle = {
    className: mergeClassName(
      clsLayoutTile,
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
  applyItemSize(result, itemSizeX, itemSizeY);

  // 子要素の縦横比
  applyItemRatio(result, itemRatioX, itemRatioY);

  return result;
};
export default tile;
