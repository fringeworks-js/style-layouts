import extractLayerItemOptions from './extractLayerItemOptions';

describe('extractLayerItemOptions', () => {
  it('layerItemのオプションを取り出す', () => {
    const options = {
      alignX: 'center',
      alignY: 'bottom',
      adjustX: 'grow',
      adjustY: 'fit',
      sizeX: 1,
      sizeY: 2,
      ratioX: 3,
      ratioY: 4,
    };
    expect(
      extractLayerItemOptions({ ...options, limitToItems: true, id: 'a' }),
    ).toEqual([options, { limitToItems: true, id: 'a' }]);
  });
});
