import { expect, test, type Page } from '@playwright/test';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=spec-flow--${storyId}&viewMode=story`;

const gotoStory = async (page: Page, storyId: string) => {
  await page.goto(STORY_URL(storyId));
  await page.waitForSelector('.frg-layout-flow > *');
};

const ITEM_SIZE = 200;
const ITEM_COUNT = 3;
const ITEMS_SIZE = ITEM_SIZE * ITEM_COUNT;
const GAP_SIZE = 20;

type Rect = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
};

const getRects = (page: Page): Promise<{ container: Rect; children: Rect[] }> =>
  page.evaluate(() => {
    const toPlain = (
      r: DOMRect,
    ): {
      top: number;
      right: number;
      bottom: number;
      left: number;
      width: number;
      height: number;
    } => ({
      top: r.top,
      right: r.right,
      bottom: r.bottom,
      left: r.left,
      width: r.width,
      height: r.height,
    });
    const container = document.querySelector('.frg-layout-flow')!;
    const children = Array.from(container.querySelectorAll(':scope > *'));
    return {
      container: toPlain(container.getBoundingClientRect()),
      children: children.map((el) => toPlain(el.getBoundingClientRect())),
    };
  });

const getChildWidths = (page: Page) =>
  page
    .locator('.frg-layout-flow > *')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width));

const getChildHeights = (page: Page) =>
  page
    .locator('.frg-layout-flow > *')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));

// ===== direction:x 主軸(adjustX) =====

test.describe('flow - direction:x 主軸(adjustX)', () => {
  test.describe('grow', () => {
    test('親幅 > 子合計: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: ITEMS_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-grow');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThanOrEqual(ITEM_SIZE));
    });

    test('親幅 < itemSize: 折り返し後もitemSizeのまま（縮まない）', async ({
      page,
    }) => {
      await page.setViewportSize({ width: ITEM_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-grow');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });
  });

  test.describe('shrink', () => {
    test('親幅 > 子合計: itemSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: ITEMS_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-shrink');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親幅 < itemSize: itemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: ITEM_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-shrink');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(ITEM_SIZE));
    });
  });

  test.describe('fit', () => {
    test('親幅 > 子合計: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: ITEMS_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-fit');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThan(ITEM_SIZE));
    });

    test('親幅 < itemSize: 折り返し後にitemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: ITEM_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-fit');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(ITEM_SIZE));
    });
  });

  test.describe('none', () => {
    test('親幅 > 子合計: itemSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: ITEMS_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-none');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親幅 < itemSize: itemSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: ITEM_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-none');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });
  });
});

// ===== direction:x 交差軸(itemSizeY) =====

test.describe('flow - direction:x 交差軸', () => {
  test('itemSizeあり: 子要素の高さがitemSizeのまま', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-cross-axis-with-size');
    const heights = await getChildHeights(page);
    heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
  });

  test('itemSizeなし: 子要素の高さがコンテンツ高さのまま', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-cross-axis-without-size');
    const heights = await getChildHeights(page);
    heights.forEach((h) => {
      expect(h).toBeGreaterThan(0);
      expect(h).toBeLessThan(ITEM_SIZE);
    });
  });
});

// ===== direction:x 主軸 alignX =====

test.describe('flow - direction:x 主軸 alignX', () => {
  test('left: 子要素が左端から並ぶ', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-align-x-left');
    const { container, children } = await getRects(page);
    expect(children[0].left).toBeCloseTo(container.left, 0);
  });

  test('center: 子要素グループが中央に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-align-x-center');
    const { container, children } = await getRects(page);
    const leftSpace = children[0].left - container.left;
    const rightSpace = container.right - children[children.length - 1].right;
    expect(Math.abs(leftSpace - rightSpace)).toBeLessThan(2);
  });

  test('right: 子要素グループが右端に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-align-x-right');
    const { container, children } = await getRects(page);
    expect(children[children.length - 1].right).toBeCloseTo(container.right, 0);
  });
});

// ===== direction:x 交差軸 alignY =====

test.describe('flow - direction:x 交差軸 alignY', () => {
  test('top: 子要素が上端に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-align-y-top');
    const { container, children } = await getRects(page);
    children.forEach((c) => expect(c.top).toBeCloseTo(container.top, 0));
  });

  test('middle: 子要素が縦方向中央に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-align-y-middle');
    const { container, children } = await getRects(page);
    children.forEach((c) => {
      const childMidY = (c.top + c.bottom) / 2;
      const containerMidY = (container.top + container.bottom) / 2;
      expect(Math.abs(childMidY - containerMidY)).toBeLessThan(2);
    });
  });

  test('bottom: 子要素が下端に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-align-y-bottom');
    const { container, children } = await getRects(page);
    children.forEach((c) => expect(c.bottom).toBeCloseTo(container.bottom, 0));
  });
});

// ===== direction:x gap =====

test.describe('flow - direction:x gapX', () => {
  test('隣接する子要素の横間隔が gapX と一致する', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-gap-x');
    const { children } = await getRects(page);
    for (let i = 1; i < children.length; i++) {
      const gap = children[i].left - children[i - 1].right;
      expect(gap).toBeCloseTo(GAP_SIZE, 0);
    }
  });
});

// ===== direction:y 主軸(adjustY) =====

test.describe('flow - direction:y 主軸(adjustY)', () => {
  test.describe('grow', () => {
    test('親高さ > 子合計: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEMS_SIZE + 200 });
      await gotoStory(page, 'direction-y-adjust-y-grow');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThanOrEqual(ITEM_SIZE));
    });

    test('親高さ < itemSize: 折り返し後もitemSizeのまま（縮まない）', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: ITEM_SIZE - 50 });
      await gotoStory(page, 'direction-y-adjust-y-grow');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });
  });

  test.describe('shrink', () => {
    test('親高さ > 子合計: itemSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEMS_SIZE + 200 });
      await gotoStory(page, 'direction-y-adjust-y-shrink');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親高さ < itemSize: itemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEM_SIZE - 50 });
      await gotoStory(page, 'direction-y-adjust-y-shrink');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThanOrEqual(ITEM_SIZE));
    });
  });

  test.describe('fit', () => {
    test('親高さ > 子合計: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEMS_SIZE + 200 });
      await gotoStory(page, 'direction-y-adjust-y-fit');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThan(ITEM_SIZE));
    });

    test('親高さ < itemSize: 折り返し後にitemSizeより縮む', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: ITEM_SIZE - 50 });
      await gotoStory(page, 'direction-y-adjust-y-fit');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThan(ITEM_SIZE));
    });
  });

  test.describe('none', () => {
    test('親高さ > 子合計: itemSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEMS_SIZE + 200 });
      await gotoStory(page, 'direction-y-adjust-y-none');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親高さ < itemSize: itemSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEM_SIZE - 50 });
      await gotoStory(page, 'direction-y-adjust-y-none');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });
  });
});

// ===== direction:y 交差軸(itemSizeX) =====

test.describe('flow - direction:y 交差軸', () => {
  test('itemSizeあり: 子要素の幅がitemSizeのまま', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-y-cross-axis-with-size');
    const widths = await getChildWidths(page);
    widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
  });
});

// ===== direction:y 主軸 alignY =====

test.describe('flow - direction:y 主軸 alignY', () => {
  test('top: 子要素グループが上端から並ぶ', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await gotoStory(page, 'direction-y-align-y-top');
    const { container, children } = await getRects(page);
    expect(children[0].top).toBeCloseTo(container.top, 0);
  });

  test('middle: 子要素グループが縦方向中央に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await gotoStory(page, 'direction-y-align-y-middle');
    const { container, children } = await getRects(page);
    const topSpace = children[0].top - container.top;
    const bottomSpace = container.bottom - children[children.length - 1].bottom;
    expect(Math.abs(topSpace - bottomSpace)).toBeLessThan(2);
  });

  test('bottom: 子要素グループが下端に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await gotoStory(page, 'direction-y-align-y-bottom');
    const { container, children } = await getRects(page);
    expect(children[children.length - 1].bottom).toBeCloseTo(
      container.bottom,
      0,
    );
  });
});

// ===== direction:y 交差軸 alignX =====

test.describe('flow - direction:y 交差軸 alignX', () => {
  test('left: 子要素が左端に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-y-align-x-left');
    const { container, children } = await getRects(page);
    children.forEach((c) => expect(c.left).toBeCloseTo(container.left, 0));
  });

  test('center: 子要素が横方向中央に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-y-align-x-center');
    const { container, children } = await getRects(page);
    children.forEach((c) => {
      const childMidX = (c.left + c.right) / 2;
      const containerMidX = (container.left + container.right) / 2;
      expect(Math.abs(childMidX - containerMidX)).toBeLessThan(2);
    });
  });

  test('right: 子要素が右端に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-y-align-x-right');
    const { container, children } = await getRects(page);
    children.forEach((c) => expect(c.right).toBeCloseTo(container.right, 0));
  });
});

// ===== direction:y gap =====

test.describe('flow - direction:y gapY', () => {
  test('隣接する子要素の縦間隔が gapY と一致する', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await gotoStory(page, 'direction-y-gap-y');
    const { children } = await getRects(page);
    for (let i = 1; i < children.length; i++) {
      const gap = children[i].top - children[i - 1].bottom;
      expect(gap).toBeCloseTo(GAP_SIZE, 0);
    }
  });
});

// ===== itemRatio =====

test.describe('flow - itemRatio', () => {
  test('direction:x: itemRatioX=1,itemRatioY=1 のとき子要素が正方形になる', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-child-ratio');
    const { children } = await getRects(page);
    children.forEach((c) => expect(c.height / c.width).toBeCloseTo(1, 1));
  });
});
