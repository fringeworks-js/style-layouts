import pin from './pin';
import pinItem from './pinItem';

describe('pin', () => {
  it('オプションを省略すると既定値のクラスを返す', () => {
    expect(pin()).toEqual({
      className:
        'frgs-layout-pin frgs-layout-alignX-left frgs-layout-alignY-top',
      style: {},
    });
  });

  it('オプションをクラスと変数に変換する', () => {
    expect(
      pin({
        alignX: 'right',
        alignY: 'bottom',
        itemOffsetX: 10,
        itemOffsetY: '20%',
        itemOffsetZ: 2,
        itemSizeX: 100,
        itemSizeY: 80,
      }),
    ).toEqual({
      className:
        'frgs-layout-pin frgs-layout-alignX-right frgs-layout-alignY-bottom frgs-layout-itemOffsetX frgs-layout-itemOffsetY frgs-layout-itemOffsetZ frgs-layout-itemSizeX frgs-layout-itemSizeY',
      style: {
        '--frgs-layout-itemOffsetX': '10px',
        '--frgs-layout-itemOffsetY': '20%',
        '--frgs-layout-itemOffsetZ': '2',
        '--frgs-layout-itemSizeX': '100px',
        '--frgs-layout-itemSizeY': '80px',
      },
    });
  });
});

describe('pinItem', () => {
  it('位置の基準とオフセットをクラスと変数に変換する', () => {
    expect(
      pinItem({ alignX: 'right', offsetX: 10, offsetY: '50%', offsetZ: 0 }),
    ).toEqual({
      className:
        'frgs-layout-pin-item frgs-layout-pin-item-alignX frgs-layout-pin-item-alignX-right frgs-layout-pin-item-offsetX frgs-layout-pin-item-offsetY frgs-layout-pin-item-offsetZ',
      style: {
        '--frgs-layout-pin-item-offsetX': '10px',
        '--frgs-layout-pin-item-offsetY': '50%',
        '--frgs-layout-pin-item-offsetZ': '0',
      },
    });
  });

  it('空文字のオフセットは指定しなかったものとして扱う', () => {
    expect(pinItem({ offsetX: '' })).toEqual({
      className: 'frgs-layout-pin-item',
      style: {},
    });
  });
});
