import { createSplitByKeys } from '@fringeworks/utils/object/createSplitByKeys';
import type { CenterItemOptions } from '../center/types';

export default createSplitByKeys<CenterItemOptions>({
  adjustX: true,
  adjustY: true,
  sizeX: true,
  sizeY: true,
  ratioX: true,
  ratioY: true,
});
