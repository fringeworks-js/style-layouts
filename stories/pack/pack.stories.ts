import type { Meta, StoryObj } from '../_internal/adapter';
import createRenderer from '../_internal/createRenderer';
import { ARG_TYPES, ARGS } from '../_shared/constants';
import type { StoryArgs } from '../_shared/types';

const meta = {
  title: 'pack',
  render: createRenderer('pack'),
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  argTypes: ARG_TYPES.pack,
  args: { sizeType: 'static', posType: 'static' },
};

export const Standard: Story = {
  argTypes: ARG_TYPES.pack,
  args: { ...ARGS.pack },
};

export const IndividualSizes: Story = {
  argTypes: ARG_TYPES.pack,
  args: {
    ...ARGS.pack,
    sizeType: 'static',
  },
};
