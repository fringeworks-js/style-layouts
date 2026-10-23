import type { Meta, StoryObj } from '../_internal/adapter';
import createTestRenderer from '../_internal/createTestRenderer';
import type { TestStoryArgs } from '../_shared/types';

const meta = {
  title: 'spec/center',
  render: createTestRenderer('center'),
} satisfies Meta<TestStoryArgs>;

export default meta;
type Story = StoryObj<TestStoryArgs>;

const ITEM_SIZE = '200px';
const GAP_SIZE = 20;

// ===== センタリング（デフォルト） =====

export const DirectionXCentering: Story = {
  args: { direction: 'x', itemSizeX: ITEM_SIZE, itemCount: 3 },
};
export const DirectionYCentering: Story = {
  args: { direction: 'y', itemSizeY: ITEM_SIZE, itemCount: 3 },
};

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

// ===== gap =====

export const DirectionXGapX: Story = {
  args: {
    direction: 'x',
    gapX: GAP_SIZE,
    itemSizeX: ITEM_SIZE,
    itemCount: 3,
  },
};
export const DirectionYGapY: Story = {
  args: {
    direction: 'y',
    gapY: GAP_SIZE,
    itemSizeY: ITEM_SIZE,
    itemCount: 3,
  },
};

// ===== 入れ子 =====

export const NestedAdjustXGrow: Story = {
  args: {
    direction: 'y',
    adjustX: 'grow',
    itemSizeX: ITEM_SIZE,
    itemCount: 2,
    childLayout: { name: 'center' },
  },
};

// ===== centerItem =====

export const EquivalentXContainer: Story = {
  args: {
    ...{ direction: 'x' },
    ...{ adjustX: 'shrink', itemSizeX: 400, adjustY: 'grow', itemSizeY: 100 },
    itemCount: 3,
  },
};
export const EquivalentXItem: Story = {
  args: {
    ...{ direction: 'x' },
    itemCount: 3,
    childItems: Array.from({ length: 3 }, () => ({
      adjustX: 'shrink',
      sizeX: 400,
      adjustY: 'grow',
      sizeY: 100,
    })),
  },
};
export const EquivalentYContainer: Story = {
  args: {
    ...{ direction: 'y' },
    ...{ adjustY: 'fit', adjustX: 'shrink', itemSizeX: 300 },
    itemCount: 2,
  },
};
export const EquivalentYItem: Story = {
  args: {
    ...{ direction: 'y' },
    itemCount: 2,
    childItems: Array.from({ length: 2 }, () => ({
      adjustY: 'fit',
      adjustX: 'shrink',
      sizeX: 300,
    })),
  },
};
export const EquivalentRatioContainer: Story = {
  args: {
    ...{ direction: 'x' },
    ...{ itemSizeX: 100, itemRatioX: 1, itemRatioY: 2 },
    itemCount: 3,
  },
};
export const EquivalentRatioItem: Story = {
  args: {
    ...{ direction: 'x' },
    itemCount: 3,
    childItems: Array.from({ length: 3 }, () => ({
      sizeX: 100,
      ratioX: 1,
      ratioY: 2,
    })),
  },
};

// アイテムの指定でコンテナの指定を上書きする
export const ItemOverride: Story = {
  args: {
    direction: 'x',
    itemSizeX: 100,
    adjustY: 'grow',
    itemCount: 3,
    childItems: [null, { adjustY: 'none' }, { sizeX: 50 }],
  },
};

// limitToItems: centerItemを適用した子要素だけが対象
export const LimitToItems: Story = {
  args: {
    direction: 'x',
    limitToItems: true,
    itemSizeX: 100,
    itemCount: 3,
    childItems: [{}, null, {}],
  },
};
