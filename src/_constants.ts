import type { Adjust, AlignX, AlignY, Direction } from './constants';

/**
 * レイアウト種別: stack
 */
export const clsLayoutStack = 'frgs-layout-stack';

/**
 * レイアウト種別: flow
 */
export const clsLayoutFlow = 'frgs-layout-flow';

/**
 * レイアウト種別: tile
 */
export const clsLayoutTile = 'frgs-layout-tile';

/**
 * レイアウト種別: matrix
 */
export const clsLayoutMatrix = 'frgs-layout-matrix';

/**
 * レイアウト種別: center
 */
export const clsLayoutCenter = 'frgs-layout-center';

/**
 * レイアウト種別: pack
 */
export const clsLayoutPack = 'frgs-layout-pack';

/**
 * レイアウト種別: balance
 */
export const clsLayoutBalance = 'frgs-layout-balance';

/**
 * レイアウト種別: layer
 */
export const clsLayoutLayer = 'frgs-layout-layer';

/**
 * レイアウト種別: pin
 */
export const clsLayoutPin = 'frgs-layout-pin';

/**
 * アイテム: stack
 */
export const clsLayoutStackItem = 'frgs-layout-stack-item';

/**
 * アイテム: flow
 */
export const clsLayoutFlowItem = 'frgs-layout-flow-item';

/**
 * アイテム: center
 */
export const clsLayoutCenterItem = 'frgs-layout-center-item';

/**
 * アイテム: layer
 */
export const clsLayoutLayerItem = 'frgs-layout-layer-item';

/**
 * アイテム: pin
 */
export const clsLayoutPinItem = 'frgs-layout-pin-item';

/**
 * 子要素のスタイルを当てる対象をアイテムに限定する
 */
export const clsLayoutLimitToItems = 'frgs-layout-limitToItems';

/**
 * 整列: 横方向
 */
export const clsLayoutDirectionX = 'frgs-layout-direction-x';

/**
 * 整列: 縦方向
 */
export const clsLayoutDirectionY = 'frgs-layout-direction-y';

/**
 * 横位置: 左
 */
export const clsLayoutAlignXLeft = 'frgs-layout-alignX-left';

/**
 * 横位置: 中央
 */
export const clsLayoutAlignXCenter = 'frgs-layout-alignX-center';

/**
 * 横位置: 右
 */
export const clsLayoutAlignXRight = 'frgs-layout-alignX-right';

/**
 * 横位置: 両端揃え
 */
export const clsLayoutAlignXSpaceBetween = 'frgs-layout-alignX-spaceBetween';

/**
 * 横位置: 両端余白あり均等
 */
export const clsLayoutAlignXSpaceAround = 'frgs-layout-alignX-spaceAround';

/**
 * 横位置: 完全均等
 */
export const clsLayoutAlignXSpaceEvenly = 'frgs-layout-alignX-spaceEvenly';

/**
 * 縦位置: 上
 */
export const clsLayoutAlignYTop = 'frgs-layout-alignY-top';

/**
 * 縦位置: 中央
 */
export const clsLayoutAlignYMiddle = 'frgs-layout-alignY-middle';

/**
 * 縦位置: 下
 */
export const clsLayoutAlignYBottom = 'frgs-layout-alignY-bottom';

/**
 * 縦位置: 両端揃え
 */
export const clsLayoutAlignYSpaceBetween = 'frgs-layout-alignY-spaceBetween';

/**
 * 縦位置: 両端余白あり均等
 */
export const clsLayoutAlignYSpaceAround = 'frgs-layout-alignY-spaceAround';

/**
 * 縦位置: 完全均等
 */
export const clsLayoutAlignYSpaceEvenly = 'frgs-layout-alignY-spaceEvenly';

/**
 * 子要素の幅調整: なし
 */
export const clsLayoutAdjustXNone = 'frgs-layout-adjustX-none';

/**
 * 子要素の幅調整: 伸ばす & 縮める
 */
export const clsLayoutAdjustXFit = 'frgs-layout-adjustX-fit';

/**
 * 子要素の幅調整: 伸ばす
 */
export const clsLayoutAdjustXGrow = 'frgs-layout-adjustX-grow';

/**
 * 子要素の幅調整: 縮める
 */
export const clsLayoutAdjustXShrink = 'frgs-layout-adjustX-shrink';

/**
 * 子要素の高さ調整: なし
 */
export const clsLayoutAdjustYNone = 'frgs-layout-adjustY-none';

/**
 * 子要素の高さ調整: 伸ばす & 縮める
 */
export const clsLayoutAdjustYFit = 'frgs-layout-adjustY-fit';

/**
 * 子要素の高さ調整: 伸ばす
 */
export const clsLayoutAdjustYGrow = 'frgs-layout-adjustY-grow';

/**
 * 子要素の高さ調整: 縮める
 */
export const clsLayoutAdjustYShrink = 'frgs-layout-adjustY-shrink';

/**
 * 子要素の幅
 */
export const clsLayoutItemSizeX = 'frgs-layout-itemSizeX';

/**
 * 子要素の高さ
 */
export const clsLayoutItemSizeY = 'frgs-layout-itemSizeY';

/**
 * 子要素の縦横比
 */
export const clsLayoutItemRatio = 'frgs-layout-itemRatio';

/**
 * 子要素の横方向の数
 */
export const clsLayoutItemCountX = 'frgs-layout-itemCountX';

/**
 * 子要素の縦方向の数
 */
export const clsLayoutItemCountY = 'frgs-layout-itemCountY';

/**
 * 横方向のテンプレート
 */
export const clsLayoutTemplateX = 'frgs-layout-templateX';

/**
 * 縦方向のテンプレート
 */
export const clsLayoutTemplateY = 'frgs-layout-templateY';

/**
 * 子要素のオフセット: 横方向
 */
export const clsLayoutItemOffsetX = 'frgs-layout-itemOffsetX';

/**
 * 子要素のオフセット: 縦方向
 */
export const clsLayoutItemOffsetY = 'frgs-layout-itemOffsetY';

/**
 * 子要素のオフセット: 重なり順
 */
export const clsLayoutItemOffsetZ = 'frgs-layout-itemOffsetZ';

/**
 * 変数\
 * 子要素のオフセット: 横方向
 */
export const varLayoutItemOffsetX = '--frgs-layout-itemOffsetX';

/**
 * 変数\
 * 子要素のオフセット: 縦方向
 */
export const varLayoutItemOffsetY = '--frgs-layout-itemOffsetY';

/**
 * 変数\
 * 子要素のオフセット: 重なり順
 */
export const varLayoutItemOffsetZ = '--frgs-layout-itemOffsetZ';

/**
 * 変数\
 * 間隔: 横方向
 */
export const varLayoutGapX = '--frgs-layout-gapX';

/**
 * 変数\
 * 間隔: 縦方向
 */
export const varLayoutGapY = '--frgs-layout-gapY';

/**
 * 変数\
 * 子要素の幅
 */
export const varLayoutItemSizeX = '--frgs-layout-itemSizeX';

/**
 * 変数\
 * 子要素の高さ
 */
export const varLayoutItemSizeY = '--frgs-layout-itemSizeY';

/**
 * 変数\
 * 子要素の縦横比
 */
export const varLayoutItemRatio = '--frgs-layout-itemRatio';

/**
 * 変数\
 * 子要素の横方向の数
 */
export const varLayoutItemCountX = '--frgs-layout-itemCountX';

/**
 * 変数\
 * 子要素の縦方向の数
 */
export const varLayoutItemCountY = '--frgs-layout-itemCountY';

/**
 * 変数\
 * 横方向のテンプレート
 */
export const varLayoutTemplateX = '--frgs-layout-templateX';

/**
 * 変数\
 * 縦方向のテンプレート
 */
export const varLayoutTemplateY = '--frgs-layout-templateY';

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
      grow: clsLayoutAdjustXGrow,
      shrink: clsLayoutAdjustXShrink,
    },
    y: {
      none: clsLayoutAdjustYNone,
      fit: clsLayoutAdjustYFit,
      grow: clsLayoutAdjustYGrow,
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
