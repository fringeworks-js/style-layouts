# @niche-works/style-layouts

`@niche-works/style-layouts` is a niche library specialized in controlling child element layout with CSS.
It returns class names and CSS custom properties as an object based on the given options. Framework-agnostic and SSR-compatible.

**[日本語のREADMEはこちら](./README.ja.md)**

## Features

- Framework-agnostic (works with any JS environment)
- SSR-compatible (returns plain class names and inline style objects)
- Fully typed with TypeScript

## Installation

```bash
npm install @niche-works/style-layouts
# or
pnpm add @niche-works/style-layouts
```

## Usage

Each layout function returns a `{ className, style }` object. Apply them to a container element.

```ts
import { stack } from '@niche-works/style-layouts';

const { className, style } = stack({
  direction: 'x',
  alignX: 'center',
  alignY: 'middle',
  gap: 16,
});

// className: "lx-layout-stack lx-layout-direction-x ..."
// style: { "--lx-layout-gapX": "16px", ... }
```

```html
<div class="lx-layout-stack ..." style="--lx-layout-gapX: 16px; ...">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### CSS

The default import automatically includes the CSS.

```ts
import { stack } from '@niche-works/style-layouts';
```

If you want to manage CSS and functions separately, use the modules under the `core` directory.

```ts
import { stack } from '@niche-works/style-layouts/core';

// Import all layouts at once
import '@niche-works/style-layouts/core/styles.css';

// Or import only what you need
import '@niche-works/style-layouts/core/stack.css';
import '@niche-works/style-layouts/core/tile.css';
```

## Layout Types

### `stack`

Arranges child elements in a single row or column.

```ts
import { stack } from '@niche-works/style-layouts';

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
import { flow } from '@niche-works/style-layouts';

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
import { tile } from '@niche-works/style-layouts';

const { className, style } = tile({
  direction: 'x',
  adjustX: 'fit',
  gap: 8,
  itemSizeX: 200,
});
```

### `matrix`

Arranges child elements in a grid with explicit column and row counts.

Either `itemCount` or `tracks` is required per axis (not both).

> **Note:** Like `tile`, this layout assumes the container size is determined externally.

```ts
import { matrix } from '@niche-works/style-layouts';

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

### `center`

Places child elements at the center of the container.
Even when the container becomes smaller than the child elements, the first child element remains visible within the container without overflow.

```ts
import { center } from '@niche-works/style-layouts';

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
import { pack } from '@niche-works/style-layouts';

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
import { balance } from '@niche-works/style-layouts';

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
import { layer } from '@niche-works/style-layouts';

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
import { pin } from '@niche-works/style-layouts';

const { className, style } = pin({
  itemSizeX: 100,
  itemSizeY: 80,
});
```

## Options

### Options by Layout

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

### Options Reference

| Option        | Type                       | Description                                                |
| ------------- | -------------------------- | ---------------------------------------------------------- |
| `direction?`  | `'x' \| 'y'`               | Main axis direction (default: `'x'`)                       |
| `alignX?`     | [`AlignX`](#alignx-values) | Horizontal alignment of children (default: `'left'`)       |
| `alignY?`     | [`AlignY`](#aligny-values) | Vertical alignment of children (default: `'top'`)          |
| `adjustX?`    | [`Adjust`](#adjust-values) | Horizontal size adjustment of children (default: `'none'`) |
| `adjustY?`    | [`Adjust`](#adjust-values) | Vertical size adjustment of children (default: `'none'`)   |
| `gap?`        | `number`                   | Gap between children in px (both axes)                     |
| `gapX?`       | `number`                   | Gap between children in px (horizontal)                    |
| `gapY?`       | `number`                   | Gap between children in px (vertical)                      |
| `itemSizeX?`  | `number`                   | Width of child elements in px                              |
| `itemSizeY?`  | `number`                   | Height of child elements in px                             |
| `itemRatioX?` | `number`                   | Horizontal ratio of child elements                         |
| `itemRatioY?` | `number`                   | Vertical ratio of child elements                           |
| `itemCountX?` | `number`                   | Number of children in horizontal direction                 |
| `itemCountY?` | `number`                   | Number of children in vertical direction                   |
| `tracksX?`    | `(string \| number)[]`     | Individual sizes of children (horizontal)                  |
| `tracksY?`    | `(string \| number)[]`     | Individual sizes of children (vertical)                    |

### `AlignX` Values

| Value             | Horizontal Position        |
| ----------------- | -------------------------- |
| `'left'`          | Align to left              |
| `'center'`        | Align to center            |
| `'right'`         | Align to right             |
| `'space-between'` | Space between items        |
| `'space-around'`  | Space around items         |
| `'space-evenly'`  | Space evenly between items |

### `AlignY` Values

| Value             | Vertical Position          |
| ----------------- | -------------------------- |
| `'top'`           | Align to top               |
| `'middle'`        | Align to middle            |
| `'bottom'`        | Align to bottom            |
| `'space-between'` | Space between items        |
| `'space-around'`  | Space around items         |
| `'space-evenly'`  | Space evenly between items |

### `Adjust` Values

| Value      | Child smaller than parent | Child larger than parent |
| ---------- | ------------------------- | ------------------------ |
| `'none'`   | No change                 | No change                |
| `'grow'`   | Grows to fill             | No change                |
| `'shrink'` | No change                 | Shrinks to fit           |
| `'fit'`    | Grows to fill             | Shrinks to fit           |

> **Note:** If individual width or height is set on a child element, that value takes precedence and the behavior described above may not apply.

## Return Value

All layout functions return a `LayoutStyle`:

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
