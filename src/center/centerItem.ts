import { clsLayoutCenterItem } from '../_constants';
import createItemStyle from '../_internal/createItemStyle';
import type { LayoutStyle } from '../types';
import type { CenterItemOptions } from './types';

/**
 * centerのアイテム
 *
 * - 子要素に適用し、指定したオプションだけコンテナ（center）の指定を上書きする
 * - 主軸・交差軸はコンテナのdirectionで決まる
 * - コンテナにlimitToItemsを指定した場合は、centerItemを適用した子要素だけがレイアウトの対象になる
 */
const centerItem = (options: CenterItemOptions = {}): LayoutStyle =>
  createItemStyle(clsLayoutCenterItem, options);
export default centerItem;
