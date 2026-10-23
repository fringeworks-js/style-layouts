import { describe, it } from 'vitest';
import layer from '../layer/layer';
import layerItem from '../layer/layerItem';
import pin from './pin';
import pinItem from './pinItem';

describe('pin', () => {
  it('位置の基準は端（left / right・top / bottom）だけを指定できる', () => {
    pin({ alignX: 'right', alignY: 'bottom' });
    pinItem({ alignX: 'left', alignY: 'top' });
    // @ts-expect-error 中央を基準にした配置は未対応
    pinItem({ alignX: 'center' });
    // @ts-expect-error 中央を基準にした配置は未対応
    pin({ alignY: 'middle' });
  });

  it('オフセットは X / Y が数値か文字列、Z が数値', () => {
    pin({ itemOffsetX: 10, itemOffsetY: '50%', itemOffsetZ: 1 });
    pinItem({ offsetX: '1rem', offsetY: 0, offsetZ: -1 });
    // @ts-expect-error 重なり順は数値だけ
    pinItem({ offsetZ: '1' });
  });
});

describe('layer', () => {
  it('オフセットは Z だけを指定できる', () => {
    layer({ itemOffsetZ: 1 });
    layerItem({ offsetZ: 1 });
    // @ts-expect-error layer では位置のオフセットは指定できない
    layerItem({ offsetX: 10 });
    // @ts-expect-error layer では位置のオフセットは指定できない
    layer({ itemOffsetX: 10 });
  });
});
