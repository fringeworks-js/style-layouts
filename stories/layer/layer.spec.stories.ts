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

// ===== adjust（itemSizeなし・子要素の中身が親より大きい） =====

const CONTENT_SIZE = { width: '300px', height: '300px' };

export const AdjustXShrinkContent: Story = {
  args: {
    adjustX: 'shrink',
    itemCount: 1,
    childContentSize: CONTENT_SIZE,
  },
};
export const AdjustXFitContent: Story = {
  args: {
    adjustX: 'fit',
    itemCount: 1,
    childContentSize: CONTENT_SIZE,
  },
};
export const AdjustYShrinkContent: Story = {
  args: {
    adjustY: 'shrink',
    itemCount: 1,
    childContentSize: CONTENT_SIZE,
  },
};
export const AdjustYFitContent: Story = {
  args: {
    adjustY: 'fit',
    itemCount: 1,
    childContentSize: CONTENT_SIZE,
  },
};

// ===== layerItem =====

export const EquivalentAContainer: Story = {
  args: {
    ...{},
    ...{
      alignX: 'center',
      alignY: 'bottom',
      adjustX: 'shrink',
      itemSizeX: 1000,
      itemSizeY: 100,
    },
    itemCount: 2,
  },
};
export const EquivalentAItem: Story = {
  args: {
    ...{},
    itemCount: 2,
    childItems: Array.from({ length: 2 }, () => ({
      alignX: 'center',
      alignY: 'bottom',
      adjustX: 'shrink',
      sizeX: 1000,
      sizeY: 100,
    })),
  },
};
export const EquivalentBContainer: Story = {
  args: {
    ...{},
    ...{ adjustX: 'grow', itemSizeX: 100, adjustY: 'fit' },
    itemCount: 2,
  },
};
export const EquivalentBItem: Story = {
  args: {
    ...{},
    itemCount: 2,
    childItems: Array.from({ length: 2 }, () => ({
      adjustX: 'grow',
      sizeX: 100,
      adjustY: 'fit',
    })),
  },
};
export const EquivalentRatioContainer: Story = {
  args: {
    ...{},
    ...{ itemSizeX: 100, itemRatioX: 1, itemRatioY: 2 },
    itemCount: 2,
  },
};
export const EquivalentRatioItem: Story = {
  args: {
    ...{},
    itemCount: 2,
    childItems: Array.from({ length: 2 }, () => ({
      sizeX: 100,
      ratioX: 1,
      ratioY: 2,
    })),
  },
};

// アイテムの指定でコンテナの指定を上書きする
export const ItemOverride: Story = {
  args: {
    alignX: 'left',
    itemSizeX: 100,
    itemSizeY: 100,
    itemCount: 3,
    childItems: [null, { alignX: 'right' }, { adjustX: 'grow' }],
  },
};

// limitToItems: layerItemを適用した子要素だけが対象
export const LimitToItems: Story = {
  args: {
    limitToItems: true,
    itemSizeX: 100,
    itemSizeY: 100,
    itemCount: 2,
    childItems: [{}, null],
  },
};

// ===== 重なり順 =====

// 先の子要素をoffsetZで手前にする
export const OffsetZ: Story = {
  args: {
    itemSizeX: 100,
    itemSizeY: 100,
    itemOffsetZ: 1,
    itemCount: 2,
    childItems: [{ offsetZ: 2 }, null],
  },
};
