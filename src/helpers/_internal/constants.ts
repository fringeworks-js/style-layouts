import type {
  AdjustOptions,
  AlignOptions,
  DirectionOptions,
  GapOptions,
  ItemCountOptions,
  ItemRatioOptions,
  ItemSizeOptions,
  TracksOptions,
} from '../../core/_types';

export const DIRECTION_OPTIONS_KEYS: (keyof DirectionOptions)[] = [
  'direction',
] as const;
export const ALIGN_OPTIONS_KEYS: (keyof AlignOptions)[] = [
  'alignX',
  'alignY',
] as const;
export const ADJUST_OPTIONS_KEYS: (keyof AdjustOptions)[] = [
  'adjustX',
  'adjustY',
] as const;
export const GAP_OPTIONS_KEYS: (keyof GapOptions)[] = [
  'gap',
  'gapX',
  'gapY',
] as const;
export const ITEM_SIZE_OPTIONS_KEYS: (keyof ItemSizeOptions)[] = [
  'itemSizeX',
  'itemSizeY',
] as const;
export const CHILD_RATIO_OPTIONS_KEYS: (keyof ItemRatioOptions)[] = [
  'itemRatioX',
  'itemRatioY',
] as const;
export const ITEM_COUNT_OPTIONS_KEYS: (keyof ItemCountOptions)[] = [
  'itemCountX',
  'itemCountY',
] as const;
export const TRACKS_OPTIONS_KEYS: (keyof TracksOptions)[] = [
  'tracksX',
  'tracksY',
] as const;
