import createTestModel from '../_shared/createTestModel';
import type { LayoutName, TestStoryArgs } from '../_shared/types';
import assignStyle from './assignStyle';
import LAYOUTS from './layouts';

export default function createTestRenderer(name: LayoutName) {
  const layout = LAYOUTS[name];
  return (args: TestStoryArgs) => {
    const { options, containerStyle, items } = createTestModel(args);
    const { className, style } = layout(options);

    const container = document.createElement('div');
    if (className) container.className = className;
    assignStyle(container, { ...containerStyle, ...style });

    for (const { label, style } of items) {
      const child = document.createElement('div');
      child.textContent = label;
      assignStyle(child, style);
      container.appendChild(child);
    }

    return container;
  };
}
