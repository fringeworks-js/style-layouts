# @fringeworks/style-layouts

`@fringeworks/style-layouts` is a library some will find handy, specialized in controlling child element layout with CSS.\
It returns class names and CSS custom properties as an object based on the given options. Framework-agnostic and SSR-compatible.

**[日本語のREADMEはこちら](./README.ja.md)**

## Features

- Framework-agnostic (works with any JS environment)
- SSR-compatible (returns plain class names and inline style objects)
- Fully typed with TypeScript

## Installation

```bash
npm install @fringeworks/style-layouts
# or
pnpm add @fringeworks/style-layouts
```

## Usage

Each layout function returns a `{ className, style }` object. Apply them to a container element.

```ts
import { stack } from '@fringeworks/style-layouts';

const { className, style } = stack({
  direction: 'x',
  alignX: 'center',
  alignY: 'middle',
  gap: 16,
});

// className: "frg-layout-stack frg-layout-direction-x ..."
// style: { "--frg-layout-gapX": "16px", "--frg-layout-gapY": "16px" }
```

```html
<div class="frg-layout-stack ..." style="--frg-layout-gapX: 16px; ...">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### CSS

The layout functions do not import any CSS, so they work as-is in SSR and React Server Components. Import the CSS separately.

```ts
import { stack } from '@fringeworks/style-layouts';

// Import all layouts at once
import '@fringeworks/style-layouts/styles.css';

// Or import only what you need
import '@fringeworks/style-layouts/stack.css';
import '@fringeworks/style-layouts/tile.css';
```

If you want the CSS to be loaded automatically, use the modules under `with-css`. This requires a bundler that can handle CSS imports.\
Besides the layout functions, `with-css` also exports the constants, helpers, and types.

```ts
import { stack } from '@fringeworks/style-layouts/with-css';
```

### Nesting Layouts

A child element can itself be a layout container. The parent's `itemSize` and `itemRatio` are applied to the child even when the child is a layout container.

However, if the parent and the child both specify the same option (e.g. `itemSizeX` on both), the child's own value is also used for the child's own size.\
This is a limitation of how CSS custom properties work. In that case, wrap the child in a `<div>` or similar and put the layout inside it.

```html
<!-- Parent: stack({ itemSizeX: 200 }) -->
<div class="frg-layout-stack ...">
  <!-- The parent's itemSizeX (200px) applies here -->
  <div>
    <!-- Child layout: stack({ itemSizeX: 50 }) -->
    <div class="frg-layout-stack ...">...</div>
  </div>
</div>
```

## Layout Types

### `stack`

Arranges child elements in a single row or column.

```ts
import { stack } from '@fringeworks/style-layouts';

const { className, style } = stack({
  direction: 'x',
  alignX: 'left',
  alignY: 'top',
  adjustX: 'grow',
  gap: 8,
  itemSizeX: 200,
});
```

### `flow`

Like `stack`, but wraps child elements when they exceed the container size.

> `grow`, `shrink`, and `fit` cannot be specified for `adjustX` / `adjustY` on the cross axis.

```ts
import { flow } from '@fringeworks/style-layouts';

const { className, style } = flow({
  direction: 'x',
  alignX: 'left',
  alignY: 'top',
  adjustX: 'fit',
  gap: 8,
  itemSizeX: 200,
});
```

### `tile`

Arranges child elements in a grid based on child element size. The number of columns is determined automatically based on the container and child sizes.

> **Note:** This layout assumes the container size is determined externally. Containers sized by their own content (e.g. `width: max-content`) may cause unexpected behavior with percentage-based values.

```ts
import { tile } from '@fringeworks/style-layouts';

const { className, style } = tile({
  direction: 'x',
  adjustX: 'fit',
  gap: 8,
  itemSizeX: 200,
});
```

### `matrix`

Arranges child elements in a grid with explicit column and row counts.

Either `itemCount` or `tracks` is required per axis (not both). `itemSize` is specified together with `itemCount`.

> **Note:** Like `tile`, this layout assumes the container size is determined externally.

```ts
import { matrix } from '@fringeworks/style-layouts';

const { className, style } = matrix({
  direction: 'x',
  adjustX: 'fit',
  gap: 8,
  itemSizeX: 200,
  itemCountX: 3,
  itemCountY: 2,
});

// Using explicit track templates
matrix({
  tracksX: ['1fr', '2fr', '1fr'],
  itemCountY: 3,
});
```

A number in `tracks` is treated as px, and a string as a CSS track size (`'1fr'`, `'20%'`, `'auto'`, etc.).\
When `adjust` is specified, px tracks grow and shrink while keeping the ratio of their values.

| `adjust`   | Behavior of px tracks                                                                 |
| ---------- | ------------------------------------------------------------------------------------- |
| `'none'`   | Keeps the specified size                                                              |
| `'fit'`    | Grows and shrinks to fill the container, keeping the ratio                            |
| `'grow'`   | Grows to fill the container, keeping the ratio. Never smaller than the specified size |
| `'shrink'` | Shrinks to fit the container, keeping the ratio. Never larger than the specified size |

> **Note:** When `adjust` is specified, do not mix px with other units (`fr`, `%`, etc.). The ratio is not guaranteed in that case.

### `center`

Places child elements at the center of the container.\
Even when the container becomes smaller than the child elements, the first child element remains visible within the container without overflow.

```ts
import { center } from '@fringeworks/style-layouts';

const { className, style } = center({
  direction: 'x',
  adjustX: 'shrink',
  gap: 8,
  itemSizeY: 200,
  itemRatioX: 1.6,
});
```

### `pack`

Sizes child elements equally to fill the container.

```ts
import { pack } from '@fringeworks/style-layouts';

const { className, style } = pack({
  direction: 'x',
  gap: 8,
});
```

### `balance`

Arranges child elements evenly in a single row or column.

- Without `adjust`: maintains child size and distributes space evenly between items
- With `adjust`: adjusts child size to fill the container evenly

```ts
import { balance } from '@fringeworks/style-layouts';

const { className, style } = balance({
  direction: 'x',
  adjustX: 'grow',
  itemSizeX: 200,
  gap: 8,
});
```

### `layer`

Stacks child elements on top of each other at the same position.

> `space-between`, `space-around`, and `space-evenly` cannot be specified for `alignX` / `alignY`.

```ts
import { layer } from '@fringeworks/style-layouts';

const { className, style } = layer({
  alignX: 'center',
  adjustX: 'shrink',
  itemSizeY: 200,
  itemRatioX: 1.6,
});
```

### `pin`

Positions child elements at specified coordinates. Each child element should have its position set via `top` / `left` / `bottom` / `right` styles.

```ts
import { pin } from '@fringeworks/style-layouts';

const { className, style } = pin({
  itemSizeX: 100,
  itemSizeY: 80,
});
```

## API

### Layout Functions

| Function            | Description                                                     |
| ------------------- | --------------------------------------------------------------- |
| `stack(options?)`   | Arranges children in a single row or column                     |
| `flow(options?)`    | Arranges children and wraps them at the container size          |
| `tile(options?)`    | Arranges children in a grid based on their size                 |
| `matrix(options)`   | Arranges children in a grid with explicit column and row counts |
| `center(options?)`  | Places children at the center                                   |
| `pack(options?)`    | Fills the container with children                               |
| `balance(options?)` | Arranges children evenly in a single row or column              |
| `layer(options?)`   | Stacks children on top of each other                            |
| `pin(options?)`     | Positions children with `top` / `left` / `bottom` / `right`     |

```ts
stack(options?: StackLayoutOptions): LayoutStyle
flow(options?: FlowLayoutOptions): LayoutStyle
tile(options?: TileLayoutOptions): LayoutStyle
matrix(options: MatrixLayoutOptions): LayoutStyle
center(options?: CenterLayoutOptions): LayoutStyle
pack(options?: PackLayoutOptions): LayoutStyle
balance(options?: BalanceLayoutOptions): LayoutStyle
layer(options?: LayerLayoutOptions): LayoutStyle
pin(options?: PinLayoutOptions): LayoutStyle
```

Returns the class names and CSS custom properties to apply to the container element. `matrix` requires columns and rows, so its options cannot be omitted.

| Parameter  | Type                                  | Description       |
| ---------- | ------------------------------------- | ----------------- |
| `options?` | `StackLayoutOptions`, etc. per layout | The options below |

#### Options by Layout

| Option       | stack | flow | tile | matrix | center | pack | balance | layer | pin |
| ------------ | :---: | :--: | :--: | :----: | :----: | :--: | :-----: | :---: | :-: |
| `direction`  |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  ✓   |    ✓    |   —   |  —  |
| `alignX`     |   ✓   |  ✓   |  ✓   |   ✓    |   —    |  —   |    ✓    |   ✓   |  —  |
| `alignY`     |   ✓   |  ✓   |  ✓   |   ✓    |   —    |  —   |    ✓    |   ✓   |  —  |
| `adjustX`    |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  —   |    ✓    |   ✓   |  —  |
| `adjustY`    |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  —   |    ✓    |   ✓   |  —  |
| `gap`        |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  ✓   |    ✓    |   —   |  —  |
| `gapX`       |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  ✓   |    ✓    |   —   |  —  |
| `gapY`       |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  ✓   |    ✓    |   —   |  —  |
| `itemSizeX`  |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  —   |    ✓    |   ✓   |  ✓  |
| `itemSizeY`  |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  —   |    ✓    |   ✓   |  ✓  |
| `itemRatioX` |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  —   |    ✓    |   ✓   |  ✓  |
| `itemRatioY` |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  —   |    ✓    |   ✓   |  ✓  |
| `itemCountX` |   —   |  —   |  —   |   ✓    |   —    |  —   |    —    |   —   |  —  |
| `itemCountY` |   —   |  —   |  —   |   ✓    |   —    |  —   |    —    |   —   |  —  |
| `tracksX`    |   —   |  —   |  —   |   ✓    |   —    |  —   |    —    |   —   |  —  |
| `tracksY`    |   —   |  —   |  —   |   ✓    |   —    |  —   |    —    |   —   |  —  |

#### Options Reference

| Option        | Type                       | Description                                                                      |
| ------------- | -------------------------- | -------------------------------------------------------------------------------- |
| `direction?`  | `'x' \| 'y'`               | Main axis direction (default: `'x'`)                                             |
| `alignX?`     | [`AlignX`](#alignx-values) | Horizontal alignment of children (default: `'left'`)                             |
| `alignY?`     | [`AlignY`](#aligny-values) | Vertical alignment of children (default: `'top'`)                                |
| `adjustX?`    | [`Adjust`](#adjust-values) | Horizontal size adjustment of children (default: `'none'`)                       |
| `adjustY?`    | [`Adjust`](#adjust-values) | Vertical size adjustment of children (default: `'none'`)                         |
| `gap?`        | `number`                   | Gap between children in px, both axes (default: `0`)                             |
| `gapX?`       | `number`                   | Gap between children in px, horizontal (default: `gap`)                          |
| `gapY?`       | `number`                   | Gap between children in px, vertical (default: `gap`)                            |
| `itemSizeX?`  | `number`                   | Width of child elements in px (if omitted, the child's own width)                |
| `itemSizeY?`  | `number`                   | Height of child elements in px (if omitted, the child's own height)              |
| `itemRatioX?` | `number`                   | Horizontal ratio of child elements (`1` if only `itemRatioY` is specified)       |
| `itemRatioY?` | `number`                   | Vertical ratio of child elements (`1` if only `itemRatioX` is specified)         |
| `itemCountX?` | `number`                   | Number of children horizontally (required by `matrix` unless `tracksX` is given) |
| `itemCountY?` | `number`                   | Number of children vertically (required by `matrix` unless `tracksY` is given)   |
| `tracksX?`    | `(string \| number)[]`     | Individual sizes of children horizontally (`matrix`, instead of `itemCountX`)    |
| `tracksY?`    | `(string \| number)[]`     | Individual sizes of children vertically (`matrix`, instead of `itemCountY`)      |

Combinations not allowed for a given `direction` are type errors (omitting `direction` is treated as `'x'`).

| Layout             | `direction: 'x'` (default)             | `direction: 'y'`                       |
| ------------------ | -------------------------------------- | -------------------------------------- |
| `stack`, `balance` | `space-*` is not allowed for `alignY`  | `space-*` is not allowed for `alignX`  |
| `flow`             | Only `'none'` is allowed for `adjustY` | Only `'none'` is allowed for `adjustX` |

#### `AlignX` Values

| Value             | Horizontal Position        |
| ----------------- | -------------------------- |
| `'left'`          | Align to left              |
| `'center'`        | Align to center            |
| `'right'`         | Align to right             |
| `'space-between'` | Space between items        |
| `'space-around'`  | Space around items         |
| `'space-evenly'`  | Space evenly between items |

#### `AlignY` Values

| Value             | Vertical Position          |
| ----------------- | -------------------------- |
| `'top'`           | Align to top               |
| `'middle'`        | Align to middle            |
| `'bottom'`        | Align to bottom            |
| `'space-between'` | Space between items        |
| `'space-around'`  | Space around items         |
| `'space-evenly'`  | Space evenly between items |

#### `Adjust` Values

| Value      | Child smaller than parent | Child larger than parent |
| ---------- | ------------------------- | ------------------------ |
| `'none'`   | No change                 | No change                |
| `'grow'`   | Grows to fill             | No change                |
| `'shrink'` | No change                 | Shrinks to fit           |
| `'fit'`    | Grows to fill             | Shrinks to fit           |

> **Note:** If individual width or height is set on a child element, that value takes precedence and the behavior described above may not apply.

### `extract*Options`

| Function                        | Description                                           |
| ------------------------------- | ----------------------------------------------------- |
| `extractStackOptions(record)`   | Separates `stack` options from the other properties   |
| `extractFlowOptions(record)`    | Separates `flow` options from the other properties    |
| `extractTileOptions(record)`    | Separates `tile` options from the other properties    |
| `extractMatrixOptions(record)`  | Separates `matrix` options from the other properties  |
| `extractCenterOptions(record)`  | Separates `center` options from the other properties  |
| `extractPackOptions(record)`    | Separates `pack` options from the other properties    |
| `extractBalanceOptions(record)` | Separates `balance` options from the other properties |
| `extractLayerOptions(record)`   | Separates `layer` options from the other properties   |
| `extractPinOptions(record)`     | Separates `pin` options from the other properties     |

```ts
extractStackOptions<T extends Record<string, unknown>>(
  record: T,
): [StackLayoutOptions, Omit<T, keyof StackLayoutOptions>]
```

Separates the layout options from the other properties (e.g. component props) and returns them as a `[layoutOptions, rest]` tuple. Properties whose value is `undefined` are also sorted by their key. The other `extract*Options` functions have the same shape.

```ts
import { extractStackOptions, stack } from '@fringeworks/style-layouts';

const [layoutOptions, rest] = extractStackOptions({ gap: 8, id: 'list' });
// layoutOptions: { gap: 8 }, rest: { id: 'list' }
const { className, style } = stack(layoutOptions);
```

### Constants

Constants that list the option values. A type with the same name (the union of the values) is also exported.

| Constant     | Description                                                     |
| ------------ | --------------------------------------------------------------- |
| `Direction`  | Values of `direction` (`x`, `y`)                                |
| `AlignX`     | Values of `alignX`                                              |
| `AlignXBase` | Values of `alignX` except `space-*` (`left`, `center`, `right`) |
| `AlignY`     | Values of `alignY`                                              |
| `AlignYBase` | Values of `alignY` except `space-*` (`top`, `middle`, `bottom`) |
| `Adjust`     | Values of `adjustX` / `adjustY`                                 |
| `AdjustBase` | Values of `adjustX` / `adjustY` limited to `none`               |

### Types

| Type                   | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `LayoutStyle`          | Return value of the layout functions                 |
| `CreateLayoutStyle<O>` | Type of a layout function whose options are optional |
| `StackLayoutOptions`   | Options of `stack`                                   |
| `FlowLayoutOptions`    | Options of `flow`                                    |
| `TileLayoutOptions`    | Options of `tile`                                    |
| `MatrixLayoutOptions`  | Options of `matrix`                                  |
| `CenterLayoutOptions`  | Options of `center`                                  |
| `PackLayoutOptions`    | Options of `pack`                                    |
| `BalanceLayoutOptions` | Options of `balance`                                 |
| `LayerLayoutOptions`   | Options of `layer`                                   |
| `PinLayoutOptions`     | Options of `pin`                                     |

```ts
type LayoutStyle = {
  className?: string;
  style?: {
    [key: `--${string}`]: string | undefined;
  };
};
```

## Browser Support

This library is built on modern CSS standards and supports the following major browser versions.

| Browser         | Supported Versions            |
| --------------- | ----------------------------- |
| Google Chrome   | 88 (January 2021) and later   |
| Microsoft Edge  | 88 (January 2021) and later   |
| Mozilla Firefox | 89 (June 2021) and later      |
| Apple Safari    | 15 (September 2021) and later |

## License

MIT
