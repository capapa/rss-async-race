import { createHtmlElement } from "src/helpers";
import Pagination from "src/components/pagination/Pagination.html";
import { CallBack } from "src/types";

export default class {
  private btnNext: HTMLButtonElement;
  private btnPrev: HTMLButtonElement;

  public numPage: number;
  public limitPage: number;
  public countPages: number;
  public countElements: number;
  public cbRenderPage: CallBack;

  constructor(parent: HTMLElement, cbRenderPage: CallBack) {
    this.numPage = 1;
    this.limitPage = 10;
    this.countPages = 1;
    this.countElements = 0;
    this.cbRenderPage = cbRenderPage;

    const wrapper = createHtmlElement(parent, "div", "pagination");
    wrapper.innerHTML = Pagination;

    // const prev = createHtmlElement(pagination, "button", "btn", "Prev");
    // prev.classList.add("btn-pagination");

    // const next = createHtmlElement(pagination, "button", "btn", "Next");
    // next.classList.add("btn-pagination");

    this.btnPrev = wrapper.children[0] as HTMLButtonElement;
    this.btnNext = wrapper.children[1] as HTMLButtonElement;

    this.btnNext.onclick = () => this.nextPage();
    this.btnPrev.onclick = () => this.prevPage();
  }

  get enabledNext() {
    return !this.btnNext.disabled;
  }

  set enabledNext(value: boolean) {
    this.btnNext.disabled = !value;
  }

  get enabledPrev() {
    return !this.btnPrev.disabled;
  }

  set enabledPrev(value: boolean) {
    this.btnPrev.disabled = !value;
  }

  setParam(countElements: number): void {
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
