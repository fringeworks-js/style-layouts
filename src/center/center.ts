import maybeDefault from '@fringeworks/utils/object/maybeDefault';
import { clsLayout, clsLayoutCenter } from '../_constants';
import applyGap from '../_internal/applyGap';
import applyItemRatio from '../_internal/applyItemRatio';
import applyItemSize from '../_internal/applyItemSize';
import mergeClassName from '../_internal/mergeClassName';
import type { CreateLayoutStyle, LayoutStyle } from '../types';
import type { CenterLayoutOptions } from './types';

/**
 * centerレイアウト
 *
 * - 子要素を中央に配置する
 * - 親要素が子要素のサイズよりも小さくなっても左上が親要素内に収まる
 */
const center: CreateLayoutStyle<CenterLayoutOptions> = (options = {}) => {
  const {
    direction,
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
      adjustX: 'none',
      adjustY: 'none',
    },
    { overwriteNull: true },
  );

  const result: LayoutStyle = {
    className: mergeClassName(
      clsLayoutCenter,
      clsLayout.direction[direction],
      clsLayout.adjust.x[adjustX],
      clsLayout.adjust.y[adjustY],
    ),
    style: {},
  };

  // 間隔の適用
  applyGap(result, gap, gapX, gapY);

  // 子要素のサイズ
  applyItemSize(result, itemSizeX, itemSizeY);

  // 子要素のアスペクト比
  applyItemRatio(result, itemRatioX, itemRatioY);

  return result;
};
export default center;
