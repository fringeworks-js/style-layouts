import type { Meta, StoryObj } from '../_internal/adapter';
import createTestRenderer from '../_internal/createTestRenderer';
import type { TestStoryArgs } from '../_shared/types';

const meta = {
  title: 'spec/tile',
  render: createTestRenderer('tile'),
} satisfies Meta<TestStoryArgs>;

export default meta;
type Story = StoryObj<TestStoryArgs>;

const ITEM_SIZE = '200px';
const ALIGN_ITEM_SIZE = '100px';
const GAP_SIZE = 20;

// ===== direction:x / adjustX =====

export const AdjustXGrowWithSize: Story = {
  args: { adjustX: 'grow', itemSizeX: ITEM_SIZE, itemCount: 3 },
};
export const AdjustXShrinkWithSize: Story = {
  args: { adjustX: 'shrink', itemSizeX: ITEM_SIZE, itemCount: 3 },
};
export const AdjustXFitWithSize: Story = {
  args: { adjustX: 'fit', itemSizeX: ITEM_SIZE, itemCount: 3 },
};
export const AdjustXNoneWithSize: Story = {
  args: { adjustX: 'none', itemSizeX: ITEM_SIZE, itemCount: 3 },
};

// ===== direction:y / adjustY =====

export const AdjustYGrowWithSize: Story = {
  args: {
    direction: 'y',
    adjustY: 'grow',
    itemSizeY: ITEM_SIZE,
    itemCount: 3,
  },
};
export const AdjustYShrinkWithSize: Story = {
  args: {
    direction: 'y',
    adjustY: 'shrink',
    itemSizeY: ITEM_SIZE,
    itemCount: 3,
  },
};
export const AdjustYFitWithSize: Story = {
  args: {
    direction: 'y',
    adjustY: 'fit',
    itemSizeY: ITEM_SIZE,
    itemCount: 3,
  },
};
export const AdjustYNoneWithSize: Story = {
  args: {
    direction: 'y',
    adjustY: 'none',
    itemSizeY: ITEM_SIZE,
    itemCount: 3,
  },
};

// ===== alignX =====

export const AlignXLeft: Story = {
  args: { alignX: 'left', itemSizeX: ALIGN_ITEM_SIZE, itemCount: 3 },
};
export const AlignXCenter: Story = {
  args: { alignX: 'center', itemSizeX: ALIGN_ITEM_SIZE, itemCount: 3 },
};
export const AlignXRight: Story = {
  args: { alignX: 'right', itemSizeX: ALIGN_ITEM_SIZE, itemCount: 3 },
};

// ===== alignY =====

export const AlignYTop: Story = {
  args: {
    alignY: 'top',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const AlignYMiddle: Story = {
  args: {
    alignY: 'middle',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const AlignYBottom: Story = {
  args: {
    alignY: 'bottom',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};

// ===== gap =====

export const GapX: Story = {
  args: { gapX: GAP_SIZE, itemSizeX: ALIGN_ITEM_SIZE, itemCount: 3 },
};
export const GapY: Story = {
  args: {
    direction: 'y',
    gapY: GAP_SIZE,
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};

// ===== itemRatio =====

export const ChildRatio: Story = {
  args: {
    itemSizeX: ALIGN_ITEM_SIZE,
    itemRatioX: 1,
    itemRatioY: 1,
    itemCount: 3,
  },
};
