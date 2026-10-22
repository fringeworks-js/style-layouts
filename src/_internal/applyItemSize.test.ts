import type { LayoutStyle } from '../types';
import applyItemSize from './applyItemSize';

describe('applyItemSize', () => {
  it('指定した軸だけクラスと変数を設定する', () => {
    const result: LayoutStyle = {};
    applyItemSize(result, 100, undefined);
    expect(result).toEqual({
      className: 'frg-layout-itemSizeX',
      style: { '--frg-layout-itemSizeX': '100px' },
    });
  });

  it('両方の軸を設定する', () => {
    const result: LayoutStyle = {};
    applyItemSize(result, 100, 0);
    expect(result).toEqual({
      className: 'frg-layout-itemSizeX frg-layout-itemSizeY',
      style: {
        '--frg-layout-itemSizeX': '100px',
        '--frg-layout-itemSizeY': '0px',
      },
    });
  });

  it('未指定なら何もしない（子要素で使う変数のため既定値も出力しない）', () => {
    const result: LayoutStyle = {};
    applyItemSize(result, undefined, undefined);
    expect(result).toEqual({});
  });

  it('NaN・Infinityは無効な値として扱う', () => {
    const result: LayoutStyle = {};
    applyItemSize(result, NaN, Infinity);
    expect(result).toEqual({});
  });
});
