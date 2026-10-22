import balance from './balance';

describe('balance', () => {
  it('オプションを省略すると既定値のクラスと間隔を返す', () => {
    expect(balance()).toEqual({
      className:
        'frg-layout-balance frg-layout-direction-x frg-layout-alignX-left frg-layout-alignY-top frg-layout-adjustX-none frg-layout-adjustY-none',
      style: { '--frg-layout-gapX': '0px', '--frg-layout-gapY': '0px' },
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
        'frg-layout-balance frg-layout-direction-x frg-layout-alignX-spaceEvenly frg-layout-alignY-top frg-layout-adjustX-grow frg-layout-adjustY-none frg-layout-itemSizeX',
      style: {
        '--frg-layout-gapX': '8px',
        '--frg-layout-gapY': '8px',
        '--frg-layout-itemSizeX': '200px',
      },
    });
  });
});
