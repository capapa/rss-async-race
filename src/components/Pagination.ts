import { createHtmlElement } from "src/helpers";
import { CallBack } from "src/types";

export default class {
  private btnNext: HTMLButtonElement;
  private btnPrev: HTMLButtonElement;

  public numPage: number;
  public limitPage: number;
  public countPages: number;
  public countElements: number;
  public cbRenderPage: CallBack;

  constructor(parent: HTMLElement, cbRenderPage: CallBack, limitPage: number = 10) {
    this.numPage = 1;
    this.limitPage = limitPage;
    this.countPages = 1;
    this.countElements = 0;
    this.cbRenderPage = cbRenderPage;

    const wrapper = createHtmlElement(parent, "div", "pagination");
    this.btnPrev = createHtmlElement(wrapper, "button", "btn", "Prev") as HTMLButtonElement;
    this.btnNext = createHtmlElement(wrapper, "button", "btn", "Next") as HTMLButtonElement;
  }

  public init(): void {
    this.btnPrev.classList.add("btn-pagination");
    this.btnNext.classList.add("btn-pagination");

    this.btnNext.onclick = (): void => this.nextPage();
    this.btnPrev.onclick = (): void => this.prevPage();
  }

  public get enabledNext(): boolean {
    return !this.btnNext.disabled;
  }

  public set enabledNext(value: boolean) {
    this.btnNext.disabled = !value;
  }

  public get enabledPrev(): boolean {
    return !this.btnPrev.disabled;
  }

  public set enabledPrev(value: boolean) {
    this.btnPrev.disabled = !value;
  }

  public setParam(countElements: number): void {
    if (this.countElements !== countElements) {
      this.countElements = countElements;
      this.countPages = Math.ceil(this.countElements / this.limitPage);
    }

    this.enabledPrev = this.numPage !== 1;
    this.enabledNext = this.numPage < this.countPages;
  }

  public nextPage(): void {
    if (this.numPage >= this.countPages) return;

    if (this.countPages > 1 && this.numPage === 1) {
      this.enabledPrev = true;
    }

    this.numPage += 1;

    if (this.numPage >= this.countPages) {
      this.enabledNext = false;
    }

    this.cbRenderPage();
  }

  public prevPage(): void {
    if (this.numPage <= 1) return;

    if (this.countPages > 1 && this.numPage === this.countPages) {
      this.enabledNext = true;
    }

    this.numPage -= 1;

    if (this.numPage <= 1) {
      this.enabledPrev = false;
    }

    this.cbRenderPage();
  }
}
