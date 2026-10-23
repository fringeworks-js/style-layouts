import { createSplitByKeys } from '@fringeworks/utils/object/createSplitByKeys';
import type { TileLayoutOptions } from '../tile/types';

export default createSplitByKeys<TileLayoutOptions>({
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
