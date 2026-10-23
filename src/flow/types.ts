import type {
  AdjustOptions,
  AlignOptions,
  DirectionOptions,
  GapOptions,
  ItemRatioOptions,
  ItemSizeOptions,
  LimitToItemsOptions,
  RatioOptions,
  SizeOptions,
} from '../_types';
import type { AdjustBase } from '../constants';

/**
 * flowのオプション
 *
 * - `direction='x'` 時: `adjustY` に `fit`,`grow`,`shrink` 指定不可
 * - `direction='y'` 時: `adjustX` に `fit`,`grow`,`shrink` 指定不可
 */
export type FlowLayoutOptions = AlignOptions &
  GapOptions &
  ItemSizeOptions &
  ItemRatioOptions &
  LimitToItemsOptions &
  FlowDirectionWithAdjustOptions;

/**
 * flowItemのオプション
 *
 * - 指定したオプションだけコンテナの指定を上書きする
 * - 主軸・交差軸はコンテナのdirectionで決まる。交差軸のadjustは折り返しと両立しないため適用しない
 */
export type FlowItemOptions = AdjustOptions & SizeOptions & RatioOptions;

/**
 * direction & adjustのオプション
 *
 * - `direction` を省略した場合は既定値の `'x'` と同じ制限になるよう、`'y'` 側は `direction` を必須にする
 */
type FlowDirectionWithAdjustOptions =
  | (DirectionOptions<'x'> &
      Omit<AdjustOptions, 'adjustY'> & { adjustY?: AdjustBase })
  | (Required<DirectionOptions<'y'>> &
      Omit<AdjustOptions, 'adjustX'> & { adjustX?: AdjustBase });
