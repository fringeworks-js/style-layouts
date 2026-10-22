import extractMatrixOptions from './extractMatrixOptions';

describe('extractMatrixOptions', () => {
  it('matrixのオプションをすべて取り出す', () => {
    const options = {
      direction: 'y',
      alignX: 'center',
      alignY: 'middle',
      adjustX: 'fit',
      adjustY: 'grow',
      gap: 1,
      gapX: 2,
      gapY: 3,
      itemSizeX: 4,
      itemSizeY: 5,
      itemRatioX: 6,
      itemRatioY: 7,
      itemCountX: 8,
      itemCountY: 9,
      tracksX: [10],
      tracksY: [11],
    };
    expect(extractMatrixOptions({ ...options, id: 'a' })).toEqual([
      options,
      { id: 'a' },
    ]);
  });
});
