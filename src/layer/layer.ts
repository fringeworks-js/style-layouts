import maybeDefault from '@fringeworks/utils/object/maybeDefault';
import { clsLayout, clsLayoutLayer } from '../_constants';
import applyItemRatio from '../_internal/applyItemRatio';
import applyItemSize from '../_internal/applyItemSize';
import mergeClassName from '../_internal/mergeClassName';
import type { CreateLayoutStyle, LayoutStyle } from '../types';
import type { LayerLayoutOptions } from './types';

/**
 * layerレイアウト
 *
 * - 子要素を重ねて配置する
 * - alignX / alignY で重なる位置を制御する
 * - 子要素の重なり順はDOM順に従う
 */
const layer: CreateLayoutStyle<LayerLayoutOptions> = (options = {}) => {
  const {
    alignX,
    alignY,
    adjustX,
    adjustY,
    itemSizeX,
    itemSizeY,
    itemRatioX,
    itemRatioY,
  } = maybeDefault(
    options,
    {
      alignX: 'left',
      alignY: 'top',
      adjustX: 'none',
      adjustY: 'none',
    },
    { overwriteNull: true },
  );

  const result: LayoutStyle = {
    className: mergeClassName(
      clsLayoutLayer,
      clsLayout.align.x[alignX],
      clsLayout.align.y[alignY],
      clsLayout.adjust.x[adjustX],
      clsLayout.adjust.y[adjustY],
    ),
    style: {},
  };

  // 子要素のサイズ
  applyItemSize(result, itemSizeX, itemSizeY);

  // 子要素のアスペクト比
  applyItemRatio(result, itemRatioX, itemRatioY);

  return result;
};
export default layer;
