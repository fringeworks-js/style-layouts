import type { Meta, StoryObj } from '../_internal/adapter';
import createTestRenderer from '../_internal/createTestRenderer';
import type { TestStoryArgs } from '../_shared/types';

const meta = {
  title: 'spec/balance',
  render: createTestRenderer('balance'),
} satisfies Meta<TestStoryArgs>;

export default meta;
type Story = StoryObj<TestStoryArgs>;

const ITEM_SIZE = '200px';
const ALIGN_ITEM_SIZE = '100px';
const GAP_SIZE = 20;

// ===== direction:x / adjustX =====

export const DirectionXAdjustXNone: Story = {
  args: {
    direction: 'x',
    adjustX: 'none',
    itemSizeX: ITEM_SIZE,
    itemCount: 3,
  },
};
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

// ===== direction:y / adjustY =====

export const DirectionYAdjustYNone: Story = {
  args: {
    direction: 'y',
    adjustY: 'none',
    itemSizeY: ITEM_SIZE,
    itemCount: 3,
  },
};
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

// ===== direction:x / alignY（交差軸・個別アイテムの縦位置） =====

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

// ===== direction:y / alignX（交差軸・個別アイテムの横位置） =====

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

// ===== gap =====

// itemSizeあり: gapが無視され、子要素サイズが維持されつつ余白が均等配分される
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

// itemSizeなし: gapが実際の余白として維持される
export const DirectionXGapXWithoutSize: Story = {
  args: { direction: 'x', gapX: GAP_SIZE, itemCount: 3 },
};
export const DirectionYGapYWithoutSize: Story = {
  args: { direction: 'y', gapY: GAP_SIZE, itemCount: 3 },
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
