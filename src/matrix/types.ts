import type {
  AdjustOptions,
  AlignOptions,
  DirectionOptions,
  GapOptions,
  ItemRatioOptions,
  ItemSizeOptions,
} from '../_types';

export type MatrixLayoutOptions = DirectionOptions &
  AlignOptions &
  AdjustOptions &
  ItemRatioOptions &
  GapOptions &
  MatrixAxisXOptions &
  MatrixAxisYOptions;

/**
 * 横軸、要素数指定
 */
type MatrixAxisXWithCountOptions = {
  itemCountX: number;
  itemSizeX?: ItemSizeOptions['itemSizeX'];
  tracksX?: never;
};

/**
 * 横軸、テンプレート指定
 */
type MatrixAxisXWithTemplateOptions = {
  itemCountX?: never;
  itemSizeX?: never;
  tracksX: (string | number)[];
};

/**
 * 横軸用オプション
 */
type MatrixAxisXOptions =
  MatrixAxisXWithCountOptions | MatrixAxisXWithTemplateOptions;

/**
 * 縦軸、要素数指定
 */
type MatrixAxisYWithCountOptions = {
  itemCountY: number;
  itemSizeY?: ItemSizeOptions['itemSizeY'];
  tracksY?: never;
};

/**
 * 縦軸、テンプレート指定
 */
type MatrixAxisYWithTemplateOptions = {
  itemCountY?: never;
  itemSizeY?: never;
  tracksY: (string | number)[];
};

/**
 * 縦軸用オプション
 */
type MatrixAxisYOptions =
  MatrixAxisYWithCountOptions | MatrixAxisYWithTemplateOptions;
