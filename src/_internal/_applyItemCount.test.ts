import type { LayoutStyle } from '../types';
import applyItemCount from './_applyItemCount';

describe('applyItemCount', () => {
  it('指定した軸だけクラスと変数を設定する', () => {
    const result: LayoutStyle = {};
    applyItemCount(result, 3, undefined);
    expect(result).toEqual({
      className: 'frgs-layout-itemCountX',
      style: { '--frgs-layout-itemCountX': '3' },
    });
  });

  it('両方の軸を設定する', () => {
    const result: LayoutStyle = {};
    applyItemCount(result, 3, 2);
    expect(result).toEqual({
      className: 'frgs-layout-itemCountX frgs-layout-itemCountY',
      style: {
        '--frgs-layout-itemCountX': '3',
        '--frgs-layout-itemCountY': '2',
      },
    });
  });
});
