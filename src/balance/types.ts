import type {
  AdjustOptions,
  AlignOptions,
  DirectionOptions,
  GapOptions,
  ItemRatioOptions,
  ItemSizeOptions,
} from '../_types';
import type { AlignXBase, AlignYBase } from '../constants';

/**
 * balanceのオプション
 *
 * - `direction='x'` 時: `alignY` に `space-between`,`space-around`,`space-evenly` 指定不可
 * - `direction='y'` 時: `alignX` に `space-between`,`space-around`,`space-evenly` 指定不可
 */
export type BalanceLayoutOptions = AdjustOptions &
  GapOptions &
  ItemSizeOptions &
  ItemRatioOptions &
  BalanceDirectionWithAlignOptions;

/**
 * direction & alignのオプション
 *
 * - `direction` を省略した場合は既定値の `'x'` と同じ制限になるよう、`'y'` 側は `direction` を必須にする
 */
type BalanceDirectionWithAlignOptions =
  | (DirectionOptions<'x'> &
      Omit<AlignOptions, 'alignY'> & { alignY?: AlignYBase })
  | (Required<DirectionOptions<'y'>> &
      Omit<AlignOptions, 'alignX'> & { alignX?: AlignXBase });
