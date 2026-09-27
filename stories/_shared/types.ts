import type { Adjust, AlignX, AlignY, Direction } from '../_internal/adapter';

/**
 * レイアウト名
 */
export type LayoutName =
  | 'balance'
  | 'center'
  | 'flow'
  | 'layer'
  | 'matrix'
  | 'pack'
  | 'pin'
  | 'stack'
  | 'tile';

/*
 * storyのargs
 *
 * controlsの入力をそのまま受け取るため、数値や配列も文字列で保持する。
 * レイアウトのオプションへの変換は`toAttributesObj`で行う。
 */

export type DirectionArgs = {
  direction?: Direction;
};

export type AlignArgs = {
  alignX?: AlignX;
  alignY?: AlignY;
};

export type AdjustArgs = {
  adjustX?: Adjust;
  adjustY?: Adjust;
};

export type GapArgs = {
  gap?: string;
  gapX?: string;
  gapY?: string;
};

export type ItemSizeArgs = {
  itemSizeX?: string;
  itemSizeY?: string;
};

export type ItemRatioArgs = {
  itemRatioX?: string;
  itemRatioY?: string;
};

export type ItemCountArgs = {
  itemCountX?: string;
  itemCountY?: string;
};

export type TracksArgs = {
  /**
   * JSON文字列
   */
  tracksX?: string;

  /**
   * JSON文字列
   */
  tracksY?: string;
};

/**
 * レイアウトのオプションに相当するargs
 */
export type LayoutArgs = DirectionArgs &
  AlignArgs &
  AdjustArgs &
  GapArgs &
  ItemSizeArgs &
  ItemRatioArgs &
  ItemCountArgs &
  TracksArgs;

/**
 * 表示確認用のargs
 */
export type DebugArgs = {
  /**
   * コンテナーの幅
   */
  containerWidth?: string;

  /**
   * コンテナーの高さ
   */
  containerHeight?: string;

  /**
   * 子要素の数
   */
  itemCount?: number;

  /**
   * 子要素の幅・高さの決め方
   */
  sizeType?: 'none' | 'rand' | 'static';

  /**
   * 子要素の位置に決め方
   */
  posType?: 'none' | 'rand' | 'static';

  /**
   * `rand`の乱数のシード
   */
  seed?: number;

  /**
   * コンテナーのオーバーフロー
   */
  overflow?: 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto' | 'none';
};

export type StoryArgs = LayoutArgs & DebugArgs;

/**
 * specのstoryのargs
 *
 * レイアウトのオプションはそのまま渡す
 */
export type TestStoryArgs = Record<string, unknown> & {
  /**
   * 子要素の数
   */
  itemCount?: number;

  /**
   * 子要素の位置
   */
  childPositions?: { left: string; top: string }[];
};

/**
 * スタイル
 *
 * DOMにもReactの`style`にもそのまま適用できるよう、値は文字列に統一する
 */
export type StyleObj = Record<string, string>;
