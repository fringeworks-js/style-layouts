import type { Meta, StoryObj } from '../_internal/adapter';
import createRenderer from '../_internal/createRenderer';
import { ARG_TYPES, ARGS } from '../_shared/constants';
import type { StoryArgs } from '../_shared/types';

const meta = {
  title: 'matrix',
  render: createRenderer('matrix'),
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  argTypes: ARG_TYPES.matrix,
  args: { sizeType: 'static', posType: 'static' },
};

export const Standard: Story = {
  argTypes: ARG_TYPES.matrix,
  args: { ...ARGS.matrix },
};

export const Tracks: Story = {
  argTypes: ARG_TYPES.matrix,
  args: {
    ...ARGS.matrix,
    itemCountX: undefined,
    itemCountY: undefined,
    itemSizeX: undefined,
    itemSizeY: undefined,
    tracksX: '[200, 50, "1fr", 100]',
    tracksY: '[50, 30, 100]',
  },
};

export const IndividualSizes: Story = {
  argTypes: ARG_TYPES.matrix,
  args: {
    ...ARGS.matrix,
    sizeType: 'static',
    itemSizeX: undefined,
    itemSizeY: undefined,
  },
};
