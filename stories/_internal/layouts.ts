import type { CreateLayoutStyle, LayoutStyle } from '../../src/types';
import balance from '../../src/with-css/balance';
import center, { centerItem } from '../../src/with-css/center';
import flow, { flowItem } from '../../src/with-css/flow';
import layer, { layerItem } from '../../src/with-css/layer';
import matrix from '../../src/with-css/matrix';
import pack from '../../src/with-css/pack';
import pin, { pinItem } from '../../src/with-css/pin';
import stack, { stackItem } from '../../src/with-css/stack';
import tile from '../../src/with-css/tile';
import type { LayoutName } from '../_shared/types';

/**
 * storyで表示するレイアウト
 */
const LAYOUTS: Record<LayoutName, CreateLayoutStyle<any>> = {
  balance,
  center,
  flow,
  layer,
  matrix,
  pack,
  pin,
  stack,
  tile,
};
export default LAYOUTS;

/**
 * storyで表示するレイアウトのアイテム
 */
export const LAYOUT_ITEMS: Partial<
  Record<LayoutName, (options: Record<string, unknown>) => LayoutStyle>
> = {
  center: centerItem,
  flow: flowItem,
  layer: layerItem,
  pin: pinItem,
  stack: stackItem,
};
