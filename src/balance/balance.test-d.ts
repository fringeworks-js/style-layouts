import { describe, it } from 'vitest';
import balance from './balance';

describe('balance', () => {
  it('direction を省略すると x と同じ制限になる', () => {
    balance({ alignX: 'space-evenly' });
    // @ts-expect-error direction が x（省略）の場合、alignY に space-* は指定できない
    balance({ alignY: 'space-evenly' });
  });

  it('direction が y の場合は alignX に space-* を指定できない', () => {
    balance({ direction: 'y', alignY: 'space-evenly' });
    // @ts-expect-error direction が y の場合、alignX に space-* は指定できない
    balance({ direction: 'y', alignX: 'space-evenly' });
  });
});
