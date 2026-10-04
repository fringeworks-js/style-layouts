import { expect, test, type Page } from '@playwright/test';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=spec-tile--${storyId}&viewMode=story`;

const gotoStory = async (page: Page, storyId: string) => {
  await page.goto(STORY_URL(storyId));
  await page.waitForSelector('.frg-layout-tile > *');
};

const ITEM_SIZE = 200;
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
    const container = document.querySelector('.frg-layout-tile')!;
    const children = Array.from(container.querySelectorAll(':scope > *'));
    return {
      container: toPlain(container.getBoundingClientRect()),
      children: children.map((el) => toPlain(el.getBoundingClientRect())),
    };
  });

const getChildWidths = (page: Page) =>
  page
    .locator('.frg-layout-tile > *')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width));

const getChildHeights = (page: Page) =>
  page
    .locator('.frg-layout-tile > *')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));

// ===== adjustX =====

test.describe('tile - adjustX', () => {
  test.describe('grow', () => {
    test('親幅 > itemSize: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: ITEM_SIZE + 200, height: 800 });
      await gotoStory(page, 'adjust-x-grow-with-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThanOrEqual(ITEM_SIZE));
    });

    test('親幅 < itemSize: itemSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: ITEM_SIZE - 50, height: 800 });
      await gotoStory(page, 'adjust-x-grow-with-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });
  });

  test.describe('shrink', () => {
    test('親幅 > itemSize: itemSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: ITEM_SIZE + 200, height: 800 });
      await gotoStory(page, 'adjust-x-shrink-with-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親幅 < itemSize: itemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: ITEM_SIZE - 50, height: 800 });
      await gotoStory(page, 'adjust-x-shrink-with-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(ITEM_SIZE));
    });
  });

  test.describe('fit', () => {
    test('親幅 > itemSize: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: ITEM_SIZE + 200, height: 800 });
      await gotoStory(page, 'adjust-x-fit-with-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThanOrEqual(ITEM_SIZE));
    });

    test('親幅 < itemSize: itemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: ITEM_SIZE - 50, height: 800 });
      await gotoStory(page, 'adjust-x-fit-with-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(ITEM_SIZE));
    });
  });

  test.describe('none', () => {
    test('親幅 > itemSize: itemSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: ITEM_SIZE + 200, height: 800 });
      await gotoStory(page, 'adjust-x-none-with-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親幅 < itemSize: itemSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: ITEM_SIZE - 50, height: 800 });
      await gotoStory(page, 'adjust-x-none-with-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });
  });
});

// ===== adjustY =====

test.describe('tile - adjustY', () => {
  test.describe('grow', () => {
    test('親高さ > itemSize: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEM_SIZE + 200 });
      await gotoStory(page, 'adjust-y-grow-with-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThanOrEqual(ITEM_SIZE));
    });

    test('親高さ < itemSize: itemSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEM_SIZE - 50 });
      await gotoStory(page, 'adjust-y-grow-with-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });
  });

  test.describe('shrink', () => {
    test('親高さ > itemSize: itemSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEM_SIZE + 200 });
      await gotoStory(page, 'adjust-y-shrink-with-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親高さ < itemSize: itemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEM_SIZE - 50 });
      await gotoStory(page, 'adjust-y-shrink-with-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThan(ITEM_SIZE));
    });
  });

  test.describe('fit', () => {
    test('親高さ > itemSize: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEM_SIZE + 200 });
      await gotoStory(page, 'adjust-y-fit-with-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThanOrEqual(ITEM_SIZE));
    });

    test('親高さ < itemSize: itemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEM_SIZE - 50 });
      await gotoStory(page, 'adjust-y-fit-with-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThan(ITEM_SIZE));
    });
  });

  test.describe('none', () => {
    test('親高さ > itemSize: itemSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEM_SIZE + 200 });
      await gotoStory(page, 'adjust-y-none-with-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親高さ < itemSize: itemSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: ITEM_SIZE - 50 });
      await gotoStory(page, 'adjust-y-none-with-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });
  });
});

// ===== alignX =====

test.describe('tile - alignX', () => {
  test('left: 子要素が左端から並ぶ', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'align-x-left');
    const { container, children } = await getRects(page);
    expect(children[0].left).toBeCloseTo(container.left, 0);
  });

  test('center: 子要素グループが中央に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'align-x-center');
    const { container, children } = await getRects(page);
    const leftSpace = children[0].left - container.left;
    const rightSpace = container.right - children[children.length - 1].right;
    expect(Math.abs(leftSpace - rightSpace)).toBeLessThan(2);
  });

  test('right: 子要素グループが右端に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'align-x-right');
    const { container, children } = await getRects(page);
    expect(children[children.length - 1].right).toBeCloseTo(container.right, 0);
  });
});

// ===== alignY =====

test.describe('tile - alignY', () => {
  test('top: 子要素が上端から並ぶ', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'align-y-top');
    const { container, children } = await getRects(page);
    expect(children[0].top).toBeCloseTo(container.top, 0);
  });

  test('middle: 子要素グループが縦方向中央に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'align-y-middle');
    const { container, children } = await getRects(page);
    const topSpace = children[0].top - container.top;
    const bottomSpace = container.bottom - children[children.length - 1].bottom;
    expect(Math.abs(topSpace - bottomSpace)).toBeLessThan(2);
  });

  test('bottom: 子要素グループが下端に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'align-y-bottom');
    const { container, children } = await getRects(page);
    expect(children[children.length - 1].bottom).toBeCloseTo(
      container.bottom,
      0,
    );
  });
});

// ===== gap =====

test.describe('tile - gapX', () => {
  test('隣接する子要素の横間隔が gapX と一致する', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'gap-x');
    const { children } = await getRects(page);
    for (let i = 1; i < children.length; i++) {
      const gap = children[i].left - children[i - 1].right;
      expect(gap).toBeCloseTo(GAP_SIZE, 0);
    }
  });
});

test.describe('tile - gapY', () => {
  test('隣接する子要素の縦間隔が gapY と一致する', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await gotoStory(page, 'gap-y');
    const { children } = await getRects(page);
    for (let i = 1; i < children.length; i++) {
      const gap = children[i].top - children[i - 1].bottom;
      expect(gap).toBeCloseTo(GAP_SIZE, 0);
    }
  });
});

// ===== itemRatio =====

test.describe('tile - itemRatio', () => {
  test('itemRatioX=1,itemRatioY=1 のとき子要素が正方形になる', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'child-ratio');
    const { children } = await getRects(page);
    children.forEach((c) => expect(c.height / c.width).toBeCloseTo(1, 1));
  });
});
