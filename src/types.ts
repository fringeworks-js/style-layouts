import type { ElementStyle } from '@fringeworks/style-utils';
import type { LooseDictionary } from '@fringeworks/types';

/**
 * レイアウトを作る関数
 */
export type CreateLayoutStyle<O = LooseDictionary> = (
  options?: O,
) => LayoutStyle;

/**
 * レイアウト
 */
export type LayoutStyle = ElementStyle;

// CSS 変数のオブジェクトの型（戻り値の `style`）。
// 利用者が `@fringeworks/style-utils` を入れずに使えるよう、ここから export する
export type { CSSCustomProperties } from '@fringeworks/style-utils';
