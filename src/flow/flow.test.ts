import flow from './flow';

describe('flow', () => {
  it('オプションを省略すると既定値のクラスと間隔を返す', () => {
    expect(flow()).toEqual({
      className:
        'frgs-layout-flow frgs-layout-direction-x frgs-layout-alignX-left frgs-layout-alignY-top frgs-layout-adjustX-none frgs-layout-adjustY-none',
      style: { '--frgs-layout-gapX': '0px', '--frgs-layout-gapY': '0px' },
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
        'frgs-layout-flow frgs-layout-direction-y frgs-layout-alignX-spaceAround frgs-layout-alignY-bottom frgs-layout-adjustX-none frgs-layout-adjustY-shrink frgs-layout-itemSizeY',
      style: {
        '--frgs-layout-gapX': '8px',
        '--frgs-layout-gapY': '0px',
        '--frgs-layout-itemSizeY': '50px',
      },
    });
  });
});
