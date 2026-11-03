import stackItem from './stackItem';

describe('stackItem', () => {
  it('オプションを省略するとアイテムのクラスだけを返す', () => {
    expect(stackItem()).toEqual({
      className: 'frgs-layout-stack-item',
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
        'frgs-layout-stack-item frgs-layout-stack-item-adjustX frgs-layout-stack-item-adjustX-grow frgs-layout-stack-item-adjustY frgs-layout-stack-item-adjustY-none frgs-layout-stack-item-sizeX frgs-layout-stack-item-sizeY frgs-layout-stack-item-ratio',
      style: {
        '--frgs-layout-stack-item-sizeX': '100px',
        '--frgs-layout-stack-item-sizeY': '0px',
        '--frgs-layout-stack-item-ratio': '16 / 9',
      },
    });
  });

  it('縦横比は片方だけ指定した場合、もう片方は1になる', () => {
    expect(stackItem({ ratioY: 2 }).style).toEqual({
      '--frgs-layout-stack-item-ratio': '1 / 2',
    });
  });

  it('NaN・Infinityのサイズは指定しなかったものとして扱う', () => {
    expect(stackItem({ sizeX: NaN, sizeY: Infinity })).toEqual({
      className: 'frgs-layout-stack-item',
      style: {},
    });
  });
});
