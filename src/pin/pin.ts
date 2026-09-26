import { clsLayoutPin } from '../_constants';
import applyItemRatio from '../_internal/applyItemRatio';
import applyItemSize from '../_internal/applyItemSize';
import type { CreateLayoutStyle, LayoutStyle } from '../types';
import type { PinLayoutOptions } from './types';

/**
 * pinレイアウト
 *
 * - 子要素のtop,left,bottom,rightに従い配置する
 */
const pin: CreateLayoutStyle<PinLayoutOptions> = (options = {}) => {
  const { itemSizeX, itemSizeY, itemRatioX, itemRatioY } = options;
  const result: LayoutStyle = {
    className: clsLayoutPin,
    style: {},
  };

  // 子要素のサイズ
  applyItemSize(result, itemSizeX, itemSizeY);

  // 子要素の縦横比
  applyItemRatio(result, itemRatioX, itemRatioY);

  return result;
};
export default pin;
