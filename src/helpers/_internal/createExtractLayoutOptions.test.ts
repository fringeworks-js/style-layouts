import createExtractLayoutOptions from './createExtractLayoutOptions';

describe('createExtractLayoutOptions', () => {
  const extract = createExtractLayoutOptions<{ gap?: number; gapX?: number }>([
    'gap',
    'gapX',
  ]);

  it('レイアウトのオプションとそれ以外を分ける', () => {
    expect(extract({ gap: 8, id: 'a', className: 'b' })).toEqual([
      { gap: 8 },
      { id: 'a', className: 'b' },
    ]);
  });

  it('値がundefinedのキーも、キーの種類で振り分ける', () => {
    expect(extract({ gapX: undefined, title: undefined })).toEqual([
      { gapX: undefined },
      { title: undefined },
    ]);
  });

  it('空のオブジェクトなら両方とも空になる', () => {
    expect(extract({})).toEqual([{}, {}]);
  });
});
