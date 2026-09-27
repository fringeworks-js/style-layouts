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
