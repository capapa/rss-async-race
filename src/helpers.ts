import { MODEL_CAR, NAMES_CAR } from "./const";

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

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getRandomName() {
  const name = NAMES_CAR[Math.floor(Math.random() * NAMES_CAR.length)];
  const model = MODEL_CAR[Math.floor(Math.random() * MODEL_CAR.length)];
  return `${name} ${model}`;
}
