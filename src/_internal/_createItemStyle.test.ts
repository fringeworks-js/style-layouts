import centerItem from '../center/centerItem';
import flowItem from '../flow/flowItem';
import layerItem from '../layer/layerItem';
import pinItem from '../pin/pinItem';
import createItemStyle from './_createItemStyle';

describe('createItemStyle', () => {
  it('alignは指定したことを表すクラスと値のクラスを設定する', () => {
    expect(createItemStyle('a', { alignX: 'right', alignY: 'middle' })).toEqual(
      {
        className: 'a a-alignX a-alignX-right a-alignY a-alignY-middle',
        style: {},
      },
    );
  });

  it.each([
    ['flowItem', flowItem, 'frgs-layout-flow-item'],
    ['centerItem', centerItem, 'frgs-layout-center-item'],
    ['layerItem', layerItem, 'frgs-layout-layer-item'],
    ['pinItem', pinItem, 'frgs-layout-pin-item'],
  ] as const)('%s: レイアウトのアイテムのクラスを使う', (_, fn, item) => {
    expect(fn()).toEqual({ className: item, style: {} });
    expect(fn({ sizeX: 10, ratioX: 2 })).toEqual({
      className: `${item} ${item}-sizeX ${item}-ratio`,
      style: {
        [`--${item}-sizeX`]: '10px',
        [`--${item}-ratio`]: '2 / 1',
      },
    });
  });

  it('layerItem: alignとadjustを指定できる', () => {
    expect(layerItem({ alignX: 'center', adjustY: 'fit' }).className).toBe(
      'frgs-layout-layer-item frgs-layout-layer-item-alignX frgs-layout-layer-item-alignX-center frgs-layout-layer-item-adjustY frgs-layout-layer-item-adjustY-fit',
    );
  });
});
