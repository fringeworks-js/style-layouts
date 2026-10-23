import { createSplitByKeys } from '@fringeworks/utils/object/createSplitByKeys';
import type { PackLayoutOptions } from '../pack/types';

export default createSplitByKeys<PackLayoutOptions>({
  direction: true,
  gap: true,
  gapX: true,
  gapY: true,
});
