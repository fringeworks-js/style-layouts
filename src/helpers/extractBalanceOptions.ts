import { createSplitByKeys } from '@fringeworks/utils/object/createSplitByKeys';
import type { BalanceLayoutOptions } from '../balance';

export default createSplitByKeys<BalanceLayoutOptions>({
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
});
