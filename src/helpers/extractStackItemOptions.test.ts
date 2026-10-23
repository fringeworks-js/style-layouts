import extractStackItemOptions from './extractStackItemOptions';

describe('extractStackItemOptions', () => {
  it('stackItemのオプションを取り出す', () => {
    const options = {
      adjustX: 'grow',
      adjustY: 'fit',
      sizeX: 1,
      sizeY: 2,
      ratioX: 3,
      ratioY: 4,
    };
    expect(
      extractStackItemOptions({ ...options, itemSizeX: 5, id: 'a' }),
    ).toEqual([options, { itemSizeX: 5, id: 'a' }]);
  });
});
