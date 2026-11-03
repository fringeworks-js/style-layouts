import layer from './layer';

describe('layer', () => {
  it('オプションを省略すると既定値のクラスを返す', () => {
    expect(layer()).toEqual({
      className:
        'frgs-layout-layer frgs-layout-alignX-left frgs-layout-alignY-top frgs-layout-adjustX-none frgs-layout-adjustY-none',
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
        'frgs-layout-layer frgs-layout-alignX-center frgs-layout-alignY-bottom frgs-layout-adjustX-shrink frgs-layout-adjustY-none frgs-layout-itemSizeX frgs-layout-itemRatio',
      style: {
        '--frgs-layout-itemSizeX': '200px',
        '--frgs-layout-itemRatio': '16 / 9',
      },
    });
  });

  it('itemOffsetZをクラスと変数に変換する', () => {
    const { className, style } = layer({ itemOffsetZ: 3 });
    expect(className).toContain('frgs-layout-itemOffsetZ');
    expect(style).toEqual({ '--frgs-layout-itemOffsetZ': '3' });
  });
});
