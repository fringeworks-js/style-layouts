import type {
  Adjust,
  AlignX,
  AlignXBase,
  AlignY,
  AlignYBase,
  Direction,
} from './constants';

/**
 * 子要素を並べる方向
 */
export type DirectionOptions<D extends Direction = Direction> = {
  /**
   * 並べる方向
   */
  direction?: D;
};

/**
 * 子要素の位置
 */
export type AlignOptions = {
  /**
   * 子要素の横位置
   */
  alignX?: AlignX;

  /**
   * 子要素の縦位置
   */
  alignY?: AlignY;
};

/**
 * 子要素のサイズ調整
 */
export type AdjustOptions = {
  /**
   * 子要素の幅の調整
   * itemSizeXを指定した場合に有効
   * デフォルトは`none`
   */
  adjustX?: Adjust;

  /**
   * 子要素の高さの調整
   * itemSizeYを指定した場合に有効
   * デフォルトは`none`
   */
  adjustY?: Adjust;
};

/**
 * 要素間の余白
 */
export type GapOptions = {
  /**
   * 余白
   */
  gap?: number;

  /**
   * 横方向の余白
   */
  gapX?: number;

  /**
   * 縦方向の余白
   */
  gapY?: number;
};

/**
 * 子要素のサイズ
 */
export type ItemSizeOptions = {
  /**
   * 子要素の幅
   */
  itemSizeX?: number;

  /**
   * 子要素の高さ
   */
  itemSizeY?: number;
};

/**
 * 子要素のサイズの縦横比
 */
export type ItemRatioOptions = {
  /**
   * 子要素の縦横比(横)
   */
  itemRatioX?: number;

  /**
   * 子要素の縦横比(縦)
   */
  itemRatioY?: number;
};

/**
 * 子要素の数
 */
export type ItemCountOptions = {
  /**
   * 横方向の要素数
   */
  itemCountX?: number;

  /**
   * 縦方向の要素数
   */
  itemCountY?: number;
};

/**
 * 子要素のサイズと数
 */
export type TracksOptions = {
  /**
   * 横方向の設定
   * このプロパティが設定されている場合、itemCountX,itemSizeXは無効
   */
  tracksX?: (string | number)[];

  /**
   * 縦方向の設定
   * このプロパティが設定されている場合、itemCountY,itemSizeYは無効
   */
  tracksY?: (string | number)[];
};

/**
 * 子要素の位置（space-*以外）
 */
export type AlignBaseOptions = {
  /**
   * 子要素の横位置
   */
  alignX?: AlignXBase;

  /**
   * 子要素の縦位置
   */
  alignY?: AlignYBase;
};

/**
 * 子要素のオフセット（コンテナ）
 */
export type ItemOffsetOptions = {
  /**
   * 子要素の横方向のオフセット（alignXで選んだ辺からの距離。数値はpx）
   */
  itemOffsetX?: number | string;

  /**
   * 子要素の縦方向のオフセット（alignYで選んだ辺からの距離。数値はpx）
   */
  itemOffsetY?: number | string;

  /**
   * 子要素の重なり順（z-index）
   */
  itemOffsetZ?: number;
};

/**
 * アイテムのオフセット
 */
export type OffsetOptions = {
  /**
   * 横方向のオフセット（alignXで選んだ辺からの距離。数値はpx）
   */
  offsetX?: number | string;

  /**
   * 縦方向のオフセット（alignYで選んだ辺からの距離。数値はpx）
   */
  offsetY?: number | string;

  /**
   * 重なり順（z-index）
   */
  offsetZ?: number;
};

/**
 * 子要素のスタイルを当てる対象
 */
export type LimitToItemsOptions = {
  /**
   * 子要素のスタイルを、アイテム（*Item()を適用した子要素）にだけ当てる
   * デフォルトは`false`（全ての子要素に当てる）
   */
  limitToItems?: boolean;
};

/**
 * アイテムのサイズ
 */
export type SizeOptions = {
  /**
   * 幅
   */
  sizeX?: number;

  /**
   * 高さ
   */
  sizeY?: number;
};

/**
 * アイテムの縦横比
 */
export type RatioOptions = {
  /**
   * 縦横比(横)
   */
  ratioX?: number;

  /**
   * 縦横比(縦)
   */
  ratioY?: number;
};
