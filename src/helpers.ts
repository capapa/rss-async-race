import { MODEL_CAR, NAMES_CAR } from "./const";

export function createElement<T>(
  parent: HTMLElement | null,
  tagName: string,
  className: string = "",
  textContent: string = ""
): T {
  const node = document.createElement(tagName);
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

export function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getRandomName(): string {
  const name = NAMES_CAR[Math.floor(Math.random() * NAMES_CAR.length)];
  const model = MODEL_CAR[Math.floor(Math.random() * MODEL_CAR.length)];
  return `${name} ${model}`;
}
