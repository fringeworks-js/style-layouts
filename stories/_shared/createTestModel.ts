import chroma from 'chroma-js';
import type { StyleObj, TestStoryArgs } from './types';

/**
 * specの描画内容
 *
 * DOMやReactに依存しない値のみで構成する
 */
export type TestModel = {
  /**
   * レイアウトのオプション
   */
  options: Record<string, unknown>;

  /**
   * コンテナーのスタイル（レイアウトのスタイルは含まない）
   */
  containerStyle: StyleObj;

  /**
   * 子要素
   */
  items: {
    label: string;
    style: StyleObj;
  }[];
};

/**
 * specのstoryのargsから描画内容を作る
 * @param args specのstoryのargs
 * @returns
 */
export default function createTestModel(args: TestStoryArgs): TestModel {
  const { itemCount = 3, childPositions, ...params } = args;
  const colors = chroma.scale(['d9ed92', '184e77']).colors(itemCount);
  const positions =
    childPositions ??
    Array.from({ length: itemCount }).map((_, index) => ({
      left: `${80 * index}px`,
      top: `${120 * index}px`,
    }));

  return {
    options: params,
    containerStyle: {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      backgroundColor: 'rgba(128, 128, 128, 0.1)',
    },
    items: colors.map((color, index) => ({
      label: String(index + 1),
      style: {
        backgroundColor: color,
        left: positions[index].left,
        top: positions[index].top,
      },
    })),
  };
}
