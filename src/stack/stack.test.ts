import stack from './stack';

describe('stack', () => {
  it('オプションを省略すると既定値のクラスと間隔を返す', () => {
    expect(stack()).toEqual({
      className:
        'frg-layout-stack frg-layout-direction-x frg-layout-alignX-left frg-layout-alignY-top frg-layout-adjustX-none frg-layout-adjustY-none',
      style: { '--frg-layout-gapX': '0px', '--frg-layout-gapY': '0px' },
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
        'frg-layout-stack frg-layout-direction-y frg-layout-alignX-center frg-layout-alignY-spaceBetween frg-layout-adjustX-fit frg-layout-adjustY-grow frg-layout-itemSizeX frg-layout-itemSizeY frg-layout-itemRatio',
      style: {
        '--frg-layout-gapX': '8px',
        '--frg-layout-gapY': '4px',
        '--frg-layout-itemSizeX': '100px',
        '--frg-layout-itemSizeY': '50px',
        '--frg-layout-itemRatio': '16 / 9',
      },
    });
  });

  it('limitToItemsを指定するとクラスを追加する', () => {
    expect(stack({ limitToItems: true }).className).toContain(
      'frg-layout-limitToItems',
    );
    expect(stack({ limitToItems: false }).className).not.toContain(
      'frg-layout-limitToItems',
    );
  });

  it('同じクラスを重複して返さない', () => {
    const classNames = stack({ itemSizeX: 100 }).className!.split(' ');
    expect(new Set(classNames).size).toBe(classNames.length);
  });
});
