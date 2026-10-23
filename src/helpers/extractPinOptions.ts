import { createSplitByKeys } from '@fringeworks/utils/object/createSplitByKeys';
import type { PinLayoutOptions } from '../pin/types';

export default createSplitByKeys<PinLayoutOptions>({
  itemSizeX: true,
  itemSizeY: true,
  itemRatioX: true,
  itemRatioY: true,
  limitToItems: true,
  alignX: true,
  alignY: true,
  itemOffsetX: true,
  itemOffsetY: true,
  itemOffsetZ: true,
});
