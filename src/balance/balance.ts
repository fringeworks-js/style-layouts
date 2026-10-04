import maybeDefault from '@fringeworks/utils/object/maybeDefault';
import { clsLayout, clsLayoutBalance } from '../_constants';
import applyGap from '../_internal/applyGap';
import applyItemRatio from '../_internal/applyItemRatio';
import applyItemSize from '../_internal/applyItemSize';
import mergeClassName from '../_internal/mergeClassName';
import type { CreateLayoutStyle, LayoutStyle } from '../types';
import type { BalanceLayoutOptions } from './types';

/**
 * balanceレイアウト
 *
 * - 子要素を均等に配置する
 * - `adjust`が効いていない場合は、子要素のサイズを維持したまま、余白を均等に配分する
 * - `adjust`が効いている場合は、子要素のサイズを調整してコンテナを満たす
 */
const balance: CreateLayoutStyle<BalanceLayoutOptions> = (options = {}) => {
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
    {
      overwriteNull: true,
    },
  );
  const result: LayoutStyle = {
    className: mergeClassName(
      clsLayoutBalance,
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
export default balance;
