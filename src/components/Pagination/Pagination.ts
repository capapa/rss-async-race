import { createHtmlElement } from "src/utils/helpers";
import { CallBack } from "src/constants/types";

export default class Pagination {
  private btnNext: HTMLButtonElement;
  private btnPrev: HTMLButtonElement;
  private disabledButtons: boolean;

  public numPage: number;
  public limitPage: number;
  public countPages: number;
  public countElements: number;
  public cbRenderPage: CallBack;

  constructor(parent: HTMLElement, cbRenderPage: CallBack, limitPage: number = 10) {
    this.disabledButtons = false;
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

  private updateEnabled(): void {
    if (this.disabled) {
      this.btnNext.disabled = true;
      this.btnPrev.disabled = true;
    } else {
      this.btnNext.disabled = this.numPage === this.countPages;
      this.btnPrev.disabled = this.numPage === 1;
    }
  }

  public get disabled(): boolean {
    return this.disabledButtons;
  }

  public set disabled(value: boolean) {
    this.disabledButtons = value;
    this.updateEnabled();
  }

  public setParam(countElements: number): void {
    if (this.countElements !== countElements) {
      this.countElements = countElements;
      this.countPages = Math.ceil(this.countElements / this.limitPage);
      this.updateEnabled();
    }
  }

  public nextPage(): void {
    if (this.numPage >= this.countPages) return;
    this.numPage += 1;

    this.updateEnabled();
    this.cbRenderPage();
  }

  public prevPage(): void {
    if (this.numPage <= 1) return;

    this.numPage -= 1;

    this.updateEnabled();
    this.cbRenderPage();
  }
}
