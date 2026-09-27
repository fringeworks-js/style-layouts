/**
 * `_shared`とlayoutごとのstoryが参照する、パッケージ固有の依存
 *
 * `_shared`とlayoutごとのstoryはパッケージ間でそのままコピーして使うため、
 * パッケージによって参照先が異なるものはこのファイルに集約する。
 */
export type { ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
export {
  Adjust,
  AlignX,
  AlignXBase,
  AlignY,
  AlignYBase,
  Direction,
} from '../../src/constants';
