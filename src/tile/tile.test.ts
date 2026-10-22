import tile from './tile';

describe('tile', () => {
  it('オプションを省略すると既定値のクラスと間隔を返す', () => {
    expect(tile()).toEqual({
      className:
        'frg-layout-tile frg-layout-direction-x frg-layout-alignX-left frg-layout-alignY-top frg-layout-adjustX-none frg-layout-adjustY-none',
      style: { '--frg-layout-gapX': '0px', '--frg-layout-gapY': '0px' },
    });
  });

  it('オプションをクラスと変数に変換する', () => {
    expect(
      tile({ adjustX: 'fit', gap: 8, itemSizeX: 200, itemRatioX: 1 }),
    ).toEqual({
      className:
        'frg-layout-tile frg-layout-direction-x frg-layout-alignX-left frg-layout-alignY-top frg-layout-adjustX-fit frg-layout-adjustY-none frg-layout-itemSizeX frg-layout-itemRatio',
      style: {
        '--frg-layout-gapX': '8px',
        '--frg-layout-gapY': '8px',
        '--frg-layout-itemSizeX': '200px',
        '--frg-layout-itemRatio': '1 / 1',
      },
    });
  });
});
