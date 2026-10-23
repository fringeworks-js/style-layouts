import chroma from 'chroma-js';
import type { ChildLayout, StyleObj, TestStoryArgs } from './types';

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

    /**
     * 子要素の中に置く固定サイズの要素のスタイル
     */
    contentStyle?: StyleObj;

    /**
     * 子要素に適用するレイアウト
     */
    layout?: ChildLayout;

    /**
     * 子要素に適用するアイテムのオプション
     */
    itemOptions?: Record<string, unknown>;
  }[];
};

/**
 * specのstoryのargsから描画内容を作る
 * @param args specのstoryのargs
 * @returns
 */
export default function createTestModel(args: TestStoryArgs): TestModel {
  const {
    itemCount = 3,
    childPositions,
    childContentSize,
    childLayout,
    childItems,
    ...params
  } = args;
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
      ...(childContentSize && {
        contentStyle: {
          display: 'block',
          width: childContentSize.width,
          height: childContentSize.height,
        },
      }),
      ...(childLayout && { layout: childLayout }),
      ...(childItems?.[index] && { itemOptions: childItems[index] }),
    })),
  };
}
