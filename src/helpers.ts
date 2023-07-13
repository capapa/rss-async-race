export function createElement<T>(
  parent: HTMLElement | null,
  tagName: string,
  className: string = "",
  textContent: string = ""
): T {
  const node = document.createElement(tagName) as HTMLElement;
  if (className) node.classList.add(className);
  if (textContent) node.textContent = textContent;
  if (parent) parent.append(node);
  return node as T;
}

export function createHtmlElement(
  parent: HTMLElement | null,
  tagName: string,
  className: string = "",
  textContent: string = ""
): HTMLElement {
  return createElement<HTMLElement>(parent, tagName, className, textContent);
}
