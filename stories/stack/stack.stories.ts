import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { StackLayoutOptions } from '../../src/with-css/stack';
import stack from '../../src/with-css/stack';
import { ARG_TYPES, ARGS } from '../_internal/constants';
import createRenderer from '../_internal/createRenderer';
import type { DebugOptions } from '../_internal/types';

type LayoutOptions = StackLayoutOptions & DebugOptions;

const meta = {
  title: 'stack',
  render: createRenderer(stack),
} satisfies Meta<LayoutOptions>;

export default meta;
type Story = StoryObj<LayoutOptions>;

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
