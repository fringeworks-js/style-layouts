import balance from './balance';

describe('balance', () => {
  it('オプションを省略すると既定値のクラスと間隔を返す', () => {
    expect(balance()).toEqual({
      className:
        'frgs-layout-balance frgs-layout-direction-x frgs-layout-alignX-left frgs-layout-alignY-top frgs-layout-adjustX-none frgs-layout-adjustY-none',
      style: { '--frgs-layout-gapX': '0px', '--frgs-layout-gapY': '0px' },
    });
  });

  it('オプションをクラスと変数に変換する', () => {
    expect(
      balance({
        alignX: 'space-evenly',
        adjustX: 'grow',
        gap: 8,
        itemSizeX: 200,
      }),
    ).toEqual({
      className:
        'frgs-layout-balance frgs-layout-direction-x frgs-layout-alignX-spaceEvenly frgs-layout-alignY-top frgs-layout-adjustX-grow frgs-layout-adjustY-none frgs-layout-itemSizeX',
      style: {
        '--frgs-layout-gapX': '8px',
        '--frgs-layout-gapY': '8px',
        '--frgs-layout-itemSizeX': '200px',
      },
    });
  });
});
