import pin from './pin';

describe('pin', () => {
  it('オプションを省略するとクラスだけを返す', () => {
    expect(pin()).toEqual({ className: 'frg-layout-pin', style: {} });
  });

  it('オプションをクラスと変数に変換する', () => {
    expect(pin({ itemSizeX: 100, itemSizeY: 80 })).toEqual({
      className: 'frg-layout-pin frg-layout-itemSizeX frg-layout-itemSizeY',
      style: {
        '--frg-layout-itemSizeX': '100px',
        '--frg-layout-itemSizeY': '80px',
      },
    });
  });
});
