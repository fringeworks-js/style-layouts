import type {
  AdjustOptions,
  DirectionOptions,
  GapOptions,
  ItemRatioOptions,
  ItemSizeOptions,
} from '../_types';

/**
 * centerのオプション
 */
export type CenterLayoutOptions = DirectionOptions &
  AdjustOptions &
  GapOptions &
  ItemSizeOptions &
  ItemRatioOptions;
