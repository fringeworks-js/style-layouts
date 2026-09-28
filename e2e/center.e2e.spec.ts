import { expect, test, type Page } from '@playwright/test';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=spec-center--${storyId}&viewMode=story`;

const gotoStory = async (page: Page, storyId: string) => {
  await page.goto(STORY_URL(storyId));
  await page.waitForSelector('.lx-layout-center > *');
};

const ITEM_SIZE = 200;
const ITEM_COUNT = 3;
const ITEMS_SIZE = ITEM_SIZE * ITEM_COUNT;

const getChildWidths = (page: Page) =>
  page
    .locator('.lx-layout-center > *')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width));

const getChildHeights = (page: Page) =>
  page
    .locator('.lx-layout-center > *')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));

const getChildXRects = (page: Page) =>
  page.locator('.lx-layout-center > *').evaluateAll((els) =>
    els.map((el) => {
      const rect = el.getBoundingClientRect();
      return { left: rect.left, right: rect.right, width: rect.width };
    }),
  );

const getChildYRects = (page: Page) =>
  page.locator('.lx-layout-center > *').evaluateAll((els) =>
    els.map((el) => {
      const rect = el.getBoundingClientRect();
      return { top: rect.top, bottom: rect.bottom, height: rect.height };
    }),
  );

const getContainerRect = (page: Page) =>
  page.locator('.lx-layout-center').evaluate((el) => {
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

// ===== direction:x センタリング =====

test.describe('center - direction:x センタリング', () => {
  test('子要素グループが横方向で中央揃えされる', async ({ page }) => {
    await page.setViewportSize({ width: ITEMS_SIZE + 300, height: 600 });
    await gotoStory(page, 'direction-x-centering');
    const childRects = await getChildXRects(page);
    const container = await getContainerRect(page);
    const leftMargin = childRects[0].left - container.left;
    const rightMargin = container.right - childRects[ITEM_COUNT - 1].right;
    expect(leftMargin).toBeCloseTo(rightMargin, 0);
  });

  test('各子要素が縦方向で中央揃えされる', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-centering');
    const childRects = await getChildYRects(page);
    const container = await getContainerRect(page);
    childRects.forEach((rect) => {
      const topMargin = rect.top - container.top;
      const bottomMargin = container.bottom - rect.bottom;
      expect(topMargin).toBeCloseTo(bottomMargin, 0);
    });
  });
});

// ===== direction:x 主軸(adjustX) =====

test.describe('center - direction:x 主軸(adjustX)', () => {
  test.describe('grow', () => {
    test('親幅 > itemSize: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: ITEMS_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-grow');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThanOrEqual(ITEM_SIZE));
    });

    test('親幅 < itemSize: itemSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: ITEMS_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-grow');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });
  });

  test.describe('shrink', () => {
    test('親幅 > itemSize: itemSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: ITEMS_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-shrink');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親幅 < itemSize: itemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: ITEMS_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-shrink');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(ITEM_SIZE));
    });
  });

  test.describe('fit', () => {
    test('親幅 > itemSize: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: ITEMS_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-fit');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThan(ITEM_SIZE));
    });

    test('親幅 < itemSize: itemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: ITEMS_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-fit');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(ITEM_SIZE));
    });
  });

  test.describe('none', () => {
    test('親幅 > itemSize: itemSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: ITEMS_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-none');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親幅 < itemSize: itemSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: ITEMS_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-none');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });
  });
});

// ===== direction:x 交差軸(adjustY) =====

test.describe('center - direction:x 交差軸(adjustY)', () => {
  test.describe('grow', () => {
    test('親高さ > 子の自然な高さ: 親高さに合わせて伸びる', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: 400 });
      await gotoStory(page, 'direction-x-adjust-y-grow');
      const heights = await getChildHeights(page);
      const first = heights[0];
      heights.forEach((h) => expect(h).toBeCloseTo(first, 0));
      expect(first).toBeGreaterThan(0);
    });
  });

  test.describe('shrink', () => {
    test('親高さ < itemSize: itemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEMS_SIZE - 50 });
      await gotoStory(page, 'direction-x-adjust-y-shrink');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThanOrEqual(ITEM_SIZE));
    });

    test('親高さ > itemSize: itemSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEMS_SIZE + 200 });
      await gotoStory(page, 'direction-x-adjust-y-shrink');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });
  });

  test.describe('fit', () => {
    test('親高さに合わせて伸縮する', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 400 });
      await gotoStory(page, 'direction-x-adjust-y-fit');
      const heights = await getChildHeights(page);
      const first = heights[0];
      heights.forEach((h) => expect(h).toBeCloseTo(first, 0));
      expect(first).toBeGreaterThan(0);
    });
  });

  test.describe('none', () => {
    test('親高さに関わらず子の高さは itemSize のまま', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEMS_SIZE + 200 });
      await gotoStory(page, 'direction-x-adjust-y-none');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });
  });
});

// ===== direction:y センタリング =====

test.describe('center - direction:y センタリング', () => {
  test('子要素グループが縦方向で中央揃えされる', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: ITEMS_SIZE + 300 });
    await gotoStory(page, 'direction-y-centering');
    const childRects = await getChildYRects(page);
    const container = await getContainerRect(page);
    const topMargin = childRects[0].top - container.top;
    const bottomMargin = container.bottom - childRects[ITEM_COUNT - 1].bottom;
    expect(topMargin).toBeCloseTo(bottomMargin, 0);
  });

  test('各子要素が横方向で中央揃えされる', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-y-centering');
    const childRects = await getChildXRects(page);
    const container = await getContainerRect(page);
    childRects.forEach((rect) => {
      const leftMargin = rect.left - container.left;
      const rightMargin = container.right - rect.right;
      expect(leftMargin).toBeCloseTo(rightMargin, 0);
    });
  });
});

// ===== direction:y 主軸(adjustY) =====

test.describe('center - direction:y 主軸(adjustY)', () => {
  test.describe('grow', () => {
    test('親高さ > itemSize: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEMS_SIZE + 200 });
      await gotoStory(page, 'direction-y-adjust-y-grow');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThanOrEqual(ITEM_SIZE));
    });

    test('親高さ < itemSize: itemSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEMS_SIZE - 50 });
      await gotoStory(page, 'direction-y-adjust-y-grow');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });
  });

  test.describe('shrink', () => {
    test('親高さ > itemSize: itemSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEMS_SIZE + 200 });
      await gotoStory(page, 'direction-y-adjust-y-shrink');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親高さ < itemSize: itemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEMS_SIZE - 50 });
      await gotoStory(page, 'direction-y-adjust-y-shrink');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThanOrEqual(ITEM_SIZE));
    });
  });
});

// ===== gapX =====

test.describe('center - gapX', () => {
  test('隣接する子要素の間隔が gapX と一致する', async ({ page }) => {
    const GAP = 20;
    await page.setViewportSize({ width: ITEMS_SIZE + 300, height: 600 });
    await gotoStory(page, 'direction-x-gap-x');
    const rects = await getChildXRects(page);
    for (let i = 0; i < rects.length - 1; i++) {
      const gap = rects[i + 1].left - rects[i].right;
      expect(gap).toBeCloseTo(GAP, 0);
    }
  });
});

// ===== gapY =====

test.describe('center - gapY', () => {
  test('隣接する子要素の間隔が gapY と一致する', async ({ page }) => {
    const GAP = 20;
    await page.setViewportSize({ width: 800, height: ITEMS_SIZE + 300 });
    await gotoStory(page, 'direction-y-gap-y');
    const rects = await getChildYRects(page);
    for (let i = 0; i < rects.length - 1; i++) {
      const gap = rects[i + 1].top - rects[i].bottom;
      expect(gap).toBeCloseTo(GAP, 0);
    }
  });
});
