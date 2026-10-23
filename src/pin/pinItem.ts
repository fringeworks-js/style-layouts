import { clsLayoutPinItem } from '../_constants';
import createItemStyle from '../_internal/createItemStyle';
import type { LayoutStyle } from '../types';
import type { PinItemOptions } from './types';

/**
 * pinのアイテム
 *
 * - 子要素に適用し、指定したオプションだけコンテナ（pin）の指定を上書きする
 * - alignX / alignYで基準にする辺を選び、offsetX / offsetYでその辺からの距離を指定する。offsetZは重なり順（z-index）
 * - コンテナ（itemOffsetX / itemOffsetY）でもオフセットを指定しない場合は、子要素のtop / left / bottom / rightに従う
 * - コンテナにlimitToItemsを指定した場合は、pinItemを適用した子要素だけがレイアウトの対象になる
 */
const pinItem = (options: PinItemOptions = {}): LayoutStyle =>
  createItemStyle(clsLayoutPinItem, options);
export default pinItem;
