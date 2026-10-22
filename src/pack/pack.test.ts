import pack from './pack';

describe('pack', () => {
  it('オプションを省略すると既定値のクラスと間隔を返す', () => {
    expect(pack()).toEqual({
      className: 'frg-layout-pack frg-layout-direction-x',
      style: { '--frg-layout-gapX': '0px', '--frg-layout-gapY': '0px' },
    });
  });

  it('オプションをクラスと変数に変換する', () => {
    expect(pack({ direction: 'y', gap: 8, gapX: 4 })).toEqual({
      className: 'frg-layout-pack frg-layout-direction-y',
      style: { '--frg-layout-gapX': '4px', '--frg-layout-gapY': '8px' },
    });
  });
});
