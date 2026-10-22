import type {
  AdjustOptions,
  AlignOptions,
  DirectionOptions,
  GapOptions,
  ItemRatioOptions,
  ItemSizeOptions,
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
  FlowDirectionWithAdjustOptions;

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
