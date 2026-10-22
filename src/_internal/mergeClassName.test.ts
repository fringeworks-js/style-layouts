import mergeClassName from './mergeClassName';

describe('mergeClassName', () => {
  it('空の値を除いて空白で結合する', () => {
    expect(mergeClassName('a', undefined, '', null, 'b')).toBe('a b');
  });

  it('すべて空なら空文字を返す', () => {
    expect(mergeClassName(undefined, null)).toBe('');
  });
});
