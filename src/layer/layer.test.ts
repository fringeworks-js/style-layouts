import layer from './layer';

describe('layer', () => {
  it('オプションを省略すると既定値のクラスを返す', () => {
    expect(layer()).toEqual({
      className:
        'frg-layout-layer frg-layout-alignX-left frg-layout-alignY-top frg-layout-adjustX-none frg-layout-adjustY-none',
      style: {},
    });
  });

  it('オプションをクラスと変数に変換する', () => {
    expect(
      layer({
        alignX: 'center',
        alignY: 'bottom',
        adjustX: 'shrink',
        itemSizeX: 200,
        itemRatioX: 16,
        itemRatioY: 9,
      }),
    ).toEqual({
      className:
        'frg-layout-layer frg-layout-alignX-center frg-layout-alignY-bottom frg-layout-adjustX-shrink frg-layout-adjustY-none frg-layout-itemSizeX frg-layout-itemRatio',
      style: {
        '--frg-layout-itemSizeX': '200px',
        '--frg-layout-itemRatio': '16 / 9',
      },
    });
  });
});
