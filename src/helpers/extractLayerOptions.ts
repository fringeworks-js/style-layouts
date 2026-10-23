import { createSplitByKeys } from '@fringeworks/utils/object/createSplitByKeys';
import type { LayerLayoutOptions } from '../layer/types';

export default createSplitByKeys<LayerLayoutOptions>({
  alignX: true,
  alignY: true,
  adjustX: true,
  adjustY: true,
  itemSizeX: true,
  itemSizeY: true,
  itemRatioX: true,
  itemRatioY: true,
  limitToItems: true,
  itemOffsetZ: true,
});
