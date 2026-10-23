import { createSplitByKeys } from '@fringeworks/utils/object/createSplitByKeys';
import type { FlowItemOptions } from '../flow/types';

export default createSplitByKeys<FlowItemOptions>({
  adjustX: true,
  adjustY: true,
  sizeX: true,
  sizeY: true,
  ratioX: true,
  ratioY: true,
});
