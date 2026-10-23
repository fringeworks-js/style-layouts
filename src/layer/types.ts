import type {
  AdjustOptions,
  AlignBaseOptions,
  ItemOffsetOptions,
  ItemRatioOptions,
  ItemSizeOptions,
  LimitToItemsOptions,
  OffsetOptions,
  RatioOptions,
  SizeOptions,
} from '../_types';

/**
 * layerのオプション
 */
export type LayerLayoutOptions = AdjustOptions &
  ItemSizeOptions &
  ItemRatioOptions &
  AlignBaseOptions &
  Pick<ItemOffsetOptions, 'itemOffsetZ'> &
  LimitToItemsOptions;

/**
 * layerItemのオプション
 *
 * - 指定したオプションだけコンテナの指定を上書きする
 */
export type LayerItemOptions = AlignBaseOptions &
  AdjustOptions &
  SizeOptions &
  RatioOptions &
  Pick<OffsetOptions, 'offsetZ'>;
