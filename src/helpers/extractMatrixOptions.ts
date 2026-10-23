import { createSplitByKeys } from '@fringeworks/utils/object/createSplitByKeys';
import type { MatrixLayoutOptions } from '../matrix/types';

export default createSplitByKeys<MatrixLayoutOptions>({
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
  itemCountX: true,
  itemCountY: true,
  tracksX: true,
  tracksY: true,
});
