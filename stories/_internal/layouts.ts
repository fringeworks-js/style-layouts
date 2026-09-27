import type { CreateLayoutStyle } from '../../src/types';
import balance from '../../src/with-css/balance';
import center from '../../src/with-css/center';
import flow from '../../src/with-css/flow';
import layer from '../../src/with-css/layer';
import matrix from '../../src/with-css/matrix';
import pack from '../../src/with-css/pack';
import pin from '../../src/with-css/pin';
import stack from '../../src/with-css/stack';
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
