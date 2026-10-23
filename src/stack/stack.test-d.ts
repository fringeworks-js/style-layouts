import { describe, expectTypeOf, it } from 'vitest';
import type { Direction } from '../constants';
import stack from './stack';
import stackItem from './stackItem';
import type { StackLayoutOptions } from './types';

describe('stack', () => {
  it('direction を省略すると x と同じ制限になる', () => {
    stack({ alignX: 'space-between', alignY: 'middle' });
    // @ts-expect-error direction が x（省略）の場合、alignY に space-* は指定できない
    stack({ alignY: 'space-between' });
  });

  it('direction が y の場合は alignX に space-* を指定できない', () => {
    stack({ direction: 'y', alignY: 'space-around' });
    // @ts-expect-error direction が y の場合、alignX に space-* は指定できない
    stack({ direction: 'y', alignX: 'space-around' });
  });

  it('direction を変数で渡しても、両方で有効な値なら指定できる', () => {
    const direction = 'y' as Direction;
    stack({ direction, alignX: 'left', alignY: 'top' });
  });

  it('stackItem のサイズ・縦横比は item を付けない名前で指定する', () => {
    stackItem({ adjustX: 'grow', sizeX: 100, ratioX: 1 });
    // @ts-expect-error stackItem では itemSizeX ではなく sizeX
    stackItem({ itemSizeX: 100 });
    // @ts-expect-error stackItem にコンテナのオプションは指定できない
    stackItem({ direction: 'x' });
  });

  it('null は受け付けない', () => {
    expectTypeOf<{ gap: null }>().not.toExtend<StackLayoutOptions>();
    expectTypeOf<{ itemSizeX: null }>().not.toExtend<StackLayoutOptions>();
    expectTypeOf<{ alignX: null }>().not.toExtend<StackLayoutOptions>();
  });
});
