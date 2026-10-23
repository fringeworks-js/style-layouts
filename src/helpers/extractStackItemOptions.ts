import { createSplitByKeys } from '@fringeworks/utils/object/createSplitByKeys';
import type { StackItemOptions } from '../stack/types';

export default createSplitByKeys<StackItemOptions>({
  adjustX: true,
  adjustY: true,
  sizeX: true,
  sizeY: true,
  ratioX: true,
  ratioY: true,
});
