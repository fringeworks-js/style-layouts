import type { Adjust, AlignX, AlignY, Direction } from './constants';

/**
 * レイアウト種別: stack
 */
export const clsLayoutStack = 'lx-layout-stack';

/**
 * レイアウト種別: flow
 */
export const clsLayoutFlow = 'lx-layout-flow';

/**
 * レイアウト種別: tile
 */
export const clsLayoutTile = 'lx-layout-tile';

/**
 * レイアウト種別: matrix
 */
export const clsLayoutMatrix = 'lx-layout-matrix';

/**
 * レイアウト種別: center
 */
export const clsLayoutCenter = 'lx-layout-center';

/**
 * レイアウト種別: pack
 */
export const clsLayoutPack = 'lx-layout-pack';

/**
 * レイアウト種別: balance
 */
export const clsLayoutBalance = 'lx-layout-balance';

/**
 * レイアウト種別: layer
 */
export const clsLayoutLayer = 'lx-layout-layer';

/**
 * レイアウト種別: pin
 */
export const clsLayoutPin = 'lx-layout-pin';

/**
 * 整列: 横方向
 */
export const clsLayoutDirectionX = 'lx-layout-direction-x';

/**
 * 整列: 縦方向
 */
export const clsLayoutDirectionY = 'lx-layout-direction-y';

/**
 * 横位置: 左
 */
export const clsLayoutAlignXLeft = 'lx-layout-alignX-left';

/**
 * 横位置: 中央
 */
export const clsLayoutAlignXCenter = 'lx-layout-alignX-center';

/**
 * 横位置: 右
 */
export const clsLayoutAlignXRight = 'lx-layout-alignX-right';

/**
 * 横位置: 両端揃え
 */
export const clsLayoutAlignXSpaceBetween = 'lx-layout-alignX-spaceBetween';

/**
 * 横位置: 両端余白あり均等
 */
export const clsLayoutAlignXSpaceAround = 'lx-layout-alignX-spaceAround';

/**
 * 横位置: 完全均等
 */
export const clsLayoutAlignXSpaceEvenly = 'lx-layout-alignX-spaceEvenly';

/**
 * 縦位置: 上
 */
export const clsLayoutAlignYTop = 'lx-layout-alignY-top';

/**
 * 縦位置: 中央
 */
export const clsLayoutAlignYMiddle = 'lx-layout-alignY-middle';

/**
 * 縦位置: 下
 */
export const clsLayoutAlignYBottom = 'lx-layout-alignY-bottom';

/**
 * 縦位置: 両端揃え
 */
export const clsLayoutAlignYSpaceBetween = 'lx-layout-alignY-spaceBetween';

/**
 * 縦位置: 両端余白あり均等
 */
export const clsLayoutAlignYSpaceAround = 'lx-layout-alignY-spaceAround';

/**
 * 縦位置: 完全均等
 */
export const clsLayoutAlignYSpaceEvenly = 'lx-layout-alignY-spaceEvenly';

/**
 * 子要素の幅調整: なし
 */
export const clsLayoutAdjustXNone = 'lx-layout-adjustX-none';

/**
 * 子要素の幅調整: 伸ばす & 縮める
 */
export const clsLayoutAdjustXFit = 'lx-layout-adjustX-fit';

/**
 * 子要素の幅調整: 伸ばす
 */
export const clsLayoutAdjustXExpand = 'lx-layout-adjustX-grow';

/**
 * 子要素の幅調整: 縮める
 */
export const clsLayoutAdjustXShrink = 'lx-layout-adjustX-shrink';

/**
 * 子要素の高さ調整: なし
 */
export const clsLayoutAdjustYNone = 'lx-layout-adjustY-none';

/**
 * 子要素の高さ調整: 伸ばす & 縮める
 */
export const clsLayoutAdjustYFit = 'lx-layout-adjustY-fit';

/**
 * 子要素の高さ調整: 伸ばす
 */
export const clsLayoutAdjustYExpand = 'lx-layout-adjustY-grow';

/**
 * 子要素の高さ調整: 縮める
 */
export const clsLayoutAdjustYShrink = 'lx-layout-adjustY-shrink';

/**
 * 間隔: 横方向
 */
export const clsLayoutGapX = 'lx-layout-gapX';

/**
 * 間隔: 縦方向
 */
export const clsLayoutGapY = 'lx-layout-gapY';

/**
 * 子要素の幅
 */
export const clsLayoutItemSizeX = 'lx-layout-itemSizeX';

/**
 * 子要素の高さ
 */
export const clsLayoutItemSizeY = 'lx-layout-itemSizeY';

/**
 * 子要素の縦横比
 */
export const clsLayoutItemRatio = 'lx-layout-itemRatio';

/**
 * 子要素の横方向の数
 */
export const clsLayoutItemCountX = 'lx-layout-itemCountX';

/**
 * 子要素の縦方向の数
 */
export const clsLayoutItemCountY = 'lx-layout-itemCountY';

/**
 * 横方向のテンプレート
 */
export const clsLayoutTemplateX = 'lx-layout-templateX';

/**
 * 縦方向のテンプレート
 */
export const clsLayoutTemplateY = 'lx-layout-templateY';

/**
 * 変数\
 * 間隔: 横方向
 */
export const varLayoutGapX = '--lx-layout-gapX';

/**
 * 変数\
 * 間隔: 縦方向
 */
export const varLayoutGapY = '--lx-layout-gapY';

/**
 * 変数\
 * 子要素の幅
 */
export const varLayoutItemSizeX = '--lx-layout-itemSizeX';

/**
 * 変数\
 * 子要素の高さ
 */
export const varLayoutItemSizeY = '--lx-layout-itemSizeY';

/**
 * 変数\
 * 子要素の縦横比
 */
export const varLayoutItemRatio = '--lx-layout-itemRatio';

/**
 * 変数\
 * 子要素の横方向の数
 */
export const varLayoutItemCountX = '--lx-layout-itemCountX';

/**
 * 変数\
 * 子要素の縦方向の数
 */
export const varLayoutItemCountY = '--lx-layout-itemCountY';

/**
 * 変数\
 * 横方向のテンプレート
 */
export const varLayoutTemplateX = '--lx-layout-templateX';

/**
 * 変数\
 * 縦方向のテンプレート
 */
export const varLayoutTemplateY = '--lx-layout-templateY';

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
