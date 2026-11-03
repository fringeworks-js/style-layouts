import tile from './tile';

describe('tile', () => {
  it('オプションを省略すると既定値のクラスと間隔を返す', () => {
    expect(tile()).toEqual({
      className:
        'frgs-layout-tile frgs-layout-direction-x frgs-layout-alignX-left frgs-layout-alignY-top frgs-layout-adjustX-none frgs-layout-adjustY-none',
      style: { '--frgs-layout-gapX': '0px', '--frgs-layout-gapY': '0px' },
    });
  });

  it('オプションをクラスと変数に変換する', () => {
    expect(
      tile({ adjustX: 'fit', gap: 8, itemSizeX: 200, itemRatioX: 1 }),
    ).toEqual({
      className:
        'frgs-layout-tile frgs-layout-direction-x frgs-layout-alignX-left frgs-layout-alignY-top frgs-layout-adjustX-fit frgs-layout-adjustY-none frgs-layout-itemSizeX frgs-layout-itemRatio',
      style: {
        '--frgs-layout-gapX': '8px',
        '--frgs-layout-gapY': '8px',
        '--frgs-layout-itemSizeX': '200px',
        '--frgs-layout-itemRatio': '1 / 1',
      },
    });
  });
});
