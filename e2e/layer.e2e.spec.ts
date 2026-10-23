import { expect, test, type Page } from '@playwright/test';
import getStoryRects from './_internal/getStoryRects';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=spec-layer--${storyId}&viewMode=story`;

const gotoStory = async (page: Page, storyId: string) => {
  await page.goto(STORY_URL(storyId));
  await page.waitForSelector('.frg-layout-layer > *');
};

const ITEM_SIZE = 200;

const getChildRect = (page: Page) =>
  page
    .locator('.frg-layout-layer > *')
    .first()
    .evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      };
    });

const getChildRects = (page: Page) =>
  page.locator('.frg-layout-layer > *').evaluateAll((els) =>
    els.map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      };
    }),
  );

const getContainerRect = (page: Page) =>
  page.locator('.frg-layout-layer').evaluate((el) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
    };
  });

// ===== 重ね合わせ =====

test.describe('layer - 重ね合わせ', () => {
  test('全子要素が同じ位置に重なって配置される', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'stacking');
    const rects = await getChildRects(page);
    const first = rects[0];
    rects.forEach((rect) => {
      expect(rect.left).toBeCloseTo(first.left, 0);
      expect(rect.top).toBeCloseTo(first.top, 0);
      expect(rect.width).toBeCloseTo(first.width, 0);
      expect(rect.height).toBeCloseTo(first.height, 0);
    });
  });
});

// ===== alignX =====

test.describe('layer - alignX', () => {
  test('left: 子要素が左端に配置される', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'align-x-left');
    const child = await getChildRect(page);
    const container = await getContainerRect(page);
    expect(child.left).toBeCloseTo(container.left, 0);
  });

  test('center: 子要素が横方向で中央に配置される', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'align-x-center');
    const child = await getChildRect(page);
    const container = await getContainerRect(page);
    const childMidX = (child.left + child.right) / 2;
    const containerMidX = (container.left + container.right) / 2;
    expect(childMidX).toBeCloseTo(containerMidX, 0);
  });

  test('right: 子要素が右端に配置される', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'align-x-right');
    const child = await getChildRect(page);
    const container = await getContainerRect(page);
    expect(child.right).toBeCloseTo(container.right, 0);
  });
});

// ===== alignY =====

test.describe('layer - alignY', () => {
  test('top: 子要素が上端に配置される', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'align-y-top');
    const child = await getChildRect(page);
    const container = await getContainerRect(page);
    expect(child.top).toBeCloseTo(container.top, 0);
  });

  test('middle: 子要素が縦方向で中央に配置される', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'align-y-middle');
    const child = await getChildRect(page);
    const container = await getContainerRect(page);
    const childMidY = (child.top + child.bottom) / 2;
    const containerMidY = (container.top + container.bottom) / 2;
    expect(childMidY).toBeCloseTo(containerMidY, 0);
  });

  test('bottom: 子要素が下端に配置される', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'align-y-bottom');
    const child = await getChildRect(page);
    const container = await getContainerRect(page);
    expect(child.bottom).toBeCloseTo(container.bottom, 0);
  });
});

// ===== adjustX =====

test.describe('layer - adjustX', () => {
  test.describe('grow', () => {
    test('親幅 > itemSize: 親幅まで広がる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await gotoStory(page, 'adjust-x-grow');
      const child = await getChildRect(page);
      const container = await getContainerRect(page);
      expect(child.width).toBeGreaterThanOrEqual(ITEM_SIZE);
      expect(child.width).toBeCloseTo(container.width, 0);
    });

    test('親幅 < itemSize: itemSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: 100, height: 600 });
      await gotoStory(page, 'adjust-x-grow');
      const child = await getChildRect(page);
      expect(child.width).toBeCloseTo(ITEM_SIZE, 0);
    });
  });

  test.describe('shrink', () => {
    test('親幅 > itemSize: itemSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await gotoStory(page, 'adjust-x-shrink');
      const child = await getChildRect(page);
      expect(child.width).toBeCloseTo(ITEM_SIZE, 0);
    });

    test('親幅 < itemSize: 親幅に合わせて縮む', async ({ page }) => {
      await page.setViewportSize({ width: 100, height: 600 });
      await gotoStory(page, 'adjust-x-shrink');
      const child = await getChildRect(page);
      const container = await getContainerRect(page);
      expect(child.width).toBeLessThan(ITEM_SIZE);
      expect(child.width).toBeCloseTo(container.width, 0);
    });
  });

  test.describe('fit', () => {
    test('親幅 > itemSize: 親幅まで広がる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await gotoStory(page, 'adjust-x-fit');
      const child = await getChildRect(page);
      const container = await getContainerRect(page);
      expect(child.width).toBeCloseTo(container.width, 0);
    });

    test('親幅 < itemSize: 親幅に合わせて縮む', async ({ page }) => {
      await page.setViewportSize({ width: 100, height: 600 });
      await gotoStory(page, 'adjust-x-fit');
      const child = await getChildRect(page);
      const container = await getContainerRect(page);
      expect(child.width).toBeCloseTo(container.width, 0);
    });
  });
});

// ===== adjustY =====

test.describe('layer - adjustY', () => {
  test.describe('grow', () => {
    test('親高さ > itemSize: 親高さまで広がる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await gotoStory(page, 'adjust-y-grow');
      const child = await getChildRect(page);
      const container = await getContainerRect(page);
      expect(child.height).toBeGreaterThanOrEqual(ITEM_SIZE);
      expect(child.height).toBeCloseTo(container.height, 0);
    });

    test('親高さ < itemSize: itemSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 100 });
      await gotoStory(page, 'adjust-y-grow');
      const child = await getChildRect(page);
      expect(child.height).toBeCloseTo(ITEM_SIZE, 0);
    });
  });

  test.describe('shrink', () => {
    test('親高さ > itemSize: itemSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await gotoStory(page, 'adjust-y-shrink');
      const child = await getChildRect(page);
      expect(child.height).toBeCloseTo(ITEM_SIZE, 0);
    });

    test('親高さ < itemSize: 親高さに合わせて縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 100 });
      await gotoStory(page, 'adjust-y-shrink');
      const child = await getChildRect(page);
      const container = await getContainerRect(page);
      expect(child.height).toBeLessThan(ITEM_SIZE);
      expect(child.height).toBeCloseTo(container.height, 0);
    });
  });

  test.describe('fit', () => {
    test('親高さ > itemSize: 親高さまで広がる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await gotoStory(page, 'adjust-y-fit');
      const child = await getChildRect(page);
      const container = await getContainerRect(page);
      expect(child.height).toBeCloseTo(container.height, 0);
    });

    test('親高さ < itemSize: 親高さに合わせて縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 100 });
      await gotoStory(page, 'adjust-y-fit');
      const child = await getChildRect(page);
      const container = await getContainerRect(page);
      expect(child.height).toBeCloseTo(container.height, 0);
    });
  });
});

// ===== itemRatio =====

test.describe('layer - itemRatio', () => {
  test('itemRatioX=1,itemRatioY=1 のとき子要素が正方形になる', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'child-ratio');
    const child = await getChildRect(page);
    expect(child.height / child.width).toBeCloseTo(1, 1);
  });
});

// ===== adjust（itemSizeなし・子要素の中身が親より大きい） =====

const CONTENT_SIZE = 300;

test.describe('layer - adjust（itemSizeなし）', () => {
  test('adjustX shrink: 親幅 > 中身: 中身の幅のまま', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'adjust-x-shrink-content');
    const child = await getChildRect(page);
    expect(child.width).toBeCloseTo(CONTENT_SIZE, 0);
  });

  test('adjustX shrink: 親幅 < 中身: 親幅に合わせて縮む', async ({ page }) => {
    await page.setViewportSize({ width: 200, height: 600 });
    await gotoStory(page, 'adjust-x-shrink-content');
    const child = await getChildRect(page);
    const container = await getContainerRect(page);
    expect(child.width).toBeCloseTo(container.width, 0);
  });

  test('adjustX fit: 親幅 < 中身: 親幅に合わせて縮む', async ({ page }) => {
    await page.setViewportSize({ width: 200, height: 600 });
    await gotoStory(page, 'adjust-x-fit-content');
    const child = await getChildRect(page);
    const container = await getContainerRect(page);
    expect(child.width).toBeCloseTo(container.width, 0);
  });

  test('adjustY shrink: 親高さ > 中身: 中身の高さのまま', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await gotoStory(page, 'adjust-y-shrink-content');
    const child = await getChildRect(page);
    const container = await getContainerRect(page);
    expect(child.height).toBeGreaterThanOrEqual(CONTENT_SIZE);
    expect(child.height).toBeLessThan(container.height);
  });

  test('adjustY shrink: 親高さ < 中身: 親高さに合わせて縮む', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 200 });
    await gotoStory(page, 'adjust-y-shrink-content');
    const child = await getChildRect(page);
    const container = await getContainerRect(page);
    expect(child.height).toBeCloseTo(container.height, 0);
  });

  test('adjustY fit: 親高さ < 中身: 親高さに合わせて縮む', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 200 });
    await gotoStory(page, 'adjust-y-fit-content');
    const child = await getChildRect(page);
    const container = await getContainerRect(page);
    expect(child.height).toBeCloseTo(container.height, 0);
  });
});

// ===== layerItem =====

test.describe('layer - layerItem', () => {
  for (const key of ['a', 'b', 'ratio']) {
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
    const { container, children } = await getStoryRects(page);
    const [first, second, third] = children;
    // 指定なし: コンテナの指定（左寄せ・幅100）
    expect(first!.left).toBeCloseTo(container.left, 0);
    expect(first!.width).toBeCloseTo(100, 0);
    // alignX: right で上書き
    expect(second!.left + second!.width).toBeCloseTo(
      container.left + container.width,
      0,
    );
    // adjustX: grow で上書き
    expect(third!.width).toBeCloseTo(container.width, 0);
  });

  test('limitToItems: layerItemを適用した子要素だけが対象になる', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'limit-to-items');
    const { container, children } = await getStoryRects(page);
    const [first, second] = children;
    expect(first!.width).toBeCloseTo(100, 0);
    expect(first!.top).toBeCloseTo(container.top, 0);
    // 未適用: 重ねる位置（grid-area: 1 / 1）が適用されず、次の行に並ぶ（重ならない）
    expect(second!.top).toBeGreaterThanOrEqual(first!.top + first!.height);
  });
});

// ===== 重なり順 =====

test.describe('layer - 重なり順', () => {
  test('offsetZで重なり順を変える', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'offset-z');
    const { container } = await getStoryRects(page);
    // DOMの順では2つ目が手前だが、offsetZ: 2 の1つ目が手前になる
    const label = await page.evaluate(
      ([x, y]) => document.elementFromPoint(x!, y!)?.textContent ?? null,
      [container.left + 10, container.top + 10],
    );
    expect(label).toBe('1');
  });
});
