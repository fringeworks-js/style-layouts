import type {
  AdjustOptions,
  AlignOptions,
  DirectionOptions,
  GapOptions,
  ItemRatioOptions,
  ItemSizeOptions,
} from '../_types';

/**
 * tileのオプション
 */

export type TileLayoutOptions = DirectionOptions &
  AlignOptions &
  AdjustOptions &
  GapOptions &
  ItemSizeOptions &
  ItemRatioOptions;
