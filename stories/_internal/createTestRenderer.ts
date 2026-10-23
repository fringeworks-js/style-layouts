import createTestModel from '../_shared/createTestModel';
import type { LayoutName, TestStoryArgs } from '../_shared/types';
import assignStyle from './assignStyle';
import LAYOUTS, { LAYOUT_ITEMS } from './layouts';

export default function createTestRenderer(name: LayoutName) {
  const layout = LAYOUTS[name];
  return (args: TestStoryArgs) => {
    const { options, containerStyle, items } = createTestModel(args);
    const { className, style } = layout(options);

    const container = document.createElement('div');
    if (className) {
      container.className = className;
    }
    assignStyle(container, { ...containerStyle, ...style });

    const createItem = LAYOUT_ITEMS[name];
    for (const {
      label,
      style,
      contentStyle,
      layout: childLayout,
      itemOptions,
    } of items) {
      const child = document.createElement('div');
      child.textContent = label;
      const classNames: string[] = [];
      const childStyle = { ...style };
      if (childLayout) {
        // 入れ子のレイアウト
        const childResult = LAYOUTS[childLayout.name](
          childLayout.options ?? {},
        );
        classNames.push(childResult.className ?? '');
        Object.assign(childStyle, childResult.style);
      }
      if (itemOptions && createItem) {
        // アイテム
        const itemResult = createItem(itemOptions);
        classNames.push(itemResult.className ?? '');
        Object.assign(childStyle, itemResult.style);
      }
      const className = classNames.filter(Boolean).join(' ');
      if (className) {
        child.className = className;
      }
      assignStyle(child, childStyle);
      if (contentStyle) {
        const content = document.createElement('div');
        assignStyle(content, contentStyle);
        child.appendChild(content);
      }
      container.appendChild(child);
    }

    return container;
  };
}
