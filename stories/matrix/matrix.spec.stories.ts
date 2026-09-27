import type { Meta, StoryObj } from '../_internal/adapter';
import createTestRenderer from '../_internal/createTestRenderer';
import type { TestStoryArgs } from '../_shared/types';

const meta = {
  title: 'spec/matrix',
  render: createTestRenderer('matrix'),
} satisfies Meta<TestStoryArgs>;

export default meta;
type Story = StoryObj<TestStoryArgs>;

const ITEM_SIZE = '200px';
const ALIGN_ITEM_SIZE = '100px';
const GAP = '10px';

// ===== adjustX =====

export const AdjustXGrowWithCountAndSize: Story = {
  args: {
    itemCountX: 3,
    itemCountY: 1,
    itemSizeX: ITEM_SIZE,
    adjustX: 'grow',
    itemCount: 3,
  },
};
export const AdjustXShrinkWithCountAndSize: Story = {
  args: {
    itemCountX: 3,
    itemCountY: 1,
    itemSizeX: ITEM_SIZE,
    adjustX: 'shrink',
    itemCount: 3,
  },
};
export const AdjustXFitWithCountAndSize: Story = {
  args: {
    itemCountX: 3,
    itemCountY: 1,
    itemSizeX: ITEM_SIZE,
    adjustX: 'fit',
    itemCount: 3,
  },
};
export const AdjustXNoneWithCountAndSize: Story = {
  args: {
    itemCountX: 3,
    itemCountY: 1,
    itemSizeX: ITEM_SIZE,
    adjustX: 'none',
    itemCount: 3,
  },
};

// ===== adjustY =====

export const AdjustYGrowWithCountAndSize: Story = {
  args: {
    itemCountX: 1,
    itemCountY: 3,
    itemSizeY: ITEM_SIZE,
    adjustY: 'grow',
    itemCount: 3,
  },
};
export const AdjustYShrinkWithCountAndSize: Story = {
  args: {
    itemCountX: 1,
    itemCountY: 3,
    itemSizeY: ITEM_SIZE,
    adjustY: 'shrink',
    itemCount: 3,
  },
};
export const AdjustYFitWithCountAndSize: Story = {
  args: {
    itemCountX: 1,
    itemCountY: 3,
    itemSizeY: ITEM_SIZE,
    adjustY: 'fit',
    itemCount: 3,
  },
};
export const AdjustYNoneWithCountAndSize: Story = {
  args: {
    itemCountX: 1,
    itemCountY: 3,
    itemSizeY: ITEM_SIZE,
    adjustY: 'none',
    itemCount: 3,
  },
};

// ===== gap + adjustX =====

export const AdjustXGrowWithCountAndSizeAndGap: Story = {
  args: {
    itemCountX: 3,
    itemCountY: 1,
    itemSizeX: ITEM_SIZE,
    adjustX: 'grow',
    gap: GAP,
    itemCount: 3,
  },
};
export const AdjustXShrinkWithCountAndSizeAndGap: Story = {
  args: {
    itemCountX: 3,
    itemCountY: 1,
    itemSizeX: ITEM_SIZE,
    adjustX: 'shrink',
    gap: GAP,
    itemCount: 3,
  },
};
export const AdjustXFitWithCountAndSizeAndGap: Story = {
  args: {
    itemCountX: 3,
    itemCountY: 1,
    itemSizeX: ITEM_SIZE,
    adjustX: 'fit',
    gap: GAP,
    itemCount: 3,
  },
};

// ===== gap + adjustY =====

export const AdjustYGrowWithCountAndSizeAndGap: Story = {
  args: {
    itemCountX: 1,
    itemCountY: 3,
    itemSizeY: ITEM_SIZE,
    adjustY: 'grow',
    gap: GAP,
    itemCount: 3,
  },
};
export const AdjustYShrinkWithCountAndSizeAndGap: Story = {
  args: {
    itemCountX: 1,
    itemCountY: 3,
    itemSizeY: ITEM_SIZE,
    adjustY: 'shrink',
    gap: GAP,
    itemCount: 3,
  },
};
export const AdjustYFitWithCountAndSizeAndGap: Story = {
  args: {
    itemCountX: 1,
    itemCountY: 3,
    itemSizeY: ITEM_SIZE,
    adjustY: 'fit',
    gap: GAP,
    itemCount: 3,
  },
};

// ===== alignX =====

export const AlignXLeft: Story = {
  args: {
    itemCountX: 3,
    itemCountY: 1,
    alignX: 'left',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const AlignXCenter: Story = {
  args: {
    itemCountX: 3,
    itemCountY: 1,
    alignX: 'center',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const AlignXRight: Story = {
  args: {
    itemCountX: 3,
    itemCountY: 1,
    alignX: 'right',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};

// ===== alignY =====

export const AlignYTop: Story = {
  args: {
    itemCountX: 3,
    itemCountY: 1,
    alignY: 'top',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const AlignYMiddle: Story = {
  args: {
    itemCountX: 3,
    itemCountY: 1,
    alignY: 'middle',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};
export const AlignYBottom: Story = {
  args: {
    itemCountX: 3,
    itemCountY: 1,
    alignY: 'bottom',
    itemSizeX: ALIGN_ITEM_SIZE,
    itemSizeY: ALIGN_ITEM_SIZE,
    itemCount: 3,
  },
};

// ===== itemRatio =====

export const ChildRatio: Story = {
  args: {
    itemCountX: 3,
    itemCountY: 1,
    itemSizeX: ALIGN_ITEM_SIZE,
    itemRatioX: 1,
    itemRatioY: 1,
    itemCount: 3,
  },
};
