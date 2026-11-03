import stack from './stack';

describe('stack', () => {
  it('オプションを省略すると既定値のクラスと間隔を返す', () => {
    expect(stack()).toEqual({
      className:
        'frgs-layout-stack frgs-layout-direction-x frgs-layout-alignX-left frgs-layout-alignY-top frgs-layout-adjustX-none frgs-layout-adjustY-none',
      style: { '--frgs-layout-gapX': '0px', '--frgs-layout-gapY': '0px' },
    });
  });

  it('オプションをクラスと変数に変換する', () => {
    expect(
      stack({
        direction: 'y',
        alignX: 'center',
        alignY: 'space-between',
        adjustX: 'fit',
        adjustY: 'grow',
        gap: 8,
        gapY: 4,
        itemSizeX: 100,
        itemSizeY: 50,
        itemRatioX: 16,
        itemRatioY: 9,
      }),
    ).toEqual({
      className:
        'frgs-layout-stack frgs-layout-direction-y frgs-layout-alignX-center frgs-layout-alignY-spaceBetween frgs-layout-adjustX-fit frgs-layout-adjustY-grow frgs-layout-itemSizeX frgs-layout-itemSizeY frgs-layout-itemRatio',
      style: {
        '--frgs-layout-gapX': '8px',
        '--frgs-layout-gapY': '4px',
        '--frgs-layout-itemSizeX': '100px',
        '--frgs-layout-itemSizeY': '50px',
        '--frgs-layout-itemRatio': '16 / 9',
      },
    });
  });

  it('limitToItemsを指定するとクラスを追加する', () => {
    expect(stack({ limitToItems: true }).className).toContain(
      'frgs-layout-limitToItems',
    );
    expect(stack({ limitToItems: false }).className).not.toContain(
      'frgs-layout-limitToItems',
    );
  });

  it('同じクラスを重複して返さない', () => {
    const classNames = stack({ itemSizeX: 100 }).className!.split(' ');
    expect(new Set(classNames).size).toBe(classNames.length);
  });
});
