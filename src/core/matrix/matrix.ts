import maybeDefault from '@niche-works/utils/object/maybeDefault';
import { clsLayout, clsLayoutMatrix, varLayout } from '../_constants';
import applyGap from '../_internal/applyGap';
import applyItemCount from '../_internal/applyItemCount';
import applyItemRatio from '../_internal/applyItemRatio';
import applyItemSize from '../_internal/applyItemSize';
import mergeClassName from '../_internal/mergeClassName';
import mergeLayoutResults from '../_internal/mergeLayoutResults';
import unit from '../_internal/unit';
import type {
  AdjustOptions,
  AlignOptions,
  DirectionOptions,
  GapOptions,
  ItemCountOptions,
  ItemRatioOptions,
  ItemSizeOptions,
  TracksOptions,
} from '../_types';
import { Adjust } from '../constants';
import type { CreateLayoutStyle, LayoutStyle } from '../types';
import type { MatrixLayoutOptions } from './types';

type MatrixLayoutInternalOptions = DirectionOptions &
  AlignOptions &
  AdjustOptions &
  GapOptions &
  ItemCountOptions &
  TracksOptions &
  ItemSizeOptions &
  ItemRatioOptions;

/**
 * matrixレイアウト
 *
 * - 子要素の縦の数、横の数を基準にして格子状に配置する
 * - 親要素のサイズが子要素に依存していないことを前提とする
 */
const matrix: CreateLayoutStyle<MatrixLayoutOptions> = (
  options = { itemCountX: 8, itemCountY: 8 },
) => {
  const {
    direction,
    alignX,
    alignY,
    adjustX,
    adjustY,
    gap,
    gapX,
    gapY,
    itemSizeX,
    itemSizeY,
    itemRatioX,
    itemRatioY,
    itemCountX,
    itemCountY,
    tracksX,
    tracksY,
  } = maybeDefault(
    options as MatrixLayoutInternalOptions,
    {
      direction: 'x',
      alignX: 'left',
      alignY: 'top',
      adjustX: 'none',
      adjustY: 'none',
    },
    { overwriteNull: true },
  );
  let result: LayoutStyle = {
    className: mergeClassName(
      clsLayoutMatrix,
      clsLayout.direction[direction],
      clsLayout.align.x[alignX],
      clsLayout.align.y[alignY],
      clsLayout.adjust.x[adjustX],
      clsLayout.adjust.y[adjustY],
    ),
    style: {},
  };

  // 間隔の適用
  applyGap(result, gap, gapX, gapY);

  // 子要素の縦横比
  applyItemRatio(result, itemRatioX, itemRatioY);

  let sizeX;
  let sizeY;
  let countX;
  let countY;
  let trxX;
  let trxY;
  if (Array.isArray(tracksX)) {
    trxX = tracksX;
  } else {
    sizeX = itemSizeX;
    countX = itemCountX;
  }
  if (Array.isArray(tracksY)) {
    trxY = tracksY;
  } else {
    sizeY = itemSizeY;
    countY = itemCountY;
  }

  // 子要素のサイズ
  applyItemSize(result, sizeX, sizeY);

  // 子要素の数
  applyItemCount(result, countX, countY);

  if (trxX) {
    // 横方向のテンプレート
    result = mergeLayoutResults([result, _getTemplate('x', adjustX, trxX)]);
  }
  if (trxY) {
    // 縦方向のテンプレート
    result = mergeLayoutResults([result, _getTemplate('y', adjustY, trxY)]);
  }

  return result;
};
export default matrix;

/**
 * gridTemplateColumns / gridTemplateRowsを生成する
 * @param axis 軸
 * @param adjust 子要素のサイズ調整
 * @param tracks 子要素数 & サイズ
 * @returns
 */
function _getTemplate(
  axis: 'x' | 'y',
  adjust: Adjust,
  tracks: (string | number)[],
): LayoutStyle {
  // 子要素数 & サイズが指定されている場合
  // px列の合計を計算
  const pxTotal = tracks.reduce<number>((sum, value) => {
    const px = _extractPx(value);
    return px !== null ? sum + px : sum;
  }, 0);
  // テンプレート作成
  const template = tracks
    .map((value) =>
      _applyAdjustToTrack(axis, adjust, value, tracks.length, pxTotal),
    )
    .join(' ');

  return {
    className: clsLayout.template[axis],
    style: { [varLayout.template[axis]]: template },
  };
}

/**
 * tracksX/tracksYの各トラック値にadjustを適用する
 * fr単位の値はminmax()のminに使えないため特別扱いになり、
 * 伸縮の比率には影響しない
 */
function _applyAdjustToTrack(
  axis: 'x' | 'y',
  adjust: Adjust,
  size: string | number,
  itemCount: number,
  pxTotal: number,
): string {
  const itemSize = unit(size);
  const isFr = typeof size === 'string' && size.trim().endsWith('fr');
  const pxValue = _extractPx(size);
  const isPx = pxValue !== null;

  if (adjust === 'fit') {
    // fit
    if (isPx && pxTotal > 0) {
      const trackSize = `calc((100% - var(${varLayout.gap[axis]}) * ${itemCount - 1}) * ${pxValue} / ${pxTotal})`;
      return `minmax(0, max(${trackSize}, ${itemSize}))`;
    }
    return isFr ? itemSize : `minmax(0, ${itemSize})`;
  } else if (adjust === 'grow') {
    // grow
    if (isPx && pxTotal > 0) {
      return `minmax(${itemSize}, calc(${pxValue} / ${pxTotal} * (100% - var(${varLayout.gap[axis]}) * ${itemCount - 1})))`;
    }
    return isFr ? itemSize : `minmax(${itemSize}, 1fr)`;
  } else if (adjust === 'shrink') {
    // shrink
    if (isPx && pxTotal > 0) {
      const trackSize = `calc((100% - var(${varLayout.gap[axis]}) * ${itemCount - 1}) * ${pxValue} / ${pxTotal})`;
      return `minmax(0, min(${trackSize}, ${itemSize}))`;
    }
    return isFr ? itemSize : `minmax(0, ${itemSize})`;
  }
  return itemSize;
}

/**
 * px値を数値として抽出する
 * px以外の単位はnullを返す
 */
function _extractPx(itemSize: string | number): number | null {
  if (typeof itemSize === 'number') {
    return itemSize;
  }
  const match = itemSize.trim().match(/^([\d.]+)px$/);
  return match ? parseFloat(match[1]) : null;
}
