import center from './center';

describe('center', () => {
  it('オプションを省略すると既定値のクラスと間隔を返す', () => {
    expect(center()).toEqual({
      className:
        'frgs-layout-center frgs-layout-direction-x frgs-layout-adjustX-none frgs-layout-adjustY-none',
      style: { '--frgs-layout-gapX': '0px', '--frgs-layout-gapY': '0px' },
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
        'frgs-layout-center frgs-layout-direction-y frgs-layout-adjustX-shrink frgs-layout-adjustY-none frgs-layout-itemSizeY frgs-layout-itemRatio',
      style: {
        '--frgs-layout-gapX': '8px',
        '--frgs-layout-gapY': '8px',
        '--frgs-layout-itemSizeY': '200px',
        '--frgs-layout-itemRatio': '1.6 / 1',
      },
    });
  });
});
