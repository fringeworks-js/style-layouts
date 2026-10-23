import type {
  ItemOffsetOptions,
  ItemRatioOptions,
  ItemSizeOptions,
  LimitToItemsOptions,
  OffsetOptions,
  RatioOptions,
  SizeOptions,
} from '../_types';

/**
 * pinの横位置の基準（オフセットを測る辺）
 */
export type PinAlignX = 'left' | 'right';

/**
 * pinの縦位置の基準（オフセットを測る辺）
 */
export type PinAlignY = 'top' | 'bottom';

/**
 * pinの位置の基準
 */
export type PinAlignOptions = {
  /**
   * 横方向のオフセットを測る辺
   * デフォルトは`left`
   */
  alignX?: PinAlignX;

  /**
   * 縦方向のオフセットを測る辺
   * デフォルトは`top`
   */
  alignY?: PinAlignY;
};

/**
 * pinのオプション
 */
export type PinLayoutOptions = PinAlignOptions &
  ItemOffsetOptions &
  ItemSizeOptions &
  ItemRatioOptions &
  LimitToItemsOptions;

/**
 * pinItemのオプション
 *
 * - 指定したオプションだけコンテナの指定を上書きする
 */
export type PinItemOptions = PinAlignOptions &
  OffsetOptions &
  SizeOptions &
  RatioOptions;
