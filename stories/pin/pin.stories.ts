import type { Meta, StoryObj } from '../_internal/adapter';
import createRenderer from '../_internal/createRenderer';
import { ARG_TYPES, ARGS } from '../_shared/constants';
import type { StoryArgs } from '../_shared/types';

const meta = {
  title: 'pin',
  render: createRenderer('pin'),
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  argTypes: ARG_TYPES.pin,
  args: { sizeType: 'static', posType: 'static' },
};

export const Standard: Story = {
  argTypes: ARG_TYPES.pin,
  args: { ...ARGS.pin },
};

export const IndividualSizes: Story = {
  argTypes: ARG_TYPES.pin,
  args: {
    ...ARGS.pin,
    sizeType: 'static',
    itemSizeX: undefined,
    itemSizeY: undefined,
  },
};
