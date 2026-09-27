import type { Meta, StoryObj } from '../_internal/adapter';
import createTestRenderer from '../_internal/createTestRenderer';
import type { TestStoryArgs } from '../_shared/types';

const meta = {
  title: 'spec/layer',
  render: createTestRenderer('layer'),
} satisfies Meta<TestStoryArgs>;

export default meta;
type Story = StoryObj<TestStoryArgs>;

const ITEM_SIZE = '200px';
const ITEM_SIZE_SMALL = '100px';

// ===== 重ね合わせ確認 =====

export const Stacking: Story = {
  args: {
    itemSizeX: ITEM_SIZE_SMALL,
    itemSizeY: ITEM_SIZE_SMALL,
    itemCount: 3,
  },
};

// ===== alignX =====

export const AlignXLeft: Story = {
  args: {
    alignX: 'left',
    itemSizeX: ITEM_SIZE,
    itemSizeY: ITEM_SIZE_SMALL,
    itemCount: 1,
  },
};
export const AlignXCenter: Story = {
  args: {
    alignX: 'center',
    itemSizeX: ITEM_SIZE,
    itemSizeY: ITEM_SIZE_SMALL,
    itemCount: 1,
  },
};
export const AlignXRight: Story = {
  args: {
    alignX: 'right',
    itemSizeX: ITEM_SIZE,
    itemSizeY: ITEM_SIZE_SMALL,
    itemCount: 1,
  },
};

// ===== alignY =====

export const AlignYTop: Story = {
  args: {
    alignY: 'top',
    itemSizeX: ITEM_SIZE_SMALL,
    itemSizeY: ITEM_SIZE,
    itemCount: 1,
  },
};
export const AlignYMiddle: Story = {
  args: {
    alignY: 'middle',
    itemSizeX: ITEM_SIZE_SMALL,
    itemSizeY: ITEM_SIZE,
    itemCount: 1,
  },
};
export const AlignYBottom: Story = {
  args: {
    alignY: 'bottom',
    itemSizeX: ITEM_SIZE_SMALL,
    itemSizeY: ITEM_SIZE,
    itemCount: 1,
  },
};

// ===== adjustX =====

export const AdjustXGrow: Story = {
  args: { adjustX: 'grow', itemSizeX: ITEM_SIZE, itemCount: 1 },
};
export const AdjustXShrink: Story = {
  args: { adjustX: 'shrink', itemSizeX: ITEM_SIZE, itemCount: 1 },
};
export const AdjustXFit: Story = {
  args: { adjustX: 'fit', itemCount: 1 },
};

// ===== adjustY =====

export const AdjustYGrow: Story = {
  args: { adjustY: 'grow', itemSizeY: ITEM_SIZE, itemCount: 1 },
};
export const AdjustYShrink: Story = {
  args: { adjustY: 'shrink', itemSizeY: ITEM_SIZE, itemCount: 1 },
};
export const AdjustYFit: Story = {
  args: { adjustY: 'fit', itemCount: 1 },
};

// ===== itemRatio =====

export const ChildRatio: Story = {
  args: {
    itemSizeX: ITEM_SIZE_SMALL,
    itemRatioX: 1,
    itemRatioY: 1,
    itemCount: 1,
  },
};
