import flow from './flow';

describe('flow', () => {
  it('オプションを省略すると既定値のクラスと間隔を返す', () => {
    expect(flow()).toEqual({
      className:
        'frg-layout-flow frg-layout-direction-x frg-layout-alignX-left frg-layout-alignY-top frg-layout-adjustX-none frg-layout-adjustY-none',
      style: { '--frg-layout-gapX': '0px', '--frg-layout-gapY': '0px' },
    });
  });

  it('オプションをクラスと変数に変換する', () => {
    expect(
      flow({
        direction: 'y',
        alignX: 'space-around',
        alignY: 'bottom',
        adjustY: 'shrink',
        gapX: 8,
        itemSizeY: 50,
      }),
    ).toEqual({
      className:
        'frg-layout-flow frg-layout-direction-y frg-layout-alignX-spaceAround frg-layout-alignY-bottom frg-layout-adjustX-none frg-layout-adjustY-shrink frg-layout-itemSizeY',
      style: {
        '--frg-layout-gapX': '8px',
        '--frg-layout-gapY': '0px',
        '--frg-layout-itemSizeY': '50px',
      },
    });
  });
});
