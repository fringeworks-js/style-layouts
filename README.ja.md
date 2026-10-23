# @fringeworks/style-layouts

`@fringeworks/style-layouts` は、CSSによる子要素のレイアウト制御に特化した、誰かにとっては便利なライブラリです。\
オプションに応じたクラス名とCSS変数をオブジェクトとして返します。フレームワーク非依存でSSRにも対応しています。

**[English README is available here](./README.md)**

## 特徴

- フレームワーク非依存（あらゆるJS環境で動作）
- SSR対応（クラス名とインラインスタイルオブジェクトを返すだけ）
- TypeScriptによる完全な型サポート

## インストール

```bash
npm install @fringeworks/style-layouts
# または
pnpm add @fringeworks/style-layouts
```

## 使い方

各レイアウト関数は `{ className, style }` オブジェクトを返します。コンテナ要素に適用してください。

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

### CSSの読み込み

レイアウト関数はCSSをインポートしないため、SSRやReact Server Componentsでもそのまま使用できます。CSSは別途インポートしてください。

```ts
import { stack } from '@fringeworks/style-layouts';

// 全レイアウトをまとめてインポート
import '@fringeworks/style-layouts/styles.css';

// 必要なレイアウトのみインポート
import '@fringeworks/style-layouts/stack.css';
import '@fringeworks/style-layouts/tile.css';
```

CSSを自動的に読み込みたい場合は `with-css` 配下のモジュールを使用してください。CSSのインポートを扱えるバンドラーが必要です。\
`with-css` からは、レイアウト関数に加えて定数・ヘルパー・型も読み込めます。

```ts
import { stack } from '@fringeworks/style-layouts/with-css';
```

### 子要素ごとの指定（`*Item`）

コンテナに指定したオプションは、全ての子要素に適用されます。特定の子要素だけ指定を変えたい場合は、その子要素に `*Item()` の戻り値を適用します。`*Item()` で指定したオプションだけが、コンテナの指定を上書きします。

> `stack`・`flow`・`center`・`layer`・`pin` に対応しています（`stackItem` など）。`tile`・`matrix`・`balance`・`pack` は、子要素のサイズをコンテナ（グリッドのトラックなど）で決めているため対応していません。

```ts
import { stack, stackItem } from '@fringeworks/style-layouts';

// コンテナ: 全ての子要素の幅を100pxにする
const container = stack({ direction: 'x', itemSizeX: 100 });

// この子要素だけ、残りの幅を埋める
const item = stackItem({ adjustX: 'grow' });
```

`stackItem()` を適用した子要素だけをレイアウトの対象にしたい場合は、コンテナに `limitToItems: true` を指定します。`stackItem()` を適用していない子要素には、子要素に当てるスタイルが適用されません。コンテナの指定は、`stackItem()` を適用した子要素の既定値として使われます。

```ts
const container = stack({ limitToItems: true, itemSizeX: 100 });
const item = stackItem(); // 幅100px
// stackItem() を適用していない子要素は対象外
```

> **注意:** 対象外の子要素にも、コンテナ自体のスタイル（`gap`・並ぶ位置など）は影響します。flex・gridのアイテムとして並ぶこと自体は変わらないため、並びから外したい場合は `position: absolute` などを指定してください。\
> また、`center` は先頭と末尾の子要素で中央に寄せているため、対象外の子要素は先頭と末尾以外に置いてください。

`*Item()` のオプションでは、サイズと縦横比の名前に `item` を付けません。

| コンテナのオプション                          | `*Item()` のオプション            |
| --------------------------------------------- | --------------------------------- |
| `adjustX` / `adjustY`                         | `adjustX` / `adjustY`             |
| `itemSizeX` / `itemSizeY`                     | `sizeX` / `sizeY`                 |
| `itemRatioX` / `itemRatioY`                   | `ratioX` / `ratioY`               |
| `alignX` / `alignY`（`layer`・`pin` のみ）    | `alignX` / `alignY`               |
| `itemOffsetX` / `itemOffsetY` / `itemOffsetZ` | `offsetX` / `offsetY` / `offsetZ` |

> `@fringeworks/style-layouts-adornment` の `*Item()` は、装飾の位置などの役割を子要素ごとに決めるもので、適用した子要素だけが装飾になります。`style-layouts` では子要素の役割が全て同じなので、コンテナの指定が全ての子要素に適用され、`*Item()` はそれを子要素ごとに変えるために使います。`limitToItems: true` を指定すると、`style-layouts-adornment` と同じく `*Item()` を適用した子要素だけが対象になります。

### レイアウトの入れ子

子要素自身もレイアウトのコンテナにできます。親の `itemSize`・`itemRatio` は、子要素がレイアウトのコンテナでも適用されます。

ただし、親と子要素の両方で同じオプション（例: 両方で `itemSizeX`）を指定すると、子要素自身のサイズにも子要素側の値が使われます。\
これはCSS変数の仕組みによる制限です。この場合は、子要素自身のサイズを `*Item()` で指定するか、子要素を `<div>` などで包み、その中にレイアウトを置いてください。

```ts
// 子要素（自身も stack のコンテナ）には、両方のクラス名とスタイルを適用する
const layout = stack({ itemSizeX: 50 }); // 子要素の子の幅: 50px
const item = stackItem({ sizeX: 200 }); // 子要素自身の幅: 200px
```

```html
<!-- 親: stack({ itemSizeX: 200 }) -->
<div class="frg-layout-stack ...">
  <!-- 親の itemSizeX (200px) が適用される -->
  <div>
    <!-- 子要素のレイアウト: stack({ itemSizeX: 50 }) -->
    <div class="frg-layout-stack ...">...</div>
  </div>
</div>
```

## レイアウト種別

### `stack`

子要素を縦または横方向に一列に並べます。

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

`stack`と同様ですが、コンテナサイズを超えた場合に子要素を折り返します。

> 交差軸方向の `adjustX` / `adjustY` に `grow`、`shrink`、`fit` は指定できません。

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

子要素のサイズを基準にして格子状に並べます。列数は親要素のサイズと子要素のサイズに応じて自動で決まります。

> **注意:** このレイアウトはコンテナのサイズが外部から確定していることを前提としています。`width: max-content` など、子要素によってサイズが決まる親要素では、パーセンテージ値が意図通りに動作しない場合があります。

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

列数・行数を指定して子要素を格子状に並べます。

各軸で `itemCount` または `tracks` のどちらか一方が必須です（両方は指定不可）。`itemSize` は `itemCount` と組み合わせて指定します。

> **注意:** `tile` と同様に、コンテナのサイズが外部から確定していることを前提としています。

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

// グリッドトラックを直接指定する場合
matrix({
  tracksX: ['1fr', '2fr', '1fr'],
  itemCountY: 3,
});
```

`tracks` の値は、数値ならpx、文字列ならCSSのトラックサイズ（`'1fr'`・`'20%'`・`'auto'` など）として扱います。\
`adjust` を指定した場合、pxのトラックは値の比率を保ったまま伸縮します。

| `adjust`   | pxのトラックの動作                                                             |
| ---------- | ------------------------------------------------------------------------------ |
| `'none'`   | 指定のサイズのまま                                                             |
| `'fit'`    | 比率を保ったまま、親要素を満たすように伸縮する                                 |
| `'grow'`   | 比率を保ったまま、親要素を満たすように伸びる。指定のサイズより小さくはならない |
| `'shrink'` | 比率を保ったまま、親要素に収まるように縮む。指定のサイズより大きくはならない   |

> **注意:** `adjust` を指定する場合、pxと他の単位（`fr`・`%` など）を混ぜないでください。混ぜた場合の比率は保証しません。

### `center`

子要素を親要素の中央に配置します。\
親要素が子要素より小さくなった場合でも、先頭の子要素が親要素の外にはみ出さずに表示されます。

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

子要素を親要素のサイズに合わせて均等にサイズ調整し並べます。

```ts
import { pack } from '@fringeworks/style-layouts';

const { className, style } = pack({
  direction: 'x',
  gap: 8,
});
```

### `balance`

子要素を一列に均等に並べます。

- `adjust` なし: 子要素のサイズを維持したまま、余白を均等に配分します
- `adjust` あり: 子要素のサイズを調整してコンテナを満たします

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

子要素を重ねて全て同じ位置に配置します。\
子要素の位置（`alignX` / `alignY`）は、子要素が親要素より大きい場合も親要素を基準にします（中央寄せの場合は両側にはみ出します）。

> `alignX` / `alignY` に `space-between`、`space-around`、`space-evenly` は指定できません。

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

子要素を指定の座標に配置します。\
`alignX` / `alignY` で基準にする親要素の辺を選び、`offsetX` / `offsetY` でその辺からの距離を指定します。`offsetZ` で重なり順を指定します。オフセットを指定しない場合は、子要素の `top` / `left` / `bottom` / `right` スタイルに従います。

```ts
import { pin, pinItem } from '@fringeworks/style-layouts';

// コンテナ: 全ての子要素の大きさと、位置の基準（右下）
const { className, style } = pin({
  alignX: 'right',
  alignY: 'bottom',
  itemSizeX: 100,
  itemSizeY: 80,
});

// 子要素: 右端から20px、下端から親の高さの10%、他の子要素より手前
const item = pinItem({ offsetX: 20, offsetY: '10%', offsetZ: 1 });
```

> オフセットの数値はpxです。文字列（`'10%'`・`'1rem'` など）はそのままCSSの値として使います。

## API

### レイアウト関数

| 関数                | 説明                                                    |
| ------------------- | ------------------------------------------------------- |
| `stack(options?)`   | 子要素を一列に並べる                                    |
| `flow(options?)`    | 子要素を並べ、親要素のサイズに達したら折り返す          |
| `tile(options?)`    | 子要素のサイズを基準にして格子状に並べる                |
| `matrix(options)`   | 列数・行数を指定して格子状に並べる                      |
| `center(options?)`  | 子要素を中央に配置する                                  |
| `pack(options?)`    | 子要素で親要素を満たす                                  |
| `balance(options?)` | 子要素を一列に均等に並べる                              |
| `layer(options?)`   | 子要素を重ねて配置する                                  |
| `pin(options?)`     | 子要素を `top` / `left` / `bottom` / `right` で配置する |

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

コンテナ要素に適用するクラス名とCSS変数を返します。`matrix` は列と行の指定が必要なため、オプションを省略できません。

| 引数       | 型                                      | 説明             |
| ---------- | --------------------------------------- | ---------------- |
| `options?` | `StackLayoutOptions` などレイアウトごと | 下記のオプション |

#### レイアウト別対応表

| オプション     | stack | flow | tile | matrix | center | pack | balance | layer | pin |
| -------------- | :---: | :--: | :--: | :----: | :----: | :--: | :-----: | :---: | :-: |
| `direction`    |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  ✓   |    ✓    |   —   |  —  |
| `alignX`       |   ✓   |  ✓   |  ✓   |   ✓    |   —    |  —   |    ✓    |   ✓   | ✓ ※ |
| `alignY`       |   ✓   |  ✓   |  ✓   |   ✓    |   —    |  —   |    ✓    |   ✓   | ✓ ※ |
| `adjustX`      |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  —   |    ✓    |   ✓   |  —  |
| `adjustY`      |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  —   |    ✓    |   ✓   |  —  |
| `gap`          |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  ✓   |    ✓    |   —   |  —  |
| `gapX`         |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  ✓   |    ✓    |   —   |  —  |
| `gapY`         |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  ✓   |    ✓    |   —   |  —  |
| `itemSizeX`    |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  —   |    ✓    |   ✓   |  ✓  |
| `itemSizeY`    |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  —   |    ✓    |   ✓   |  ✓  |
| `itemRatioX`   |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  —   |    ✓    |   ✓   |  ✓  |
| `itemRatioY`   |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  —   |    ✓    |   ✓   |  ✓  |
| `itemCountX`   |   —   |  —   |  —   |   ✓    |   —    |  —   |    —    |   —   |  —  |
| `itemCountY`   |   —   |  —   |  —   |   ✓    |   —    |  —   |    —    |   —   |  —  |
| `tracksX`      |   —   |  —   |  —   |   ✓    |   —    |  —   |    —    |   —   |  —  |
| `tracksY`      |   —   |  —   |  —   |   ✓    |   —    |  —   |    —    |   —   |  —  |
| `itemOffsetX`  |   —   |  —   |  —   |   —    |   —    |  —   |    —    |   —   |  ✓  |
| `itemOffsetY`  |   —   |  —   |  —   |   —    |   —    |  —   |    —    |   —   |  ✓  |
| `itemOffsetZ`  |   —   |  —   |  —   |   —    |   —    |  —   |    —    |   ✓   |  ✓  |
| `limitToItems` |   ✓   |  ✓   |  —   |   —    |   ✓    |  —   |    —    |   ✓   |  ✓  |

※ `pin` の `alignX` は `'left'` / `'right'`、`alignY` は `'top'` / `'bottom'` だけを指定でき、オフセットを測る辺を表します。

#### オプション一覧

| オプション      | 型                       | 説明                                                                                  |
| --------------- | ------------------------ | ------------------------------------------------------------------------------------- |
| `direction?`    | `'x' \| 'y'`             | 主軸の方向 (デフォルト `'x'`)                                                         |
| `alignX?`       | [`AlignX`](#alignx-の値) | 子要素の横位置 (デフォルト `'left'`)                                                  |
| `alignY?`       | [`AlignY`](#aligny-の値) | 子要素の縦位置 (デフォルト `'top'`)                                                   |
| `adjustX?`      | [`Adjust`](#adjust-の値) | 子要素の横方向のサイズ調整 (デフォルト `'none'`)                                      |
| `adjustY?`      | [`Adjust`](#adjust-の値) | 子要素の縦方向のサイズ調整 (デフォルト `'none'`)                                      |
| `gap?`          | `number`                 | 子要素間の余白 (px,横縦共通。デフォルト `0`)                                          |
| `gapX?`         | `number`                 | 子要素間の余白 (px,横方向。デフォルト `gap`)                                          |
| `gapY?`         | `number`                 | 子要素間の余白 (px,縦方向。デフォルト `gap`)                                          |
| `itemSizeX?`    | `number`                 | 子要素の幅 (px。省略時は子要素自身の幅)                                               |
| `itemSizeY?`    | `number`                 | 子要素の高さ (px。省略時は子要素自身の高さ)                                           |
| `itemRatioX?`   | `number`                 | 子要素の幅の比 (`itemRatioY` のみ指定した場合は `1`)                                  |
| `itemRatioY?`   | `number`                 | 子要素の高さの比 (`itemRatioX` のみ指定した場合は `1`)                                |
| `itemCountX?`   | `number`                 | 子要素の横方向の数 (`matrix` では `tracksX` を指定しない場合に必須)                   |
| `itemCountY?`   | `number`                 | 子要素の縦方向の数 (`matrix` では `tracksY` を指定しない場合に必須)                   |
| `tracksX?`      | `(string \| number)[]`   | 子要素の横方向の個々のサイズ (`matrix` では `itemCountX` の代わりに指定)              |
| `tracksY?`      | `(string \| number)[]`   | 子要素の縦方向の個々のサイズ (`matrix` では `itemCountY` の代わりに指定)              |
| `itemOffsetX?`  | `number \| string`       | 子要素の横方向のオフセット (`alignX` の辺からの距離。数値はpx)                        |
| `itemOffsetY?`  | `number \| string`       | 子要素の縦方向のオフセット (`alignY` の辺からの距離。数値はpx)                        |
| `itemOffsetZ?`  | `number`                 | 子要素の重なり順 (`z-index`)                                                          |
| `limitToItems?` | `boolean`                | 子要素に当てるスタイルを、`*Item()` を適用した子要素だけに当てる (デフォルト `false`) |

`direction` によって指定できない組み合わせは型でエラーになります（`direction` を省略した場合は `'x'` と同じ扱い）。

| レイアウト         | `direction: 'x'`（省略時）           | `direction: 'y'`                     |
| ------------------ | ------------------------------------ | ------------------------------------ |
| `stack`・`balance` | `alignY` に `space-*` は指定不可     | `alignX` に `space-*` は指定不可     |
| `flow`             | `adjustY` に `'none'` 以外は指定不可 | `adjustX` に `'none'` 以外は指定不可 |

#### `AlignX` の値

| 値                | 横方向の位置     |
| ----------------- | ---------------- |
| `'left'`          | 左寄せ           |
| `'center'`        | 中央寄せ         |
| `'right'`         | 右寄せ           |
| `'space-between'` | 両端揃え         |
| `'space-around'`  | 両端余白あり均等 |
| `'space-evenly'`  | 完全均等         |

#### `AlignY` の値

| 値                | 縦方向の位置     |
| ----------------- | ---------------- |
| `'top'`           | 上寄せ           |
| `'middle'`        | 中央寄せ         |
| `'bottom'`        | 下寄せ           |
| `'space-between'` | 両端揃え         |
| `'space-around'`  | 両端余白あり均等 |
| `'space-evenly'`  | 完全均等         |

#### `Adjust` の値

| 値         | 子が親より小さい時 | 子が親より大きい時 |
| ---------- | ------------------ | ------------------ |
| `'none'`   | そのまま           | そのまま           |
| `'grow'`   | 伸びる             | そのまま           |
| `'shrink'` | そのまま           | 縮む               |
| `'fit'`    | 伸びる             | 縮む               |

> **注意:** 子要素に個別の幅や高さが設定されている場合、その値が優先されるため上記の動作にならないことがあります。

### アイテム関数

| 関数                   | 説明                                                  |
| ---------------------- | ----------------------------------------------------- |
| `stackItem(options?)`  | `stack` の子要素に適用し、コンテナの指定を上書きする  |
| `flowItem(options?)`   | `flow` の子要素に適用し、コンテナの指定を上書きする   |
| `centerItem(options?)` | `center` の子要素に適用し、コンテナの指定を上書きする |
| `layerItem(options?)`  | `layer` の子要素に適用し、コンテナの指定を上書きする  |
| `pinItem(options?)`    | `pin` の子要素に適用し、コンテナの指定を上書きする    |

```ts
stackItem(options?: StackItemOptions): LayoutStyle
flowItem(options?: FlowItemOptions): LayoutStyle
centerItem(options?: CenterItemOptions): LayoutStyle
layerItem(options?: LayerItemOptions): LayoutStyle
pinItem(options?: PinItemOptions): LayoutStyle
```

子要素に適用するクラス名とCSS変数を返します。指定したオプションだけがコンテナの指定を上書きし、指定しないオプションはコンテナの指定に従います。主軸・交差軸はコンテナの `direction` で決まります。

| 引数       | 型                                    | 説明             |
| ---------- | ------------------------------------- | ---------------- |
| `options?` | `StackItemOptions` などレイアウトごと | 下記のオプション |

#### レイアウト別対応表

| オプション | stackItem | flowItem | centerItem | layerItem | pinItem |
| ---------- | :-------: | :------: | :--------: | :-------: | :-----: |
| `alignX`   |     —     |    —     |     —      |     ✓     |   ✓ ※   |
| `alignY`   |     —     |    —     |     —      |     ✓     |   ✓ ※   |
| `adjustX`  |     ✓     |    ✓     |     ✓      |     ✓     |    —    |
| `adjustY`  |     ✓     |    ✓     |     ✓      |     ✓     |    —    |
| `sizeX`    |     ✓     |    ✓     |     ✓      |     ✓     |    ✓    |
| `sizeY`    |     ✓     |    ✓     |     ✓      |     ✓     |    ✓    |
| `ratioX`   |     ✓     |    ✓     |     ✓      |     ✓     |    ✓    |
| `ratioY`   |     ✓     |    ✓     |     ✓      |     ✓     |    ✓    |
| `offsetX`  |     —     |    —     |     —      |     —     |    ✓    |
| `offsetY`  |     —     |    —     |     —      |     —     |    ✓    |
| `offsetZ`  |     —     |    —     |     —      |     ✓     |    ✓    |

※ `pinItem` の `alignX` は `'left'` / `'right'`、`alignY` は `'top'` / `'bottom'` だけを指定でき、オフセットを測る辺を表します。

#### オプション一覧

| オプション | 型                              | 説明                                                   |
| ---------- | ------------------------------- | ------------------------------------------------------ |
| `alignX?`  | `'left' \| 'center' \| 'right'` | 横位置（`pinItem` ではオフセットを測る辺）             |
| `alignY?`  | `'top' \| 'middle' \| 'bottom'` | 縦位置（`pinItem` ではオフセットを測る辺）             |
| `adjustX?` | [`Adjust`](#adjust-の値)        | 横方向のサイズ調整                                     |
| `adjustY?` | [`Adjust`](#adjust-の値)        | 縦方向のサイズ調整                                     |
| `sizeX?`   | `number`                        | 幅 (px)                                                |
| `sizeY?`   | `number`                        | 高さ (px)                                              |
| `ratioX?`  | `number`                        | 幅の比 (`ratioY` のみ指定した場合は `1`)               |
| `ratioY?`  | `number`                        | 高さの比 (`ratioX` のみ指定した場合は `1`)             |
| `offsetX?` | `number \| string`              | 横方向のオフセット (`alignX` の辺からの距離。数値はpx) |
| `offsetY?` | `number \| string`              | 縦方向のオフセット (`alignY` の辺からの距離。数値はpx) |
| `offsetZ?` | `number`                        | 重なり順 (`z-index`)                                   |

> `flowItem` の交差軸方向の `adjust` は、コンテナと同じく適用されません（主軸・交差軸はコンテナの `direction` で決まるため、型ではエラーになりません）。

### `extract*Options`

| 関数                               | 説明                                                    |
| ---------------------------------- | ------------------------------------------------------- |
| `extractStackOptions(record)`      | `stack` のオプションとそれ以外のプロパティを分ける      |
| `extractFlowOptions(record)`       | `flow` のオプションとそれ以外のプロパティを分ける       |
| `extractTileOptions(record)`       | `tile` のオプションとそれ以外のプロパティを分ける       |
| `extractMatrixOptions(record)`     | `matrix` のオプションとそれ以外のプロパティを分ける     |
| `extractCenterOptions(record)`     | `center` のオプションとそれ以外のプロパティを分ける     |
| `extractPackOptions(record)`       | `pack` のオプションとそれ以外のプロパティを分ける       |
| `extractBalanceOptions(record)`    | `balance` のオプションとそれ以外のプロパティを分ける    |
| `extractLayerOptions(record)`      | `layer` のオプションとそれ以外のプロパティを分ける      |
| `extractPinOptions(record)`        | `pin` のオプションとそれ以外のプロパティを分ける        |
| `extractStackItemOptions(record)`  | `stackItem` のオプションとそれ以外のプロパティを分ける  |
| `extractFlowItemOptions(record)`   | `flowItem` のオプションとそれ以外のプロパティを分ける   |
| `extractCenterItemOptions(record)` | `centerItem` のオプションとそれ以外のプロパティを分ける |
| `extractLayerItemOptions(record)`  | `layerItem` のオプションとそれ以外のプロパティを分ける  |
| `extractPinItemOptions(record)`    | `pinItem` のオプションとそれ以外のプロパティを分ける    |

```ts
extractStackOptions<T extends Record<string, unknown>>(
  record: T,
): [StackLayoutOptions, Omit<T, keyof StackLayoutOptions>]
```

コンポーネントのプロパティなどから、レイアウトのオプションとそれ以外のプロパティを分けて `[layoutOptions, rest]` のタプルで返します。値が `undefined` のプロパティも、キーの種類で振り分けます。他の `extract*Options` も同じ形です。

```ts
import { extractStackOptions, stack } from '@fringeworks/style-layouts';

const [layoutOptions, rest] = extractStackOptions({ gap: 8, id: 'list' });
// layoutOptions: { gap: 8 }, rest: { id: 'list' }
const { className, style } = stack(layoutOptions);
```

### 定数

オプションの値を列挙した定数です。同じ名前の型（値の union 型）も公開しています。

| 定数         | 説明                                                           |
| ------------ | -------------------------------------------------------------- |
| `Direction`  | `direction` の値 (`x`・`y`)                                    |
| `AlignX`     | `alignX` の値                                                  |
| `AlignXBase` | `alignX` の値のうち `space-*` 以外 (`left`・`center`・`right`) |
| `AlignY`     | `alignY` の値                                                  |
| `AlignYBase` | `alignY` の値のうち `space-*` 以外 (`top`・`middle`・`bottom`) |
| `Adjust`     | `adjustX` / `adjustY` の値                                     |
| `AdjustBase` | `adjustX` / `adjustY` の値のうち `none` のみ                   |

### 型

| 型                     | 説明                                     |
| ---------------------- | ---------------------------------------- |
| `LayoutStyle`          | レイアウト関数の戻り値                   |
| `CreateLayoutStyle<O>` | オプションを省略できるレイアウト関数の型 |
| `StackLayoutOptions`   | `stack` のオプション                     |
| `FlowLayoutOptions`    | `flow` のオプション                      |
| `TileLayoutOptions`    | `tile` のオプション                      |
| `MatrixLayoutOptions`  | `matrix` のオプション                    |
| `CenterLayoutOptions`  | `center` のオプション                    |
| `PackLayoutOptions`    | `pack` のオプション                      |
| `BalanceLayoutOptions` | `balance` のオプション                   |
| `LayerLayoutOptions`   | `layer` のオプション                     |
| `PinLayoutOptions`     | `pin` のオプション                       |
| `StackItemOptions`     | `stackItem` のオプション                 |
| `FlowItemOptions`      | `flowItem` のオプション                  |
| `CenterItemOptions`    | `centerItem` のオプション                |
| `LayerItemOptions`     | `layerItem` のオプション                 |
| `PinItemOptions`       | `pinItem` のオプション                   |
| `PinAlignX`            | `pin`・`pinItem` の `alignX` の値        |
| `PinAlignY`            | `pin`・`pinItem` の `alignY` の値        |

```ts
type LayoutStyle = {
  className?: string;
  style?: {
    [key: `--${string}`]: string | undefined;
  };
};
```

## 動作環境（対応ブラウザー）

本ライブラリはモダンCSSの標準仕様を用いて設計されており、下記のメジャーなブラウザーのバージョンに対応しています。

| ブラウザー      | 対応バージョン      |
| --------------- | ------------------- |
| Google Chrome   | 88 (2021年1月) 以降 |
| Microsoft Edge  | 88 (2021年1月) 以降 |
| Mozilla Firefox | 89 (2021年6月) 以降 |
| Apple Safari    | 15 (2021年9月) 以降 |

## ライセンス

MIT
