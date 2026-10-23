import { createSplitByKeys } from '@fringeworks/utils/object/createSplitByKeys';
import type { LayerItemOptions } from '../layer/types';

export default createSplitByKeys<LayerItemOptions>({
  alignX: true,
  alignY: true,
  adjustX: true,
  adjustY: true,
  sizeX: true,
  sizeY: true,
  ratioX: true,
  ratioY: true,
  offsetZ: true,
});
