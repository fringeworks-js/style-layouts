import { createSplitByKeys } from '@fringeworks/utils/object/createSplitByKeys';
import type { CenterLayoutOptions } from '../center/types';

export default createSplitByKeys<CenterLayoutOptions>({
  direction: true,
  adjustX: true,
  adjustY: true,
  gap: true,
  gapX: true,
  gapY: true,
  itemSizeX: true,
  itemSizeY: true,
  itemRatioX: true,
  itemRatioY: true,
  limitToItems: true,
});
