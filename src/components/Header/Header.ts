import { createHtmlElement } from "src/utils/helpers";

export default class Header {
  public btnGarage: HTMLElement;
  public btnWinners: HTMLElement;

  constructor() {
    const header = createHtmlElement(document.body, "header");
    this.btnGarage = createHtmlElement(header, "button", "btn", "garage");
    this.btnWinners = createHtmlElement(header, "button", "btn", "winners");
  }

  public init(): void {
    this.btnGarage.classList.add("btn-header");
    this.btnWinners.classList.add("btn-header");
  }
}
