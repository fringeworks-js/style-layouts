import maybeDefault from '@fringeworks/utils/object/maybeDefault';
import { clsLayout, clsLayoutStack, varLayout } from '../_constants';
import applyGap from '../_internal/applyGap';
import applyItemRatio from '../_internal/applyItemRatio';
import hasValue from '../_internal/hasValue';
import mergeClassName from '../_internal/mergeClassName';
import mergeLayoutResults from '../_internal/mergeLayoutResults';
import unit from '../_internal/unit';
import type { Adjust, AlignX, AlignY, Direction } from '../constants';
import type { CreateLayoutStyle, LayoutStyle } from '../types';
import type { StackLayoutOptions } from './types';

/**
 * stackレイアウト
 *
 * - 子要素を一列に並べて配置する
 */
const stack: CreateLayoutStyle<StackLayoutOptions> = (options = {}) => {
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
    // 基本的なクラス
    className: mergeClassName(
      clsLayoutStack,
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
    // 主軸(横方向)の設定
    resultList.push(_getStackMainAxisStyle('x', alignX, adjustX, itemSizeX));
    // 交差軸(縦方向)の設定
    resultList.push(_getStackClossAxisStyle('y', alignY, adjustY, itemSizeY));
  } else {
    // 縦並びの場合
    // 主軸(縦方向)の設定
    resultList.push(_getStackMainAxisStyle('y', alignY, adjustY, itemSizeY));
    // 交差軸(横方向)の設定
    resultList.push(_getStackClossAxisStyle('x', alignX, adjustX, itemSizeX));
  }

  // 全てのクラス&スタイルを統合
  return mergeLayoutResults(resultList);
};
export default stack;

/**
 * 主軸方向のスタイル
 * @param axis 横 or 縦
 * @param align 位置
 * @param adjust 子要素のサイズの調整
 * @param itemSize 子要素のサイズ
 * @returns スタイル
 */
function _getStackMainAxisStyle(
  axis: Direction,
  align: AlignY | AlignX,
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
    // 高さ or 幅の指定あり
    result.className = mergeClassName(
      result.className,
      clsLayout.itemSize[axis],
    );
    result.style = { [varLayout.itemSize[axis]]: unit(itemSize) };
  }

  return result;
}

/**
 * 交差軸方向のクラス
 * @param axis 横 or 縦
 * @param align 位置
 * @param adjust 子要素のサイズの調整
 * @param itemSize 子要素のサイズ
 * @returns スタイル
 */
function _getStackClossAxisStyle(
  axis: Direction,
  align: AlignY | AlignX,
  adjust: Adjust,
  itemSize: number | null | undefined,
): LayoutStyle {
  if (adjust === 'fit') {
    // fit
    // サイズはCSS側で100%に固定するため、itemSizeは適用しない
    return {
      className: mergeClassName(
        clsLayout.align[axis][align],
        clsLayout.adjust[axis][adjust],
      ),
    };
  } else if (adjust === 'grow') {
    // grow
    const result: LayoutStyle = {
      className: mergeClassName(
        clsLayout.align[axis][align],
        clsLayout.adjust[axis][adjust],
      ),
      style: {},
    };
    if (hasValue(itemSize)) {
      // 高さ or 幅の指定あり
      result.className = mergeClassName(
        result.className,
        clsLayout.itemSize[axis],
      );
      result.style = { [varLayout.itemSize[axis]]: unit(itemSize) };
    }
    return result;
  } else if (adjust === 'shrink') {
    // shrink
    const result: LayoutStyle = {
      className: mergeClassName(
        clsLayout.align[axis][align],
        clsLayout.adjust[axis][adjust],
      ),
      style: {},
    };
    if (hasValue(itemSize)) {
      // 高さ or 幅の指定あり
      result.className = mergeClassName(
        result.className,
        clsLayout.itemSize[axis],
      );
      result.style = {
        [varLayout.itemSize[axis]]: `min(${unit(itemSize)}, 100%)`,
      };
    }
    return result;
  } else {
    // none
    if (hasValue(itemSize)) {
      // 指定のサイズ
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
      // 指定なし
      return {
        className: mergeClassName(clsLayout.align[axis][align]),
      };
    }
  }
}
