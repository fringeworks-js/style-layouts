import type { StyleResult } from '@fringeworks/style-utils';
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
export type LayoutStyle = StyleResult;
