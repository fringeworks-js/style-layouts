import pack from './pack';

describe('pack', () => {
  it('オプションを省略すると既定値のクラスと間隔を返す', () => {
    expect(pack()).toEqual({
      className: 'frgs-layout-pack frgs-layout-direction-x',
      style: { '--frgs-layout-gapX': '0px', '--frgs-layout-gapY': '0px' },
    });
  });

  it('オプションをクラスと変数に変換する', () => {
    expect(pack({ direction: 'y', gap: 8, gapX: 4 })).toEqual({
      className: 'frgs-layout-pack frgs-layout-direction-y',
      style: { '--frgs-layout-gapX': '4px', '--frgs-layout-gapY': '8px' },
    });
  });
});
