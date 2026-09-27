import type { ArgTypes } from '../_internal/adapter';
import {
  Adjust,
  AlignX,
  AlignXBase,
  AlignY,
  AlignYBase,
  Direction,
} from '../_internal/adapter';
import type {
  AdjustArgs,
  AlignArgs,
  DebugArgs,
  DirectionArgs,
  GapArgs,
  ItemCountArgs,
  ItemRatioArgs,
  ItemSizeArgs,
  LayoutName,
  StoryArgs,
  TracksArgs,
} from './types';

export const CONTAINER_STYLE = {
  width: 600,
  height: 450,
};

export const DIRECTION_ARG_OPTIONS = Object.values(Direction);

export const ALAGN_X_BASE_ARG_OPTIONS = Object.values(AlignXBase);

export const ALAGN_X_ARG_OPTIONS = Object.values(AlignX);

export const ALAGN_Y_BASE_ARG_OPTIONS = Object.values(AlignYBase);

export const ALAGN_Y_ARG_OPTIONS = Object.values(AlignY);

export const ADJUST_ARG_OPTIONS = Object.values(Adjust);

export const DIRECTION_ARG_TYPES: ArgTypes<DirectionArgs> = {
  direction: {
    control: 'select',
    options: DIRECTION_ARG_OPTIONS,
  },
};

export const ALIGN_BASE_ARG_TYPES: ArgTypes<AlignArgs> = {
  alignX: {
    control: 'select',
    options: ALAGN_X_BASE_ARG_OPTIONS,
  },
  alignY: {
    control: 'select',
    options: ALAGN_Y_BASE_ARG_OPTIONS,
  },
};

export const ALIGN_ARG_TYPES: ArgTypes<AlignArgs> = {
  alignX: {
    control: 'select',
    options: ALAGN_X_ARG_OPTIONS,
  },
  alignY: {
    control: 'select',
    options: ALAGN_Y_ARG_OPTIONS,
  },
};

export const ADJUST_ARG_TYPES: ArgTypes<AdjustArgs> = {
  adjustX: {
    control: 'select',
    options: ADJUST_ARG_OPTIONS,
  },
  adjustY: {
    control: 'select',
    options: ADJUST_ARG_OPTIONS,
  },
};

export const ADJUST_DIRECTION_X_ARG_TYPES: ArgTypes<AdjustArgs> = {
  adjustX: {
    control: 'select',
    options: ADJUST_ARG_OPTIONS,
  },
  adjustY: {
    control: 'select',
    options: ['none'],
  },
};

export const ADJUST_DIRECTION_Y_ARG_TYPES: ArgTypes<AdjustArgs> = {
  adjustX: {
    control: 'select',
    options: ['none'],
  },
  adjustY: {
    control: 'select',
    options: ADJUST_ARG_OPTIONS,
  },
};

export const ITEM_SIZE_ARG_TYPES: ArgTypes<ItemSizeArgs> = {
  itemSizeX: {
    control: 'text',
  },
  itemSizeY: {
    control: 'text',
  },
};

export const ITEM_RATIO_ARG_TYPES: ArgTypes<ItemRatioArgs> = {
  itemRatioX: {
    control: 'text',
  },
  itemRatioY: {
    control: 'text',
  },
};

export const GAP_ARG_TYPES: ArgTypes<GapArgs> = {
  gap: {
    control: 'text',
  },
  gapX: {
    control: 'text',
  },
  gapY: {
    control: 'text',
  },
};

export const ITEM_COUNT_ARG_TYPES: ArgTypes<ItemCountArgs> = {
  itemCountX: {
    control: 'text',
  },
  itemCountY: {
    control: 'text',
  },
};

export const TRACKS_ARG_TYPES: ArgTypes<TracksArgs> = {
  tracksX: {
    control: 'text',
  },
  tracksY: {
    control: 'text',
  },
};

export const DEBUG_ARG_TYPES: ArgTypes<DebugArgs> = {
  containerWidth: {
    control: 'text',
  },
  containerHeight: {
    control: 'text',
  },
  itemCount: {
    type: 'number',
  },
  sizeType: {
    control: 'select',
    options: ['none', 'rand', 'static'],
  },
  posType: {
    control: 'select',
    options: ['none', 'rand', 'static'],
  },
  seed: {
    control: 'number',
  },
  overflow: {
    control: 'select',
    options: ['visible', 'hidden', 'clip', 'scroll', 'auto', 'none'],
  },
};

export const ARG_TYPES: Record<LayoutName, ArgTypes<StoryArgs>> = {
  stack: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...ITEM_SIZE_ARG_TYPES,
    ...ITEM_RATIO_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  flow: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...ITEM_SIZE_ARG_TYPES,
    ...ITEM_RATIO_ARG_TYPES,
    ...ITEM_COUNT_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  tile: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...ITEM_SIZE_ARG_TYPES,
    ...ITEM_RATIO_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  matrix: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...ITEM_SIZE_ARG_TYPES,
    ...ITEM_RATIO_ARG_TYPES,
    ...ITEM_COUNT_ARG_TYPES,
    ...TRACKS_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  center: {
    ...DIRECTION_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...ITEM_SIZE_ARG_TYPES,
    ...ITEM_RATIO_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  pack: {
    ...DIRECTION_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  balance: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...ITEM_SIZE_ARG_TYPES,
    ...ITEM_RATIO_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  layer: {
    ...ALIGN_BASE_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...ITEM_SIZE_ARG_TYPES,
    ...ITEM_RATIO_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  pin: {
    ...ITEM_SIZE_ARG_TYPES,
    ...ITEM_RATIO_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
};

export const DIRECTION_OPTIONS: DirectionArgs = {
  direction: 'x',
};

export const ALIGN_OPTIONS: AlignArgs = {
  alignX: 'left',
  alignY: 'top',
};

export const ADJUST_OPTIONS: AdjustArgs = {
  adjustX: 'none',
  adjustY: 'none',
};

export const GAP_OPTIONS: GapArgs = {
  gap: '8',
  gapX: undefined,
  gapY: undefined,
};

export const ITEM_SIZE_OPTIONS: ItemSizeArgs = {
  itemSizeX: '60',
  itemSizeY: '120',
};

export const CHILD_RATIO_OPTIONS: ItemRatioArgs = {
  itemRatioX: undefined,
  itemRatioY: undefined,
};

export const ITEM_COUNT_OPTIONS: ItemCountArgs = {
  itemCountX: '4',
  itemCountY: '3',
};

export const TRACKS_OPTIONS: TracksArgs = {
  tracksX: undefined,
  tracksY: undefined,
};

export const DEBUG_PARAMS: DebugArgs = {
  containerWidth: String(CONTAINER_STYLE.width),
  containerHeight: String(CONTAINER_STYLE.height),
  itemCount: 12,
  sizeType: 'none',
  posType: 'none',
  seed: 1,
  overflow: 'hidden',
};

export const ARGS: Record<LayoutName, StoryArgs> = {
  stack: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...GAP_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...CHILD_RATIO_OPTIONS,
    ...DEBUG_PARAMS,
  },
  flow: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...GAP_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...CHILD_RATIO_OPTIONS,
    ...DEBUG_PARAMS,
  },
  tile: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...GAP_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...CHILD_RATIO_OPTIONS,
    ...DEBUG_PARAMS,
  },
  matrix: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...GAP_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...CHILD_RATIO_OPTIONS,
    ...ITEM_COUNT_OPTIONS,
    ...TRACKS_OPTIONS,
    ...DEBUG_PARAMS,
  },
  center: {
    ...DIRECTION_OPTIONS,
    ...ADJUST_OPTIONS,
    ...GAP_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...CHILD_RATIO_OPTIONS,
    ...DEBUG_PARAMS,
  },
  pack: {
    ...DIRECTION_OPTIONS,
    ...GAP_OPTIONS,
    ...DEBUG_PARAMS,
  },
  balance: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...GAP_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...CHILD_RATIO_OPTIONS,
    ...DEBUG_PARAMS,
  },
  layer: {
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...CHILD_RATIO_OPTIONS,
    ...DEBUG_PARAMS,
  },
  pin: {
    ...ITEM_SIZE_OPTIONS,
    ...CHILD_RATIO_OPTIONS,
    ...DEBUG_PARAMS,
    posType: 'static',
  },
};
