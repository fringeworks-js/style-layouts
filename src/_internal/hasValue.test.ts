import hasValue from './hasValue';

describe('hasValue', () => {
  it.each([0, -1, 1.5, 'a', '0', true, false])('%j は有効', (value) => {
    expect(hasValue(value)).toBe(true);
  });

  it.each([NaN, Infinity, -Infinity, '', null, undefined])(
    '%j は無効',
    (value) => {
      expect(hasValue(value)).toBe(false);
    },
  );
});
