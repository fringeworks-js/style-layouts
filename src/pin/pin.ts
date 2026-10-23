import { fillDefaults } from '@fringeworks/utils/object/fillDefaults';
import { clsLayout, clsLayoutLimitToItems, clsLayoutPin } from '../_constants';
import applyItemOffset from '../_internal/applyItemOffset';
import applyItemRatio from '../_internal/applyItemRatio';
import applyItemSize from '../_internal/applyItemSize';
import mergeClassName from '../_internal/mergeClassName';
import type { CreateLayoutStyle, LayoutStyle } from '../types';
import type { PinLayoutOptions } from './types';

/**
 * pinレイアウト
 *
 * - 子要素を、alignX / alignYで選んだ辺からのオフセットで配置する
 * - オフセットを指定しない場合は、子要素のtop,left,bottom,rightに従い配置する
 */
const pin: CreateLayoutStyle<PinLayoutOptions> = (options = {}) => {
  const {
    alignX,
    alignY,
    itemOffsetX,
    itemOffsetY,
    itemOffsetZ,
    itemSizeX,
    itemSizeY,
    itemRatioX,
    itemRatioY,
    limitToItems,
  } = fillDefaults(options, { alignX: 'left', alignY: 'top' });
  const result: LayoutStyle = {
    className: mergeClassName(
      clsLayoutPin,
      clsLayout.align.x[alignX],
      clsLayout.align.y[alignY],
      limitToItems ? clsLayoutLimitToItems : undefined,
    ),
    style: {},
  };

  // 子要素のオフセット
  applyItemOffset(result, itemOffsetX, itemOffsetY, itemOffsetZ);

  // 子要素のサイズ
  applyItemSize(result, itemSizeX, itemSizeY);

  // 子要素の縦横比
  applyItemRatio(result, itemRatioX, itemRatioY);

  return result;
};
export default pin;
