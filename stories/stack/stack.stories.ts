import type { Meta, StoryObj } from '../_internal/adapter';
import createRenderer from '../_internal/createRenderer';
import { ARG_TYPES, ARGS } from '../_shared/constants';
import type { StoryArgs } from '../_shared/types';

const meta = {
  title: 'stack',
  render: createRenderer('stack'),
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  argTypes: ARG_TYPES.stack,
  args: { sizeType: 'static', posType: 'static' },
};

export const Standard: Story = {
  argTypes: ARG_TYPES.stack,
  args: { ...ARGS.stack },
};

export const IndividualSizes: Story = {
  argTypes: ARG_TYPES.stack,
  args: {
    ...ARGS.stack,
    sizeType: 'static',
    itemSizeX: undefined,
    itemSizeY: undefined,
  },
};
