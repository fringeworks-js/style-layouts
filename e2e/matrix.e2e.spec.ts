import { expect, test, type Page } from '@playwright/test';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=spec-matrix--${storyId}&viewMode=story`;

const gotoStory = async (page: Page, storyId: string) => {
  await page.goto(STORY_URL(storyId));
  await page.waitForSelector('.frg-layout-matrix > *');
};

const ITEM_SIZE = 200;
const ITEM_COUNT = 3;
const TOTAL_SIZE = ITEM_SIZE * ITEM_COUNT;

const GAP = 10;
const TOTAL_SIZE_WITH_GAP = ITEM_SIZE * ITEM_COUNT + GAP * (ITEM_COUNT - 1);

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
    const container = document.querySelector('.frg-layout-matrix')!;
    const children = Array.from(container.querySelectorAll(':scope > *'));
    return {
      container: toPlain(container.getBoundingClientRect()),
      children: children.map((el) => toPlain(el.getBoundingClientRect())),
    };
  });

const getChildWidths = (page: Page) =>
  page
    .locator('.frg-layout-matrix > *')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width));

const getChildHeights = (page: Page) =>
  page
    .locator('.frg-layout-matrix > *')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));

// ===== adjustX =====

test.describe('matrix - adjustX', () => {
  test.describe('grow', () => {
    test('親幅 = 子合計: itemSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE, height: 600 });
      await gotoStory(page, 'adjust-x-grow-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親幅 > 子合計: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE + 300, height: 600 });
      await gotoStory(page, 'adjust-x-grow-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThan(ITEM_SIZE));
    });

    test('親幅 < 子合計: itemSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE - 300, height: 600 });
      await gotoStory(page, 'adjust-x-grow-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });
  });

  test.describe('shrink', () => {
    test('親幅 = 子合計: itemSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE, height: 600 });
      await gotoStory(page, 'adjust-x-shrink-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親幅 > 子合計: itemSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE + 300, height: 600 });
      await gotoStory(page, 'adjust-x-shrink-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親幅 < 子合計: itemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE - 300, height: 600 });
      await gotoStory(page, 'adjust-x-shrink-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(ITEM_SIZE));
    });
  });

  test.describe('fit', () => {
    test('親幅 = 子合計: itemSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE, height: 600 });
      await gotoStory(page, 'adjust-x-fit-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親幅 > 子合計: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE + 300, height: 600 });
      await gotoStory(page, 'adjust-x-fit-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThan(ITEM_SIZE));
    });

    test('親幅 < 子合計: itemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE - 300, height: 600 });
      await gotoStory(page, 'adjust-x-fit-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(ITEM_SIZE));
    });
  });

  test.describe('none', () => {
    test('親幅 > 子合計: itemSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE + 300, height: 600 });
      await gotoStory(page, 'adjust-x-none-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親幅 < 子合計: itemSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE - 300, height: 600 });
      await gotoStory(page, 'adjust-x-none-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });
  });
});

// ===== adjustY =====

test.describe('matrix - adjustY', () => {
  test.describe('grow', () => {
    test('親高さ = 子合計: itemSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE });
      await gotoStory(page, 'adjust-y-grow-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親高さ > 子合計: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE + 300 });
      await gotoStory(page, 'adjust-y-grow-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThan(ITEM_SIZE));
    });

    test('親高さ < 子合計: itemSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE - 300 });
      await gotoStory(page, 'adjust-y-grow-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });
  });

  test.describe('shrink', () => {
    test('親高さ = 子合計: itemSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE });
      await gotoStory(page, 'adjust-y-shrink-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親高さ > 子合計: itemSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE + 300 });
      await gotoStory(page, 'adjust-y-shrink-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親高さ < 子合計: itemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE - 300 });
      await gotoStory(page, 'adjust-y-shrink-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThan(ITEM_SIZE));
    });
  });

  test.describe('fit', () => {
    test('親高さ = 子合計: itemSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE });
      await gotoStory(page, 'adjust-y-fit-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親高さ > 子合計: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE + 300 });
      await gotoStory(page, 'adjust-y-fit-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThan(ITEM_SIZE));
    });

    test('親高さ < 子合計: itemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE - 300 });
      await gotoStory(page, 'adjust-y-fit-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThan(ITEM_SIZE));
    });
  });

  test.describe('none', () => {
    test('親高さ > 子合計: itemSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE + 300 });
      await gotoStory(page, 'adjust-y-none-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親高さ < 子合計: itemSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE - 300 });
      await gotoStory(page, 'adjust-y-none-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });
  });
});

// ===== adjustX with gap =====

test.describe('matrix - adjustX with gap', () => {
  test.describe('grow', () => {
    test('親幅 = 子合計 + gap: itemSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE_WITH_GAP, height: 800 });
      await gotoStory(page, 'adjust-x-grow-with-count-and-size-and-gap');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親幅 > 子合計 + gap: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({
        width: TOTAL_SIZE_WITH_GAP + 300,
        height: 800,
      });
      await gotoStory(page, 'adjust-x-grow-with-count-and-size-and-gap');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThan(ITEM_SIZE));
    });

    test('親幅 < 子合計 + gap: itemSizeのまま（縮まない）', async ({
      page,
    }) => {
      await page.setViewportSize({
        width: TOTAL_SIZE_WITH_GAP - 300,
        height: 800,
      });
      await gotoStory(page, 'adjust-x-grow-with-count-and-size-and-gap');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });
  });

  test.describe('shrink', () => {
    test('親幅 = 子合計 + gap: itemSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE_WITH_GAP, height: 800 });
      await gotoStory(page, 'adjust-x-shrink-with-count-and-size-and-gap');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親幅 > 子合計 + gap: itemSizeのまま（伸びない）', async ({
      page,
    }) => {
      await page.setViewportSize({
        width: TOTAL_SIZE_WITH_GAP + 300,
        height: 800,
      });
      await gotoStory(page, 'adjust-x-shrink-with-count-and-size-and-gap');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親幅 < 子合計 + gap: itemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({
        width: TOTAL_SIZE_WITH_GAP - 300,
        height: 800,
      });
      await gotoStory(page, 'adjust-x-shrink-with-count-and-size-and-gap');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(ITEM_SIZE));
    });
  });

  test.describe('fit', () => {
    test('親幅 = 子合計 + gap: itemSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE_WITH_GAP, height: 800 });
      await gotoStory(page, 'adjust-x-fit-with-count-and-size-and-gap');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親幅 > 子合計 + gap: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({
        width: TOTAL_SIZE_WITH_GAP + 300,
        height: 800,
      });
      await gotoStory(page, 'adjust-x-fit-with-count-and-size-and-gap');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThan(ITEM_SIZE));
    });

    test('親幅 < 子合計 + gap: itemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({
        width: TOTAL_SIZE_WITH_GAP - 300,
        height: 800,
      });
      await gotoStory(page, 'adjust-x-fit-with-count-and-size-and-gap');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(ITEM_SIZE));
    });
  });
});

// ===== adjustY with gap =====

test.describe('matrix - adjustY with gap', () => {
  test.describe('grow', () => {
    test('親高さ = 子合計 + gap: itemSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE_WITH_GAP });
      await gotoStory(page, 'adjust-y-grow-with-count-and-size-and-gap');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親高さ > 子合計 + gap: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({
        width: 800,
        height: TOTAL_SIZE_WITH_GAP + 300,
      });
      await gotoStory(page, 'adjust-y-grow-with-count-and-size-and-gap');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThan(ITEM_SIZE));
    });

    test('親高さ < 子合計 + gap: itemSizeのまま（縮まない）', async ({
      page,
    }) => {
      await page.setViewportSize({
        width: 800,
        height: TOTAL_SIZE_WITH_GAP - 300,
      });
      await gotoStory(page, 'adjust-y-grow-with-count-and-size-and-gap');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });
  });

  test.describe('shrink', () => {
    test('親高さ = 子合計 + gap: itemSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE_WITH_GAP });
      await gotoStory(page, 'adjust-y-shrink-with-count-and-size-and-gap');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親高さ > 子合計 + gap: itemSizeのまま（伸びない）', async ({
      page,
    }) => {
      await page.setViewportSize({
        width: 800,
        height: TOTAL_SIZE_WITH_GAP + 300,
      });
      await gotoStory(page, 'adjust-y-shrink-with-count-and-size-and-gap');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親高さ < 子合計 + gap: itemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({
        width: 800,
        height: TOTAL_SIZE_WITH_GAP - 300,
      });
      await gotoStory(page, 'adjust-y-shrink-with-count-and-size-and-gap');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThan(ITEM_SIZE));
    });
  });

  test.describe('fit', () => {
    test('親高さ = 子合計 + gap: itemSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE_WITH_GAP });
      await gotoStory(page, 'adjust-y-fit-with-count-and-size-and-gap');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(ITEM_SIZE, 0));
    });

    test('親高さ > 子合計 + gap: itemSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({
        width: 800,
        height: TOTAL_SIZE_WITH_GAP + 300,
      });
      await gotoStory(page, 'adjust-y-fit-with-count-and-size-and-gap');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThan(ITEM_SIZE));
    });

    test('親高さ < 子合計 + gap: itemSizeより縮む', async ({ page }) => {
      await page.setViewportSize({
        width: 800,
        height: TOTAL_SIZE_WITH_GAP - 300,
      });
      await gotoStory(page, 'adjust-y-fit-with-count-and-size-and-gap');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThan(ITEM_SIZE));
    });
  });
});

// ===== alignX =====

test.describe('matrix - alignX', () => {
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

test.describe('matrix - alignY', () => {
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

// ===== itemRatio =====

test.describe('matrix - itemRatio', () => {
  test('itemRatioX=1,itemRatioY=1 のとき子要素が正方形になる', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'child-ratio');
    const { children } = await getRects(page);
    children.forEach((c) => expect(c.height / c.width).toBeCloseTo(1, 1));
  });
});
