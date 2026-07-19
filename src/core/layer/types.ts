import type {
  AdjustOptions,
  ItemRatioOptions,
  ItemSizeOptions,
} from '../_types';
import type { AlignXBase, AlignYBase } from '../constants';

/**
 * layerのオプション
 */
export type LayerLayoutOptions = AdjustOptions &
  ItemSizeOptions &
  ItemRatioOptions & {
    alignX?: AlignXBase;
    alignY?: AlignYBase;
  };
