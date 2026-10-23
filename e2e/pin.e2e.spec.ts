import { expect, test, type Page } from '@playwright/test';
import getStoryRects from './_internal/getStoryRects';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=spec-pin--${storyId}&viewMode=story`;

const gotoStory = async (page: Page, storyId: string) => {
  await page.goto(STORY_URL(storyId));
  await page.waitForSelector('.frg-layout-pin > *');
};

const getChildRects = (page: Page) =>
  page.locator('.frg-layout-pin > *').evaluateAll((els) =>
    els.map((el) => {
      const rect = el.getBoundingClientRect();
      const parent = el.parentElement!.getBoundingClientRect();
      return {
        left: rect.left - parent.left,
        top: rect.top - parent.top,
        width: rect.width,
        height: rect.height,
      };
    }),
  );

// ===== 位置指定 =====

test.describe('pin - 位置指定', () => {
  test('子要素が指定のtop/leftに配置される', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'default');
    const rects = await getChildRects(page);

    expect(rects[0].left).toBeCloseTo(0, 0);
    expect(rects[0].top).toBeCloseTo(0, 0);
    expect(rects[1].left).toBeCloseTo(100, 0);
    expect(rects[1].top).toBeCloseTo(50, 0);
    expect(rects[2].left).toBeCloseTo(200, 0);
    expect(rects[2].top).toBeCloseTo(100, 0);
  });
});

// ===== itemSize =====

test.describe('pin - itemSize', () => {
  test('itemSizeX/itemSizeYが指定された場合に子要素のサイズが一致する', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'with-item-size');
    const rects = await getChildRects(page);

    rects.forEach((r) => {
      expect(r.width).toBeCloseTo(100, 0);
      expect(r.height).toBeCloseTo(80, 0);
    });
  });

  test('itemSizeX/itemSizeYありで指定のtop/leftに配置される', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'with-item-size');
    const rects = await getChildRects(page);

    expect(rects[0].left).toBeCloseTo(0, 0);
    expect(rects[0].top).toBeCloseTo(0, 0);
    expect(rects[1].left).toBeCloseTo(150, 0);
    expect(rects[1].top).toBeCloseTo(100, 0);
    expect(rects[2].left).toBeCloseTo(300, 0);
    expect(rects[2].top).toBeCloseTo(200, 0);
  });
});

// ===== itemRatio =====

test.describe('pin - itemRatio', () => {
  test('itemRatioX=1,itemRatioY=1 のとき子要素が正方形になる', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'with-child-ratio');
    const rects = await getChildRects(page);
    rects.forEach((r) => expect(r.height / r.width).toBeCloseTo(1, 1));
  });
});

// ===== pinItem =====

test.describe('pin - pinItem', () => {
  for (const key of ['size', 'ratio']) {
    test(`コンテナで指定した場合と同じ結果になる（${key}）`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await gotoStory(page, `equivalent-${key}-container`);
      const expected = await getStoryRects(page);
      await gotoStory(page, `equivalent-${key}-item`);
      const actual = await getStoryRects(page);
      expect(actual).toEqual(expected);
    });
  }

  test('アイテムの指定でコンテナの指定を上書きする', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'item-override');
    const { children } = await getStoryRects(page);
    expect(children.map((c) => Math.round(c.width))).toEqual([100, 50]);
  });

  test('limitToItems: pinItemを適用した子要素だけが対象になる', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'limit-to-items');
    const { container, children } = await getStoryRects(page);
    expect(children[0]!.width).toBeCloseTo(100, 0);
    // 未適用: position: absolute が適用されず、ブロック要素として親の幅に広がる
    expect(children[1]!.width).toBeCloseTo(container.width, 0);
  });
});

// ===== オフセット =====

/**
 * 指定した位置で一番手前にある子要素のラベル
 */
const getTopLabelAt = (page: Page, x: number, y: number) =>
  page.evaluate(
    ([px, py]) => document.elementFromPoint(px!, py!)?.textContent ?? null,
    [x, y],
  );

test.describe('pin - オフセット', () => {
  test('コンテナで指定した場合とアイテムで指定した場合で同じ結果になる', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'offset-equivalent-container');
    const expected = await getStoryRects(page);
    await gotoStory(page, 'offset-equivalent-item');
    const actual = await getStoryRects(page);
    expect(actual).toEqual(expected);

    // 右下の辺からの距離（横: 20px、縦: 親の高さの10%）
    const { container, children } = expected;
    const child = children[0]!;
    expect(child.left + child.width).toBeCloseTo(
      container.left + container.width - 20,
      0,
    );
    expect(child.top + child.height).toBeCloseTo(
      container.top + container.height * 0.9,
      0,
    );
  });

  test('アイテムのオフセットでコンテナの指定を上書きする', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'offset-override');
    const { container, children } = await getStoryRects(page);
    const [first, second] = children;
    expect(first!.left).toBeCloseTo(container.left + 10, 0);
    expect(first!.top).toBeCloseTo(container.top + 10, 0);
    // alignX: right, offsetX: 30 で上書き（縦はコンテナの指定）
    expect(second!.left + second!.width).toBeCloseTo(
      container.left + container.width - 30,
      0,
    );
    expect(second!.top).toBeCloseTo(container.top + 10, 0);
  });

  test('offsetZで重なり順を変える', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'offset-z');
    const { container } = await getStoryRects(page);
    // DOMの順では2つ目が手前だが、offsetZ: 2 の1つ目が手前になる
    expect(
      await getTopLabelAt(page, container.left + 10, container.top + 10),
    ).toBe('1');
  });
});
