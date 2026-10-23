import type {
  AdjustOptions,
  DirectionOptions,
  GapOptions,
  ItemRatioOptions,
  ItemSizeOptions,
  LimitToItemsOptions,
  RatioOptions,
  SizeOptions,
} from '../_types';

/**
 * centerのオプション
 */
export type CenterLayoutOptions = DirectionOptions &
  AdjustOptions &
  GapOptions &
  ItemSizeOptions &
  ItemRatioOptions &
  LimitToItemsOptions;

/**
 * centerItemのオプション
 *
 * - 指定したオプションだけコンテナの指定を上書きする
 * - 主軸・交差軸はコンテナのdirectionで決まる
 */
export type CenterItemOptions = AdjustOptions & SizeOptions & RatioOptions;
