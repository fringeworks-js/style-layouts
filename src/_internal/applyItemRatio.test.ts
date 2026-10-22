import type { LayoutStyle } from '../types';
import applyItemRatio from './applyItemRatio';

describe('applyItemRatio', () => {
  it('縦横比を設定する', () => {
    const result: LayoutStyle = {};
    applyItemRatio(result, 16, 9);
    expect(result).toEqual({
      className: 'frg-layout-itemRatio',
      style: { '--frg-layout-itemRatio': '16 / 9' },
    });
  });

  it('片方だけ指定した場合、もう片方は1になる', () => {
    const result: LayoutStyle = {};
    applyItemRatio(result, undefined, 2);
    expect(result.style).toEqual({ '--frg-layout-itemRatio': '1 / 2' });
  });

  it('未指定なら何もしない', () => {
    const result: LayoutStyle = {};
    applyItemRatio(result, undefined, undefined);
    expect(result).toEqual({});
  });
});
