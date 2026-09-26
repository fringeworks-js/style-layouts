import type { LayerLayoutOptions } from '../layer/types';
import {
  ADJUST_OPTIONS_KEYS,
  ALIGN_OPTIONS_KEYS,
  ITEM_RATIO_OPTIONS_KEYS,
  ITEM_SIZE_OPTIONS_KEYS,
} from './_internal/constants';
import createExtractLayoutOptions from './_internal/createExtractLayoutOptions';

export default createExtractLayoutOptions<LayerLayoutOptions>([
  ...ALIGN_OPTIONS_KEYS,
  ...ADJUST_OPTIONS_KEYS,
  ...ITEM_SIZE_OPTIONS_KEYS,
  ...ITEM_RATIO_OPTIONS_KEYS,
]);
