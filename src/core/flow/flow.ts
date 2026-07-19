import maybeDefault from '@niche-works/utils/object/maybeDefault';
import { clsLayout, clsLayoutFlow, varLayout } from '../_constants';
import applyGap from '../_internal/applyGap';
import applyItemRatio from '../_internal/applyItemRatio';
import hasValue from '../_internal/hasValue';
import mergeClassName from '../_internal/mergeClassName';
import mergeLayoutResults from '../_internal/mergeLayoutResults';
import unit from '../_internal/unit';
import type { Adjust, AlignX, AlignY } from '../constants';
import type { CreateLayoutStyle, LayoutStyle } from '../types';
import type { FlowLayoutOptions } from './types';

/**
 * flowレイアウト
 *
 * - 子要素を並べて配置し、親要素のサイズに達したら折り返す
 * - stackとの違いは flex-wrap: wrap が常に有効な点
 */
const flow: CreateLayoutStyle<FlowLayoutOptions> = (options = {}) => {
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
  } = maybeDefault(
    options,
    {
      direction: 'x',
      alignX: 'left',
      alignY: 'top',
      adjustX: 'none',
      adjustY: 'none',
    },
    { overwriteNull: true },
  );

  const result: LayoutStyle = {
    className: mergeClassName(
      clsLayoutFlow,
      clsLayout.direction[direction],
      clsLayout.align.x[alignX],
      clsLayout.align.y[alignY],
    ),
    style: {},
  };

  // 間隔の適用
  applyGap(result, gap, gapX, gapY);

  // 子要素の縦横比
  applyItemRatio(result, itemRatioX, itemRatioY);

  const resultList: LayoutStyle[] = [result];

  if (direction === 'x') {
    // 横並びの場合
    // 主軸（横方向）の設定
    resultList.push(_getFlowMainAxisStyle('x', alignX, adjustX, itemSizeX));
    // 交差軸（縦方向）の設定
    resultList.push(_getFlowCrossAxisStyle('y', alignY, itemSizeY));
  } else {
    // 縦並びの場合
    // 交差軸（横方向）の設定
    resultList.push(_getFlowCrossAxisStyle('x', alignX, itemSizeX));
    // 主軸（縦方向）の設定
    resultList.push(_getFlowMainAxisStyle('y', alignY, adjustY, itemSizeY));
  }

  return mergeLayoutResults(resultList);
};
export default flow;

/**
 * 主軸方向のスタイル
 *
 * stackの _getStackMainAxisStyle に相当。flowでは主軸の挙動はstackと同じ。
 */
function _getFlowMainAxisStyle(
  axis: 'x' | 'y',
  align: AlignX | AlignY,
  adjust: Adjust,
  itemSize: number | null | undefined,
): LayoutStyle {
  const result: LayoutStyle = {
    className: mergeClassName(
      clsLayout.align[axis][align],
      clsLayout.adjust[axis][adjust],
    ),
  };
  if (hasValue(itemSize)) {
    result.className = mergeClassName(
      result.className,
      clsLayout.itemSize[axis],
    );
    result.style = { [varLayout.itemSize[axis]]: unit(itemSize) };
  }

  return result;
}

/**
 * 交差軸方向のスタイル
 *
 * stackの _getStackClossAxisStyle に相当。
 * flowは交差軸方向のadjustはできないため、常にnoneのスタイルを返す
 */
function _getFlowCrossAxisStyle(
  axis: 'x' | 'y',
  align: AlignX | AlignY,
  itemSize: number | null | undefined,
): LayoutStyle {
  // none
  if (hasValue(itemSize)) {
    return {
      className: mergeClassName(
        clsLayout.align[axis][align],
        clsLayout.itemSize[axis],
      ),
      style: {
        [varLayout.itemSize[axis]]: unit(itemSize),
      },
    };
  } else {
    return {
      className: clsLayout.align[axis][align],
    };
  }
}
