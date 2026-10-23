import { clsLayoutFlowItem } from '../_constants';
import createItemStyle from '../_internal/createItemStyle';
import type { LayoutStyle } from '../types';
import type { FlowItemOptions } from './types';

/**
 * flowのアイテム
 *
 * - 子要素に適用し、指定したオプションだけコンテナ（flow）の指定を上書きする
 * - 主軸・交差軸はコンテナのdirectionで決まる。交差軸のadjustは適用しない
 * - コンテナにlimitToItemsを指定した場合は、flowItemを適用した子要素だけがレイアウトの対象になる
 */
const flowItem = (options: FlowItemOptions = {}): LayoutStyle =>
  createItemStyle(clsLayoutFlowItem, options);
export default flowItem;
