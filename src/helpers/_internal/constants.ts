import type {
  AdjustOptions,
  AlignOptions,
  DirectionOptions,
  GapOptions,
  ItemCountOptions,
  ItemRatioOptions,
  ItemSizeOptions,
  TracksOptions,
} from '../../_types';

export const DIRECTION_OPTIONS_KEYS: (keyof DirectionOptions)[] = ['direction'];
export const ALIGN_OPTIONS_KEYS: (keyof AlignOptions)[] = ['alignX', 'alignY'];
export const ADJUST_OPTIONS_KEYS: (keyof AdjustOptions)[] = [
  'adjustX',
  'adjustY',
];
export const GAP_OPTIONS_KEYS: (keyof GapOptions)[] = ['gap', 'gapX', 'gapY'];
export const ITEM_SIZE_OPTIONS_KEYS: (keyof ItemSizeOptions)[] = [
  'itemSizeX',
  'itemSizeY',
];
export const ITEM_RATIO_OPTIONS_KEYS: (keyof ItemRatioOptions)[] = [
  'itemRatioX',
  'itemRatioY',
];
export const ITEM_COUNT_OPTIONS_KEYS: (keyof ItemCountOptions)[] = [
  'itemCountX',
  'itemCountY',
];
export const TRACKS_OPTIONS_KEYS: (keyof TracksOptions)[] = [
  'tracksX',
  'tracksY',
];
