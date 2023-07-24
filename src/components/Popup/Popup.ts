import { createHtmlElement } from "src/utils/helpers";

export default class {
  private wrapper: HTMLElement;
  private span: HTMLElement;

  constructor(parent: HTMLElement) {
    this.wrapper = createHtmlElement(parent, "div", "popup");
    this.span = createHtmlElement(this.wrapper, "span", "popup__text");
  }

  public init(): void {
    this.hide();
  }

  public show(name: string, time: number): void {
    this.span.textContent = `The winner is ${name}: ${time.toFixed(3)} sec.`;
    if (!this.wrapper.classList.contains("hide")) return;
    this.wrapper.classList.remove("hide");
  }

  public hide(): void {
    if (this.wrapper.classList.contains("hide")) return;
    this.wrapper.classList.add("hide");
  }
}
