import type { Adjust, AlignX, AlignY, Direction } from './constants';

/**
 * 子要素を並べる方向
 */
export type DirectionOptions<D extends Direction = Direction> = {
  /**
   * 並べる方向
   */
  direction?: D | null;
};

/**
 * 子要素の位置
 */
export type AlignOptions = {
  /**
   * 子要素の横位置
   */
  alignX?: AlignX | null;

  /**
   * 子要素の縦位置
   */
  alignY?: AlignY | null;
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
  adjustX?: Adjust | null;

  /**
   * 子要素の高さの調整
   * itemSizeYを指定した場合に有効
   * デフォルトは`none`
   */
  adjustY?: Adjust | null;
};

/**
 * 要素間の余白
 */
export type GapOptions = {
  /**
   * 余白
   */
  gap?: number | null;

  /**
   * 横方向の余白
   */
  gapX?: number | null;

  /**
   * 縦方向の余白
   */
  gapY?: number | null;
};

/**
 * 子要素のサイズ
 */
export type ItemSizeOptions = {
  /**
   * 子要素の幅
   */
  itemSizeX?: number | null;

  /**
   * 子要素の高さ
   */
  itemSizeY?: number | null;
};

/**
 * 子要素のサイズの縦横比
 */
export type ItemRatioOptions = {
  /**
   * 子要素の縦横比(横)
   */
  itemRatioX?: number | null;

  /**
   * 子要素の縦横比(縦)
   */
  itemRatioY?: number | null;
};

/**
 * 子要素の数
 */
export type ItemCountOptions = {
  /**
   * 横方向の要素数
   */
  itemCountX?: number | null;

  /**
   * 縦方向の要素数
   */
  itemCountY?: number | null;
};

/**
 * 子要素のサイズと数
 */
export type TracksOptions = {
  /**
   * 横方向の設定
   * このプロパティが設定されている場合、itemCountX,itemSizeXは無効
   */
  tracksX?: (string | number)[] | null;

  /**
   * 縦方向の設定
   * このプロパティが設定されている場合、itemCountY,itemSizeYは無効
   */
  tracksY?: (string | number)[] | null;
};
