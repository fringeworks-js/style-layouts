import stackItem from './stackItem';

describe('stackItem', () => {
  it('オプションを省略するとアイテムのクラスだけを返す', () => {
    expect(stackItem()).toEqual({
      className: 'frg-layout-stack-item',
      style: {},
    });
  });

  it('オプションをクラスと変数に変換する', () => {
    expect(
      stackItem({
        adjustX: 'grow',
        adjustY: 'none',
        sizeX: 100,
        sizeY: 0,
        ratioX: 16,
        ratioY: 9,
      }),
    ).toEqual({
      className:
        'frg-layout-stack-item frg-layout-stack-item-adjustX frg-layout-stack-item-adjustX-grow frg-layout-stack-item-adjustY frg-layout-stack-item-adjustY-none frg-layout-stack-item-sizeX frg-layout-stack-item-sizeY frg-layout-stack-item-ratio',
      style: {
        '--frg-layout-stack-item-sizeX': '100px',
        '--frg-layout-stack-item-sizeY': '0px',
        '--frg-layout-stack-item-ratio': '16 / 9',
      },
    });
  });

  it('縦横比は片方だけ指定した場合、もう片方は1になる', () => {
    expect(stackItem({ ratioY: 2 }).style).toEqual({
      '--frg-layout-stack-item-ratio': '1 / 2',
    });
  });

  it('NaN・Infinityのサイズは指定しなかったものとして扱う', () => {
    expect(stackItem({ sizeX: NaN, sizeY: Infinity })).toEqual({
      className: 'frg-layout-stack-item',
      style: {},
    });
  });
});
