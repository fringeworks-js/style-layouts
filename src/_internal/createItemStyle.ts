import type {
  AdjustOptions,
  AlignBaseOptions,
  OffsetOptions,
  RatioOptions,
  SizeOptions,
} from '../_types';
import type { LayoutStyle } from '../types';
import hasValue from './hasValue';
import mergeClassName from './mergeClassName';
import unit from './unit';

/**
 * アイテム（子要素）に適用するクラスと変数を作る
 *
 * - オプションを指定した場合だけクラスと変数を設定し、指定しないオプションはコンテナの指定に従う
 * - align・adjustは、指定したことを表すクラス（例: frg-layout-stack-item-adjustX）と値のクラスを設定する
 * - 変数の名前はコンテナの変数と分ける（子要素がレイアウトのコンテナを兼ねても干渉しない）
 * @param item アイテムのクラス（例: frg-layout-stack-item）
 * @param options オプション
 * @returns
 */
export default function createItemStyle(
  item: string,
  options: AlignBaseOptions &
    AdjustOptions &
    SizeOptions &
    RatioOptions &
    OffsetOptions,
): LayoutStyle {
  const {
    alignX,
    alignY,
    adjustX,
    adjustY,
    sizeX,
    sizeY,
    ratioX,
    ratioY,
    offsetX,
    offsetY,
    offsetZ,
  } = options;
  let className = item;
  const style: NonNullable<LayoutStyle['style']> = {};

  // 位置
  for (const [axis, align] of [
    ['X', alignX],
    ['Y', alignY],
  ] as const) {
    if (align) {
      className = mergeClassName(
        className,
        `${item}-align${axis}`,
        `${item}-align${axis}-${align}`,
      );
    }
  }

  // サイズの調整
  for (const [axis, adjust] of [
    ['X', adjustX],
    ['Y', adjustY],
  ] as const) {
    if (adjust) {
      className = mergeClassName(
        className,
        `${item}-adjust${axis}`,
        `${item}-adjust${axis}-${adjust}`,
      );
    }
  }

  // サイズ
  for (const [axis, size] of [
    ['X', sizeX],
    ['Y', sizeY],
  ] as const) {
    if (hasValue(size)) {
      className = mergeClassName(className, `${item}-size${axis}`);
      style[`--${item}-size${axis}`] = unit(size);
    }
  }

  // 縦横比
  if (hasValue(ratioX) || hasValue(ratioY)) {
    className = mergeClassName(className, `${item}-ratio`);
    style[`--${item}-ratio`] = `${ratioX ?? 1} / ${ratioY ?? 1}`;
  }

  // オフセット（数値はpx。重なり順はそのまま）
  for (const [axis, offset] of [
    ['X', offsetX],
    ['Y', offsetY],
    ['Z', offsetZ],
  ] as const) {
    if (hasValue(offset)) {
      className = mergeClassName(className, `${item}-offset${axis}`);
      style[`--${item}-offset${axis}`] =
        axis === 'Z' ? `${offset}` : unit(offset);
    }
  }

  return { className, style };
}
