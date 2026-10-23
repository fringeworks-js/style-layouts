import type { Meta, StoryObj } from '../_internal/adapter';
import createTestRenderer from '../_internal/createTestRenderer';
import type { TestStoryArgs } from '../_shared/types';

const meta = {
  title: 'spec/pin',
  render: createTestRenderer('pin'),
} satisfies Meta<TestStoryArgs>;

export default meta;
type Story = StoryObj<TestStoryArgs>;

export const Default: Story = {
  args: {
    itemCount: 3,
    childPositions: [
      { left: '0px', top: '0px' },
      { left: '100px', top: '50px' },
      { left: '200px', top: '100px' },
    ],
  },
};

export const WithItemSize: Story = {
  args: {
    itemSizeX: '100px',
    itemSizeY: '80px',
    itemCount: 3,
    childPositions: [
      { left: '0px', top: '0px' },
      { left: '150px', top: '100px' },
      { left: '300px', top: '200px' },
    ],
  },
};

export const WithChildRatio: Story = {
  args: {
    itemSizeX: '100px',
    itemRatioX: 1,
    itemRatioY: 1,
    itemCount: 3,
    childPositions: [
      { left: '0px', top: '0px' },
      { left: '150px', top: '0px' },
      { left: '300px', top: '0px' },
    ],
  },
};

// ===== pinItem =====

export const EquivalentSizeContainer: Story = {
  args: { ...{}, ...{ itemSizeX: 100, itemSizeY: 80 }, itemCount: 2 },
};
export const EquivalentSizeItem: Story = {
  args: {
    ...{},
    itemCount: 2,
    childItems: Array.from({ length: 2 }, () => ({ sizeX: 100, sizeY: 80 })),
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
    itemSizeX: 100,
    itemSizeY: 80,
    itemCount: 2,
    childItems: [null, { sizeX: 50 }],
  },
};

// limitToItems: pinItemを適用した子要素だけが対象
export const LimitToItems: Story = {
  args: {
    limitToItems: true,
    itemSizeX: 100,
    itemSizeY: 80,
    itemCount: 2,
    childItems: [{}, null],
  },
};

// ===== オフセット =====

// 子要素のtop / leftを指定しない（オフセットで配置する）
const NO_POSITIONS = [
  { left: '', top: '' },
  { left: '', top: '' },
];

export const OffsetEquivalentContainer: Story = {
  args: {
    alignX: 'right',
    alignY: 'bottom',
    itemOffsetX: 20,
    itemOffsetY: '10%',
    itemSizeX: 100,
    itemSizeY: 80,
    itemCount: 2,
    childPositions: NO_POSITIONS,
  },
};
export const OffsetEquivalentItem: Story = {
  args: {
    itemSizeX: 100,
    itemSizeY: 80,
    itemCount: 2,
    childPositions: NO_POSITIONS,
    childItems: [
      { alignX: 'right', alignY: 'bottom', offsetX: 20, offsetY: '10%' },
      { alignX: 'right', alignY: 'bottom', offsetX: 20, offsetY: '10%' },
    ],
  },
};

// アイテムのオフセットでコンテナの指定を上書きする
export const OffsetOverride: Story = {
  args: {
    itemOffsetX: 10,
    itemOffsetY: 10,
    itemSizeX: 100,
    itemSizeY: 80,
    itemCount: 2,
    childPositions: NO_POSITIONS,
    childItems: [null, { alignX: 'right', offsetX: 30 }],
  },
};

// 重なり順: 先の子要素をoffsetZで手前にする
export const OffsetZ: Story = {
  args: {
    itemOffsetX: 0,
    itemOffsetY: 0,
    itemOffsetZ: 1,
    itemSizeX: 100,
    itemSizeY: 80,
    itemCount: 2,
    childPositions: NO_POSITIONS,
    childItems: [{ offsetZ: 2 }, null],
  },
};
