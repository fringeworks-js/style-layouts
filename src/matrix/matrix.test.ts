import matrix from './matrix';
import type { MatrixLayoutOptions } from './types';

describe('matrix', () => {
  it('itemCountをクラスと変数に変換する', () => {
    expect(matrix({ itemCountX: 3, itemCountY: 2 })).toEqual({
      className:
        'frg-layout-matrix frg-layout-direction-x frg-layout-alignX-left frg-layout-alignY-top frg-layout-adjustX-none frg-layout-adjustY-none frg-layout-itemCountX frg-layout-itemCountY',
      style: {
        '--frg-layout-gapX': '0px',
        '--frg-layout-gapY': '0px',
        '--frg-layout-itemCountX': '3',
        '--frg-layout-itemCountY': '2',
      },
    });
  });

  it('itemSizeはitemCountと組み合わせて使う', () => {
    const { className, style } = matrix({
      itemCountX: 3,
      itemSizeX: 100,
      itemCountY: 2,
    });
    expect(className).toContain('frg-layout-itemSizeX');
    expect(style).toMatchObject({ '--frg-layout-itemSizeX': '100px' });
  });

  describe('tracks', () => {
    const getTemplateX = (options: MatrixLayoutOptions) =>
      matrix(options).style?.['--frg-layout-templateX'];

    it('adjustなし: 値をそのまま並べる（数値はpx）', () => {
      expect(
        getTemplateX({ tracksX: [100, '1fr', '20%'], itemCountY: 1 }),
      ).toBe('100px 1fr 20%');
    });

    it('fit: pxの値をfrの比率に置き換える', () => {
      expect(
        getTemplateX({
          tracksX: [100, '300px'],
          itemCountY: 1,
          adjustX: 'fit',
        }),
      ).toBe('minmax(0, 100fr) minmax(0, 300fr)');
    });

    it('grow: pxの値を最小にしてfrの比率で伸ばす', () => {
      expect(
        getTemplateX({ tracksX: [100, 300], itemCountY: 1, adjustX: 'grow' }),
      ).toBe('minmax(100px, 100fr) minmax(300px, 300fr)');
    });

    it('shrink: 比率で分けたサイズと指定のサイズの小さい方を上限にする', () => {
      expect(
        getTemplateX({
          tracksX: [100, 300],
          itemCountY: 1,
          adjustX: 'shrink',
        }),
      ).toBe(
        'minmax(0, min(calc((100% - var(--frg-layout-gapX) * 1) * 100 / 400), 100px)) minmax(0, min(calc((100% - var(--frg-layout-gapX) * 1) * 300 / 400), 300px))',
      );
    });

    it('px以外の値: frはそのまま、それ以外はadjustに合わせてminmaxにする', () => {
      expect(
        getTemplateX({
          tracksX: ['1fr', '20%'],
          itemCountY: 1,
          adjustX: 'fit',
        }),
      ).toBe('1fr minmax(0, 20%)');
      expect(
        getTemplateX({
          tracksX: ['1fr', '20%'],
          itemCountY: 1,
          adjustX: 'grow',
        }),
      ).toBe('1fr minmax(20%, 1fr)');
    });

    it('pxとして解釈できない文字列はpx以外として扱う', () => {
      expect(
        getTemplateX({
          tracksX: ['1.2.3px', '.5px'],
          itemCountY: 1,
          adjustX: 'fit',
        }),
      ).toBe('minmax(0, 1.2.3px) minmax(0, 0.5fr)');
    });

    it('tracksYはitemCountYの代わりに使い、クラスと変数を設定する', () => {
      const { className, style } = matrix({
        itemCountX: 2,
        tracksY: [50, 50],
      });
      expect(className).toContain('frg-layout-templateY');
      expect(className).not.toContain('frg-layout-itemCountY');
      expect(style).toMatchObject({ '--frg-layout-templateY': '50px 50px' });
    });
  });
});
