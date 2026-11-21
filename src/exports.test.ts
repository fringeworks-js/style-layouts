import { readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * 各レイアウトのフォルダーについて、export の規則を検査する
 *
 * - 各フォルダーの index は default export に加えて、フォルダー名と同じ名前で named export する
 * - ルートの index と with-css の index は、各フォルダーの named export を引き継ぐ
 *
 * `export *` は default export を引き継がないため、
 * フォルダー名と同じ名前の export を書き忘れると、ルートから黙って消える。
 */
const root = dirname(fileURLToPath(import.meta.url));

// レイアウトではないフォルダー（関数をまとめたもの、CSS を一緒に読み込む入口）
const notLayouts = new Set(['helpers', 'with-css']);
const layouts = readdirSync(root).filter(
  (name) =>
    !name.startsWith('_') &&
    !notLayouts.has(name) &&
    statSync(join(root, name)).isDirectory(),
);

describe('exports', () => {
  let rootModule: Record<string, unknown>;
  let withCssModule: Record<string, unknown>;
  beforeAll(async () => {
    rootModule = await import('./index.ts');
    withCssModule = await import('./with-css/index.ts');
  }, 60_000);

  it('レイアウトのフォルダーがある', () => {
    expect(layouts.length).toBeGreaterThan(0);
  });

  describe.each(layouts)('%s', (name) => {
    it('フォルダー名と同じ名前で default export と同じものを export している', async () => {
      const module = await import(`./${name}/index.ts`);
      expect(module[name]).toBeDefined();
      expect(module[name]).toBe(module.default);
    });

    it('ルートから export されている（*Item も含む）', async () => {
      const module = await import(`./${name}/index.ts`);
      for (const key of Object.keys(module).filter((k) => k !== 'default')) {
        expect(rootModule[key]).toBe(module[key]);
      }
    });

    it('with-css から、同じものが export されている', async () => {
      const module = await import(`./with-css/${name}/index.ts`);
      expect(module[name]).toBe(rootModule[name]);
      expect(module.default).toBe(rootModule[name]);
      expect(withCssModule[name]).toBe(rootModule[name]);
    });
  });
});
