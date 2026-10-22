import unit from './unit';

describe('unit', () => {
  it('数値に単位を付ける', () => {
    expect(unit(10)).toBe('10px');
    expect(unit(0)).toBe('0px');
    expect(unit(1.5, 'rem')).toBe('1.5rem');
  });

  it('文字列はそのまま返す', () => {
    expect(unit('50%')).toBe('50%');
  });

  it('null・undefinedはそのまま返す', () => {
    expect(unit(null)).toBeNull();
    expect(unit(undefined)).toBeUndefined();
  });
});
