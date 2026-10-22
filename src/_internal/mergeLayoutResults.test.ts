import mergeLayoutResults from './mergeLayoutResults';

describe('mergeLayoutResults', () => {
  it('クラスを結合し、スタイルは後のものを優先して統合する', () => {
    expect(
      mergeLayoutResults([
        { className: 'a', style: { '--x': '1', '--y': '1' } },
        { style: { '--y': '2' } },
        { className: 'b' },
      ]),
    ).toEqual({ className: 'a b', style: { '--x': '1', '--y': '2' } });
  });

  it('空の配列なら空のオブジェクトを返す', () => {
    expect(mergeLayoutResults([])).toEqual({});
  });
});
