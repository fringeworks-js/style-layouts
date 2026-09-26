import type { MatrixLayoutOptions } from '../matrix/types';
import {
  ADJUST_OPTIONS_KEYS,
  ALIGN_OPTIONS_KEYS,
  DIRECTION_OPTIONS_KEYS,
  GAP_OPTIONS_KEYS,
  ITEM_COUNT_OPTIONS_KEYS,
  ITEM_RATIO_OPTIONS_KEYS,
  ITEM_SIZE_OPTIONS_KEYS,
  TRACKS_OPTIONS_KEYS,
} from './_internal/constants';
import createExtractLayoutOptions from './_internal/createExtractLayoutOptions';

export default createExtractLayoutOptions<MatrixLayoutOptions>([
  ...DIRECTION_OPTIONS_KEYS,
  ...ALIGN_OPTIONS_KEYS,
  ...ADJUST_OPTIONS_KEYS,
  ...GAP_OPTIONS_KEYS,
  ...ITEM_SIZE_OPTIONS_KEYS,
  ...ITEM_RATIO_OPTIONS_KEYS,
  ...ITEM_COUNT_OPTIONS_KEYS,
  ...TRACKS_OPTIONS_KEYS,
]);
