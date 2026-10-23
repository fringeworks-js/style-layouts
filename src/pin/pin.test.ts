import pin from './pin';
import pinItem from './pinItem';

describe('pin', () => {
  it('オプションを省略すると既定値のクラスを返す', () => {
    expect(pin()).toEqual({
      className: 'frg-layout-pin frg-layout-alignX-left frg-layout-alignY-top',
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
        'frg-layout-pin frg-layout-alignX-right frg-layout-alignY-bottom frg-layout-itemOffsetX frg-layout-itemOffsetY frg-layout-itemOffsetZ frg-layout-itemSizeX frg-layout-itemSizeY',
      style: {
        '--frg-layout-itemOffsetX': '10px',
        '--frg-layout-itemOffsetY': '20%',
        '--frg-layout-itemOffsetZ': '2',
        '--frg-layout-itemSizeX': '100px',
        '--frg-layout-itemSizeY': '80px',
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
        'frg-layout-pin-item frg-layout-pin-item-alignX frg-layout-pin-item-alignX-right frg-layout-pin-item-offsetX frg-layout-pin-item-offsetY frg-layout-pin-item-offsetZ',
      style: {
        '--frg-layout-pin-item-offsetX': '10px',
        '--frg-layout-pin-item-offsetY': '50%',
        '--frg-layout-pin-item-offsetZ': '0',
      },
    });
  });

  it('空文字のオフセットは指定しなかったものとして扱う', () => {
    expect(pinItem({ offsetX: '' })).toEqual({
      className: 'frg-layout-pin-item',
      style: {},
    });
  });
});
