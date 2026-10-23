import type { Meta, StoryObj } from '../_internal/adapter';
import createTestRenderer from '../_internal/createTestRenderer';
import type { TestStoryArgs } from '../_shared/types';

const meta = {
  title: 'spec/stack',
  render: createTestRenderer('stack'),
} satisfies Meta<TestStoryArgs>;

export default meta;
type Story = StoryObj<TestStoryArgs>;

const ITEM_SIZE = '200px';
const ALIGN_ITEM_SIZE = '100px';
const GAP_SIZE = 20;

// ===== direction:x / 主軸(adjustX) =====

export const DirectionXAdjustXGrow: Story = {
  args: {
    direction: 'x',
    adjustX: 'grow',
    itemSizeX: ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionXAdjustXShrink: Story = {
  args: {
    direction: 'x',
    adjustX: 'shrink',
    itemSizeX: ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionXAdjustXFit: Story = {
  args: {
    direction: 'x',
    adjustX: 'fit',
    itemSizeX: ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionXAdjustXNone: Story = {
  args: {
    direction: 'x',
    adjustX: 'none',
    itemSizeX: ITEM_SIZE,
    itemCount: 3,
  },
};

// ===== direction:x / 交差軸(adjustY) =====

export const DirectionXAdjustYGrow: Story = {
  args: { direction: 'x', adjustY: 'grow', itemCount: 3 },
};
export const DirectionXAdjustYShrink: Story = {
  args: {
    direction: 'x',
    adjustY: 'shrink',
    itemSizeY: ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionXAdjustYFit: Story = {
  args: { direction: 'x', adjustY: 'fit', itemCount: 3 },
};
export const DirectionXAdjustYNone: Story = {
  args: {
    direction: 'x',
    adjustY: 'none',
    itemSizeY: ITEM_SIZE,
    itemCount: 3,
  },
};

// ===== direction:x / 主軸 alignX =====

export const DirectionXAlignXLeft: Story = {
  args: {
    direction: 'x',
    alignX: 'left',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionXAlignXCenter: Story = {
  args: {
    direction: 'x',
    alignX: 'center',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionXAlignXRight: Story = {
  args: {
    direction: 'x',
    alignX: 'right',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionXAlignXSpaceBetween: Story = {
  args: {
    direction: 'x',
    alignX: 'space-between',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionXAlignXSpaceAround: Story = {
  args: {
    direction: 'x',
    alignX: 'space-around',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionXAlignXSpaceEvenly: Story = {
  args: {
    direction: 'x',
    alignX: 'space-evenly',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};

// ===== direction:x / 交差軸 alignY =====

export const DirectionXAlignYTop: Story = {
  args: {
    direction: 'x',
    alignY: 'top',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionXAlignYMiddle: Story = {
  args: {
    direction: 'x',
    alignY: 'middle',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionXAlignYBottom: Story = {
  args: {
    direction: 'x',
    alignY: 'bottom',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};

// ===== direction:x / gap =====

export const DirectionXGapX: Story = {
  args: {
    direction: 'x',
    gapX: GAP_SIZE,
    itemSizeX: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};

// ===== direction:y / 主軸(adjustY) =====

export const DirectionYAdjustYGrow: Story = {
  args: {
    direction: 'y',
    adjustY: 'grow',
    itemSizeY: ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionYAdjustYShrink: Story = {
  args: {
    direction: 'y',
    adjustY: 'shrink',
    itemSizeY: ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionYAdjustYFit: Story = {
  args: {
    direction: 'y',
    adjustY: 'fit',
    itemSizeY: ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionYAdjustYNone: Story = {
  args: {
    direction: 'y',
    adjustY: 'none',
    itemSizeY: ITEM_SIZE,
    itemCount: 3,
  },
};

// ===== direction:y / 交差軸(adjustX) =====

export const DirectionYAdjustXGrow: Story = {
  args: { direction: 'y', adjustX: 'grow', itemCount: 3 },
};
export const DirectionYAdjustXShrink: Story = {
  args: {
    direction: 'y',
    adjustX: 'shrink',
    itemSizeX: ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionYAdjustXFit: Story = {
  args: { direction: 'y', adjustX: 'fit', itemCount: 3 },
};
export const DirectionYAdjustXNone: Story = {
  args: {
    direction: 'y',
    adjustX: 'none',
    itemSizeX: ITEM_SIZE,
    itemCount: 3,
  },
};

// ===== direction:y / 主軸 alignY =====

export const DirectionYAlignYTop: Story = {
  args: {
    direction: 'y',
    alignY: 'top',
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionYAlignYMiddle: Story = {
  args: {
    direction: 'y',
    alignY: 'middle',
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionYAlignYBottom: Story = {
  args: {
    direction: 'y',
    alignY: 'bottom',
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionYAlignYSpaceBetween: Story = {
  args: {
    direction: 'y',
    alignY: 'space-between',
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionYAlignYSpaceAround: Story = {
  args: {
    direction: 'y',
    alignY: 'space-around',
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionYAlignYSpaceEvenly: Story = {
  args: {
    direction: 'y',
    alignY: 'space-evenly',
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};

// ===== direction:y / 交差軸 alignX =====

export const DirectionYAlignXLeft: Story = {
  args: {
    direction: 'y',
    alignX: 'left',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionYAlignXCenter: Story = {
  args: {
    direction: 'y',
    alignX: 'center',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionYAlignXRight: Story = {
  args: {
    direction: 'y',
    alignX: 'right',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};

// ===== direction:y / gap =====

export const DirectionYGapY: Story = {
  args: {
    direction: 'y',
    gapY: GAP_SIZE,
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};

// ===== itemRatio =====

export const DirectionXChildRatio: Story = {
  args: {
    direction: 'x',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemRatioX: 1,
    itemRatioY: 1,
    itemCount: 3,
  },
};
export const DirectionYChildRatio: Story = {
  args: {
    direction: 'y',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemRatioX: 1,
    itemRatioY: 2,
    itemCount: 3,
  },
};

// ===== 入れ子 =====

export const NestedItemSize: Story = {
  args: {
    direction: 'x',
    itemSizeX: ITEM_SIZE,
    itemRatioX: 1,
    itemRatioY: 2,
    itemCount: 2,
    childLayout: { name: 'stack' },
  },
};

// ===== stackItem =====

// コンテナで指定した場合とアイテムで指定した場合で同じ結果になる
const EQUIVALENT_X = {
  container: { adjustX: 'grow', itemSizeX: 100, adjustY: 'fit' },
  item: { adjustX: 'grow', sizeX: 100, adjustY: 'fit' },
};
const EQUIVALENT_Y = {
  container: {
    adjustY: 'shrink',
    itemSizeY: 400,
    adjustX: 'grow',
    itemSizeX: 200,
  },
  item: { adjustY: 'shrink', sizeY: 400, adjustX: 'grow', sizeX: 200 },
};
const EQUIVALENT_RATIO = {
  container: { itemSizeX: 100, itemRatioX: 1, itemRatioY: 2 },
  item: { sizeX: 100, ratioX: 1, ratioY: 2 },
};

export const EquivalentXContainer: Story = {
  args: { direction: 'x', ...EQUIVALENT_X.container, itemCount: 3 },
};
export const EquivalentXItem: Story = {
  args: {
    direction: 'x',
    itemCount: 3,
    childItems: [EQUIVALENT_X.item, EQUIVALENT_X.item, EQUIVALENT_X.item],
  },
};
export const EquivalentYContainer: Story = {
  args: { direction: 'y', ...EQUIVALENT_Y.container, itemCount: 3 },
};
export const EquivalentYItem: Story = {
  args: {
    direction: 'y',
    itemCount: 3,
    childItems: [EQUIVALENT_Y.item, EQUIVALENT_Y.item, EQUIVALENT_Y.item],
  },
};
export const EquivalentRatioContainer: Story = {
  args: { direction: 'x', ...EQUIVALENT_RATIO.container, itemCount: 3 },
};
export const EquivalentRatioItem: Story = {
  args: {
    direction: 'x',
    itemCount: 3,
    childItems: [
      EQUIVALENT_RATIO.item,
      EQUIVALENT_RATIO.item,
      EQUIVALENT_RATIO.item,
    ],
  },
};

// アイテムの指定でコンテナの指定を上書きする
export const ItemOverride: Story = {
  args: {
    direction: 'x',
    itemSizeX: 100,
    adjustY: 'fit',
    itemCount: 3,
    childItems: [null, { adjustX: 'grow', adjustY: 'none' }, { sizeX: 50 }],
  },
};

// limitToItems: stackItemを適用した子要素だけが対象
export const LimitToItems: Story = {
  args: {
    direction: 'x',
    limitToItems: true,
    itemSizeX: 100,
    adjustY: 'fit',
    itemCount: 3,
    childItems: [{}, null, { sizeX: 50 }],
  },
};

// 子要素がレイアウトのコンテナで同じオプションを使う場合も、stackItemなら干渉しない
export const NestedItem: Story = {
  args: {
    direction: 'x',
    itemCount: 2,
    childLayout: { name: 'stack', options: { itemSizeX: 50 } },
    childItems: [{ sizeX: 200 }, { sizeX: 200 }],
  },
};
