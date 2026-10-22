import center from './center';

describe('center', () => {
  it('オプションを省略すると既定値のクラスと間隔を返す', () => {
    expect(center()).toEqual({
      className:
        'frg-layout-center frg-layout-direction-x frg-layout-adjustX-none frg-layout-adjustY-none',
      style: { '--frg-layout-gapX': '0px', '--frg-layout-gapY': '0px' },
    });
  });

  it('オプションをクラスと変数に変換する', () => {
    expect(
      center({
        direction: 'y',
        adjustX: 'shrink',
        gap: 8,
        itemSizeY: 200,
        itemRatioX: 1.6,
      }),
    ).toEqual({
      className:
        'frg-layout-center frg-layout-direction-y frg-layout-adjustX-shrink frg-layout-adjustY-none frg-layout-itemSizeY frg-layout-itemRatio',
      style: {
        '--frg-layout-gapX': '8px',
        '--frg-layout-gapY': '8px',
        '--frg-layout-itemSizeY': '200px',
        '--frg-layout-itemRatio': '1.6 / 1',
      },
    });
  });
});
