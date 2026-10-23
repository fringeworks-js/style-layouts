import { createSplitByKeys } from '@fringeworks/utils/object/createSplitByKeys';
import type { StackLayoutOptions } from '../stack/types';

export default createSplitByKeys<StackLayoutOptions>({
  direction: true,
  alignX: true,
  alignY: true,
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
