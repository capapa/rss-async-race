import { createHtmlElement } from "src/helpers";
import Pagination from "src/components/pagination/Pagination";

export default class {
  private tableWinners: HTMLElement;
  private title: HTMLElement;
  private titlePage: HTMLElement;
  private pagination: Pagination;

  constructor() {
    const wrapper = createHtmlElement(document.body, "section", "winners");

    this.title = createHtmlElement(wrapper, "h2", "", "Winners (10)");
    this.titlePage = createHtmlElement(wrapper, "h4", "", "Page #1");
    this.tableWinners = createHtmlElement(wrapper, "div", "table-winners");

    this.pagination = new Pagination(wrapper);
    // const pagination = createHtmlElement(wrapper, "div", "pagination");

    // const prev = createHtmlElement(pagination, "button", "btn", "Prev");
    // prev.classList.add("btn-pagination");

    // const next = createHtmlElement(pagination, "button", "btn", "Next");
    // next.classList.add("btn-pagination");
  }

  setParams({ num, page }: { num: number; page: number }) {
    this.title.textContent = `Winners (${num})`;
    this.titlePage.textContent = `Page #${page}`;
  }

  public addRowHeader() {
    ["#", "car", "name", "wins", "best time (seconds)"].forEach((name) => {
      const itme = createHtmlElement(this.tableWinners, "div", "table-winners-header", name);

      if (name === "wins") {
      }

      if (name === "time") {
      }
    });
  }

  public addRow(row: []) {}
}
