import { createSplitByKeys } from '@fringeworks/utils/object/createSplitByKeys';
import type { PinItemOptions } from '../pin/types';

export default createSplitByKeys<PinItemOptions>({
  alignX: true,
  alignY: true,
  offsetX: true,
  offsetY: true,
  offsetZ: true,
  sizeX: true,
  sizeY: true,
  ratioX: true,
  ratioY: true,
});
