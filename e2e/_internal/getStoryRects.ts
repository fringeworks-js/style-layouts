import type { Page } from '@playwright/test';

/**
 * storyのコンテナと子要素の位置・サイズを取得する
 *
 * - 入れ子のレイアウトでも、storyのルート直下のコンテナとその子要素だけを対象にする
 */
export default function getStoryRects(page: Page) {
  return page.evaluate(() => {
    const toPlain = (r: DOMRect) => ({
      left: r.left,
      top: r.top,
      width: r.width,
      height: r.height,
    });
    const container = document.querySelector('#storybook-root > *')!;
    return {
      container: toPlain(container.getBoundingClientRect()),
      children: Array.from(container.children).map((el) =>
        toPlain(el.getBoundingClientRect()),
      ),
    };
  });
}
