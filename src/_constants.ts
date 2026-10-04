import type { Adjust, AlignX, AlignY, Direction } from './constants';

/**
 * レイアウト種別: stack
 */
export const clsLayoutStack = 'frg-layout-stack';

/**
 * レイアウト種別: flow
 */
export const clsLayoutFlow = 'frg-layout-flow';

/**
 * レイアウト種別: tile
 */
export const clsLayoutTile = 'frg-layout-tile';

/**
 * レイアウト種別: matrix
 */
export const clsLayoutMatrix = 'frg-layout-matrix';

/**
 * レイアウト種別: center
 */
export const clsLayoutCenter = 'frg-layout-center';

/**
 * レイアウト種別: pack
 */
export const clsLayoutPack = 'frg-layout-pack';

/**
 * レイアウト種別: balance
 */
export const clsLayoutBalance = 'frg-layout-balance';

/**
 * レイアウト種別: layer
 */
export const clsLayoutLayer = 'frg-layout-layer';

/**
 * レイアウト種別: pin
 */
export const clsLayoutPin = 'frg-layout-pin';

/**
 * 整列: 横方向
 */
export const clsLayoutDirectionX = 'frg-layout-direction-x';

/**
 * 整列: 縦方向
 */
export const clsLayoutDirectionY = 'frg-layout-direction-y';

/**
 * 横位置: 左
 */
export const clsLayoutAlignXLeft = 'frg-layout-alignX-left';

/**
 * 横位置: 中央
 */
export const clsLayoutAlignXCenter = 'frg-layout-alignX-center';

/**
 * 横位置: 右
 */
export const clsLayoutAlignXRight = 'frg-layout-alignX-right';

/**
 * 横位置: 両端揃え
 */
export const clsLayoutAlignXSpaceBetween = 'frg-layout-alignX-spaceBetween';

/**
 * 横位置: 両端余白あり均等
 */
export const clsLayoutAlignXSpaceAround = 'frg-layout-alignX-spaceAround';

/**
 * 横位置: 完全均等
 */
export const clsLayoutAlignXSpaceEvenly = 'frg-layout-alignX-spaceEvenly';

/**
 * 縦位置: 上
 */
export const clsLayoutAlignYTop = 'frg-layout-alignY-top';

/**
 * 縦位置: 中央
 */
export const clsLayoutAlignYMiddle = 'frg-layout-alignY-middle';

/**
 * 縦位置: 下
 */
export const clsLayoutAlignYBottom = 'frg-layout-alignY-bottom';

/**
 * 縦位置: 両端揃え
 */
export const clsLayoutAlignYSpaceBetween = 'frg-layout-alignY-spaceBetween';

/**
 * 縦位置: 両端余白あり均等
 */
export const clsLayoutAlignYSpaceAround = 'frg-layout-alignY-spaceAround';

/**
 * 縦位置: 完全均等
 */
export const clsLayoutAlignYSpaceEvenly = 'frg-layout-alignY-spaceEvenly';

/**
 * 子要素の幅調整: なし
 */
export const clsLayoutAdjustXNone = 'frg-layout-adjustX-none';

/**
 * 子要素の幅調整: 伸ばす & 縮める
 */
export const clsLayoutAdjustXFit = 'frg-layout-adjustX-fit';

/**
 * 子要素の幅調整: 伸ばす
 */
export const clsLayoutAdjustXExpand = 'frg-layout-adjustX-grow';

/**
 * 子要素の幅調整: 縮める
 */
export const clsLayoutAdjustXShrink = 'frg-layout-adjustX-shrink';

/**
 * 子要素の高さ調整: なし
 */
export const clsLayoutAdjustYNone = 'frg-layout-adjustY-none';

/**
 * 子要素の高さ調整: 伸ばす & 縮める
 */
export const clsLayoutAdjustYFit = 'frg-layout-adjustY-fit';

/**
 * 子要素の高さ調整: 伸ばす
 */
export const clsLayoutAdjustYExpand = 'frg-layout-adjustY-grow';

/**
 * 子要素の高さ調整: 縮める
 */
export const clsLayoutAdjustYShrink = 'frg-layout-adjustY-shrink';

/**
 * 間隔: 横方向
 */
export const clsLayoutGapX = 'frg-layout-gapX';

/**
 * 間隔: 縦方向
 */
export const clsLayoutGapY = 'frg-layout-gapY';

/**
 * 子要素の幅
 */
export const clsLayoutItemSizeX = 'frg-layout-itemSizeX';

/**
 * 子要素の高さ
 */
export const clsLayoutItemSizeY = 'frg-layout-itemSizeY';

/**
 * 子要素の縦横比
 */
export const clsLayoutItemRatio = 'frg-layout-itemRatio';

/**
 * 子要素の横方向の数
 */
export const clsLayoutItemCountX = 'frg-layout-itemCountX';

/**
 * 子要素の縦方向の数
 */
export const clsLayoutItemCountY = 'frg-layout-itemCountY';

/**
 * 横方向のテンプレート
 */
export const clsLayoutTemplateX = 'frg-layout-templateX';

/**
 * 縦方向のテンプレート
 */
export const clsLayoutTemplateY = 'frg-layout-templateY';

/**
 * 変数\
 * 間隔: 横方向
 */
export const varLayoutGapX = '--frg-layout-gapX';

/**
 * 変数\
 * 間隔: 縦方向
 */
export const varLayoutGapY = '--frg-layout-gapY';

/**
 * 変数\
 * 子要素の幅
 */
export const varLayoutItemSizeX = '--frg-layout-itemSizeX';

/**
 * 変数\
 * 子要素の高さ
 */
export const varLayoutItemSizeY = '--frg-layout-itemSizeY';

/**
 * 変数\
 * 子要素の縦横比
 */
export const varLayoutItemRatio = '--frg-layout-itemRatio';

/**
 * 変数\
 * 子要素の横方向の数
 */
export const varLayoutItemCountX = '--frg-layout-itemCountX';

/**
 * 変数\
 * 子要素の縦方向の数
 */
export const varLayoutItemCountY = '--frg-layout-itemCountY';

/**
 * 変数\
 * 横方向のテンプレート
 */
export const varLayoutTemplateX = '--frg-layout-templateX';

/**
 * 変数\
 * 縦方向のテンプレート
 */
export const varLayoutTemplateY = '--frg-layout-templateY';

/**
 * axis毎のクラス
 */
export const clsLayout: {
  direction: Record<Direction, string>;
  align: Record<Direction, Partial<Record<AlignX | AlignY, string>>>;
  adjust: Record<Direction, Record<Adjust, string>>;
  itemSize: Record<Direction, string>;
  template: Record<Direction, string>;
} = {
  direction: {
    x: clsLayoutDirectionX,
    y: clsLayoutDirectionY,
  },
  align: {
    x: {
      left: clsLayoutAlignXLeft,
      center: clsLayoutAlignXCenter,
      right: clsLayoutAlignXRight,
      'space-between': clsLayoutAlignXSpaceBetween,
      'space-around': clsLayoutAlignXSpaceAround,
      'space-evenly': clsLayoutAlignXSpaceEvenly,
    },
    y: {
      top: clsLayoutAlignYTop,
      middle: clsLayoutAlignYMiddle,
      bottom: clsLayoutAlignYBottom,
      'space-between': clsLayoutAlignYSpaceBetween,
      'space-around': clsLayoutAlignYSpaceAround,
      'space-evenly': clsLayoutAlignYSpaceEvenly,
    },
  },
  adjust: {
    x: {
      none: clsLayoutAdjustXNone,
      fit: clsLayoutAdjustXFit,
      grow: clsLayoutAdjustXExpand,
      shrink: clsLayoutAdjustXShrink,
    },
    y: {
      none: clsLayoutAdjustYNone,
      fit: clsLayoutAdjustYFit,
      grow: clsLayoutAdjustYExpand,
      shrink: clsLayoutAdjustYShrink,
    },
  },
  itemSize: {
    x: clsLayoutItemSizeX,
    y: clsLayoutItemSizeY,
  },
  template: {
    x: clsLayoutTemplateX,
    y: clsLayoutTemplateY,
  },
};

/**
 * axis毎の変数
 */
export const varLayout = {
  itemSize: {
    x: varLayoutItemSizeX,
    y: varLayoutItemSizeY,
  },
  template: {
    x: varLayoutTemplateX,
    y: varLayoutTemplateY,
  },
  gap: {
    x: varLayoutGapX,
    y: varLayoutGapY,
  },
} as const;
