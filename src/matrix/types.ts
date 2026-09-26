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
  itemCountX: ItemCountOptions['itemCountX'];
  itemSizeX?: ItemSizeOptions['itemSizeX'];
  tracksX?: never;
};

/**
 * 横軸、テンプレート指定
 */
type MatrixAxisXWithTemplateOptions = {
  itemCountX?: never;
  itemSizeX?: never;
  tracksX: TracksOptions['tracksX'];
};

/**
 * 横軸用オプション
 */
type MatrixAxisXOptions =
  | MatrixAxisXWithCountOptions
  | MatrixAxisXWithTemplateOptions;

/**
 * 縦軸、要素数指定
 */
type MatrixAxisYWithCountOptions = {
  itemCountY: ItemCountOptions['itemCountY'];
  itemSizeY?: ItemSizeOptions['itemSizeY'];
  tracksY?: never;
};

/**
 * 縦軸、テンプレート指定
 */
type MatrixAxisYWithTemplateOptions = {
  itemCountY?: never;
  itemSizeY?: never;
  tracksY: TracksOptions['tracksY'];
};

/**
 * 縦軸用オプション
 */
type MatrixAxisYOptions =
  | MatrixAxisYWithCountOptions
  | MatrixAxisYWithTemplateOptions;
