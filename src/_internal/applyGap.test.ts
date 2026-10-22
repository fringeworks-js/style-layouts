import type { LayoutStyle } from '../types';
import applyGap from './applyGap';

describe('applyGap', () => {
  it('gapX・gapYを省略するとgapを使う', () => {
    const result: LayoutStyle = {};
    applyGap(result, 8, undefined, undefined);
    expect(result).toEqual({
      style: { '--frg-layout-gapX': '8px', '--frg-layout-gapY': '8px' },
    });
  });

  it('gapX・gapYはgapより優先する', () => {
    const result: LayoutStyle = {};
    applyGap(result, 8, 4, 0);
    expect(result.style).toEqual({
      '--frg-layout-gapX': '4px',
      '--frg-layout-gapY': '0px',
    });
  });

  it('クラスは付けない', () => {
    const result: LayoutStyle = { className: 'a' };
    applyGap(result, 0, undefined, undefined);
    expect(result.className).toBe('a');
  });
});
