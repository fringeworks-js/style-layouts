import { clsLayoutLayerItem } from '../_constants';
import createItemStyle from '../_internal/createItemStyle';
import type { LayoutStyle } from '../types';
import type { LayerItemOptions } from './types';

/**
 * layerのアイテム
 *
 * - 子要素に適用し、指定したオプションだけコンテナ（layer）の指定を上書きする
 * - alignX / alignYで、この子要素だけ位置を変えられる
 * - コンテナにlimitToItemsを指定した場合は、layerItemを適用した子要素だけがレイアウトの対象になる
 */
const layerItem = (options: LayerItemOptions = {}): LayoutStyle =>
  createItemStyle(clsLayoutLayerItem, options);
export default layerItem;
