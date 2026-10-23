import { clsLayoutStackItem } from '../_constants';
import createItemStyle from '../_internal/createItemStyle';
import type { LayoutStyle } from '../types';
import type { StackItemOptions } from './types';

/**
 * stackのアイテム
 *
 * - 子要素に適用し、指定したオプションだけコンテナ（stack）の指定を上書きする
 * - コンテナにlimitToItemsを指定した場合は、stackItemを適用した子要素だけがレイアウトの対象になる
 */
const stackItem = (options: StackItemOptions = {}): LayoutStyle =>
  createItemStyle(clsLayoutStackItem, options);
export default stackItem;
