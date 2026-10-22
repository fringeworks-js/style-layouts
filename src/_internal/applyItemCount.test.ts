import type { LayoutStyle } from '../types';
import applyItemCount from './applyItemCount';

describe('applyItemCount', () => {
  it('指定した軸だけクラスと変数を設定する', () => {
    const result: LayoutStyle = {};
    applyItemCount(result, 3, undefined);
    expect(result).toEqual({
      className: 'frg-layout-itemCountX',
      style: { '--frg-layout-itemCountX': '3' },
    });
  });

  it('両方の軸を設定する', () => {
    const result: LayoutStyle = {};
    applyItemCount(result, 3, 2);
    expect(result).toEqual({
      className: 'frg-layout-itemCountX frg-layout-itemCountY',
      style: {
        '--frg-layout-itemCountX': '3',
        '--frg-layout-itemCountY': '2',
      },
    });
  });
});
