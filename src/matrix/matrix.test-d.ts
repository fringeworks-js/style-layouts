import { describe, it } from 'vitest';
import matrix from './matrix';

describe('matrix', () => {
  it('オプションは省略できない', () => {
    // @ts-expect-error 列と行の指定が必要
    matrix();
  });

  it('各軸で itemCount か tracks のどちらか一方が必要', () => {
    matrix({ itemCountX: 3, itemCountY: 2 });
    matrix({ tracksX: [100, '1fr'], itemCountY: 2 });
    // @ts-expect-error 行の指定が無い
    matrix({ itemCountX: 3 });
    // @ts-expect-error itemCountX に undefined は指定できない
    matrix({ itemCountX: undefined, itemCountY: 2 });
    // @ts-expect-error itemCount と tracks は同時に指定できない
    matrix({ itemCountX: 3, tracksX: [100], itemCountY: 2 });
  });

  it('itemSize は itemCount と組み合わせて使う', () => {
    matrix({ itemCountX: 3, itemSizeX: 100, itemCountY: 2 });
    // @ts-expect-error tracks と itemSize は同時に指定できない
    matrix({ tracksX: [100], itemSizeX: 100, itemCountY: 2 });
  });
});
