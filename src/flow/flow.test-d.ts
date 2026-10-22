import { describe, it } from 'vitest';
import flow from './flow';

describe('flow', () => {
  it('direction を省略すると x と同じ制限になる', () => {
    flow({ adjustX: 'fit' });
    // @ts-expect-error direction が x（省略）の場合、adjustY に none 以外は指定できない
    flow({ adjustY: 'fit' });
  });

  it('direction が y の場合は adjustX に none 以外を指定できない', () => {
    flow({ direction: 'y', adjustY: 'grow' });
    // @ts-expect-error direction が y の場合、adjustX に none 以外は指定できない
    flow({ direction: 'y', adjustX: 'grow' });
  });
});
