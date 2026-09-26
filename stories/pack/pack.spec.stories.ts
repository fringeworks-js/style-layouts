import type { Meta, StoryObj } from '@storybook/web-components-vite';
import pack from '../../src/with-css/pack';
import createTestRenderer from '../_internal/createTestRenderer';

const meta = {
  title: 'spec/pack',
  render: createTestRenderer(pack),
} satisfies Meta;

export default meta;
type Story = StoryObj;

const GAP_SIZE = 20;

export const DirectionX: Story = {
  args: { direction: 'x', itemCount: 3 },
};

export const DirectionY: Story = {
  args: { direction: 'y', itemCount: 3 },
};

export const DirectionXGapX: Story = {
  args: { direction: 'x', gapX: GAP_SIZE, itemCount: 3 },
};

export const DirectionYGapY: Story = {
  args: { direction: 'y', gapY: GAP_SIZE, itemCount: 3 },
};
