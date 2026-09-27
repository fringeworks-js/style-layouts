import chroma from 'chroma-js';
import { CONTAINER_STYLE } from './constants';
import createRandom from './createRandom';
import toAttributesObj from './toAttributesObj';
import type { StoryArgs, StyleObj } from './types';

/**
 * 表示確認用のコンテナーの描画内容
 *
 * DOMやReactに依存しない値のみで構成する
 */
export type ContainerModel = {
  /**
   * レイアウトのオプション
   */
  options: Record<string, unknown>;

  /**
   * リサイズ可能なラッパーの設定
   */
  resizable: {
    initialWidth: number;
    initialHeight: number;
    style: StyleObj;
  };

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
 * storyのargsから表示確認用のコンテナーの描画内容を作る
 * @param args storyのargs
 * @returns
 */
export default function createContainerModel(args: StoryArgs): ContainerModel {
  const {
    containerWidth,
    containerHeight,
    itemCount,
    sizeType,
    posType,
    seed,
    overflow,
    ...params
  } = args;
  const {
    containerWidth: width = CONTAINER_STYLE.width,
    containerHeight: height = CONTAINER_STYLE.height,
  } = toAttributesObj({ containerWidth, containerHeight });
  const {
    itemCount: count = 12,
    sizeType: sizeTypeValue = 'none',
    posType: posTypeValue = 'none',
    seed: seedValue = 1,
    overflow: overflowValue = 'hidden',
  } = toAttributesObj({ itemCount, sizeType, posType, seed, overflow });

  const colors = chroma.scale(['#a9c6cf', '#ed8a0f']).colors(count);
  // サイズと位置で別の数列を使い、一方の設定が他方の乱数に影響しないようにする
  const sizeRandom = createRandom(seedValue * 2);
  const positionRandom = createRandom(seedValue * 2 + 1);
  const list = Array.from({ length: count });
  const sizeStyles = (() => {
    if (sizeTypeValue === 'rand') {
      return list.map(() => ({
        height: sizeRandom(100),
        width: sizeRandom(200),
      }));
    } else if (sizeTypeValue === 'none') {
      return list.map(() => ({}));
    } else {
      return list.map(() => ({
        height: 80,
        width: 120,
      }));
    }
  })();
  const positionStyles = (() => {
    if (posTypeValue === 'rand') {
      return list.map(() => ({
        top: positionRandom(CONTAINER_STYLE.height),
        left: positionRandom(CONTAINER_STYLE.width),
      }));
    } else if (posTypeValue === 'none') {
      return list.map(() => ({}));
    } else {
      return list.map((_, index) => ({
        top: 40 * index,
        left: 40 * index,
      }));
    }
  })();

  return {
    options: toAttributesObj(params),
    resizable: {
      initialWidth: width,
      initialHeight: height,
      style: { padding: '8px' },
    },
    containerStyle: toAttributesObj(
      {
        width: '100%',
        height: '100%',
        backgroundColor: '#f9fbfc',
        resize: 'horizontal',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '4px',
        boxSizing: 'content-box',
        overflow: overflowValue,
      },
      { unit: true },
    ),
    items: colors.map((color, index) => ({
      label: String(index + 1),
      style: toAttributesObj(
        {
          ...sizeStyles[index],
          ...positionStyles[index],
          backgroundColor: color,
          color: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          fontSize: '16px',
          fontFamily: 'sans-serif',
          borderRadius: '4px',
        },
        { unit: true },
      ),
    })),
  };
}
