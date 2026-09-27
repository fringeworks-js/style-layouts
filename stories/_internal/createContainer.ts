import type { CreateLayoutStyle } from '../../src/types';
import type { ContainerModel } from '../_shared/createContainerModel';
import assignStyle from './assignStyle';
import createResizableElement from './createResizableElement';

export default function createContainer(
  layout: CreateLayoutStyle<any>,
  model: ContainerModel,
) {
  const { options, resizable, containerStyle, items } = model;
  const { className, style } = layout(options);

  const container = document.createElement('div');
  if (className) {
    container.className = className;
  }
  assignStyle(container, { ...containerStyle, ...style });
  items.forEach(({ label, style }) => {
    const child = document.createElement('div');
    child.innerText = label;
    assignStyle(child, style);
    container.appendChild(child);
  });

  const { wrapper } = createResizableElement({
    element: container,
    initialWidth: resizable.initialWidth,
    initialHeight: resizable.initialHeight,
  });
  assignStyle(wrapper, resizable.style);
  return wrapper;
}
