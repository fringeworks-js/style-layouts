import type { Meta, StoryObj } from '../_internal/adapter';
import createTestRenderer from '../_internal/createTestRenderer';
import type { TestStoryArgs } from '../_shared/types';

const meta = {
  title: 'spec/flow',
  render: createTestRenderer('flow'),
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

// ===== direction:x / 交差軸(itemSizeYのみ) =====

export const DirectionXCrossAxisWithSize: Story = {
  args: { direction: 'x', itemSizeY: ITEM_SIZE, itemCount: 3 },
};
export const DirectionXCrossAxisWithoutSize: Story = {
  args: { direction: 'x', itemCount: 3 },
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

// ===== direction:y / 交差軸(itemSizeXのみ) =====

export const DirectionYCrossAxisWithSize: Story = {
  args: { direction: 'y', itemSizeX: ITEM_SIZE, itemCount: 3 },
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
