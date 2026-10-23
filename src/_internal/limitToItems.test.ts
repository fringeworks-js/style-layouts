import center from '../center/center';
import flow from '../flow/flow';
import layer from '../layer/layer';
import pin from '../pin/pin';
import stack from '../stack/stack';

describe('limitToItems', () => {
  it.each([
    ['stack', stack],
    ['flow', flow],
    ['center', center],
    ['layer', layer],
    ['pin', pin],
  ] as const)('%s: 指定した場合だけクラスを追加する', (_, layout) => {
    expect(layout({ limitToItems: true }).className).toContain(
      'frg-layout-limitToItems',
    );
    expect(layout({ limitToItems: false }).className).not.toContain(
      'frg-layout-limitToItems',
    );
    expect(layout().className).not.toContain('frg-layout-limitToItems');
  });
});
