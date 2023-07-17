import { createHtmlElement } from "src/helpers";
import Pagination from "src/components/pagination/Pagination.html";

export default class {
  constructor(parent: HTMLElement) {
    const wrapper = createHtmlElement(parent, "div", "pagination");
    wrapper.innerHTML = Pagination;
  }
}
