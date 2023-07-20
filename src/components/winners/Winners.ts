import { createHtmlElement } from "src/helpers";
import { Order, SortWinners } from "src/enum";
import { IWinner } from "src/interfeces";
import ApiWinners from "src/components/api/Winners";
import Pagination from "src/components/pagination/Pagination";

export default class {
  private tableWinners: HTMLElement;
  private title: HTMLElement;
  private titlePage: HTMLElement;
  private sort: SortWinners;
  private order: Order;

  private api: ApiWinners;
  private paginator: Pagination;

  constructor() {
    this.sort = SortWinners.Id;
    this.order = Order.Asc;

    const wrapper = createHtmlElement(document.body, "section", "winners");

    this.title = createHtmlElement(wrapper, "h2", "", "Winners (10)");
    this.titlePage = createHtmlElement(wrapper, "h4", "", "Page #1");
    this.tableWinners = createHtmlElement(wrapper, "div", "table-winners");

    this.paginator = new Pagination(wrapper, this.showTable.bind(this));
    this.api = new ApiWinners();
  }

  init() {
    this.showTable();
  }

  async showTable(): Promise<void> {
    const winnersPromise = await this.api.getWinners(
      this.paginator.numPage,
      this.paginator.limitPage,
      this.sort,
      this.order
    );
    if (this.paginator.countElements !== winnersPromise.count) {
      this.paginator.setParam(winnersPromise.count);
      this.setTitle();
    }
    this.renderWinners(winnersPromise.winners);
  }

  public renderWinners(winners: IWinner[]) {
    this.setNumPage();
    this.tableWinners.innerHTML = "";
    this.addRowHeader();
    winners.forEach((winner: IWinner) => this.addRow(winner));
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

  public addRow(winner: IWinner) {
    const itme = createHtmlElement(this.tableWinners, "div", "", "");
  }

  setTitle(): void {
    this.title.textContent = `Winners (${this.paginator.countElements})`;
  }

  setNumPage(): void {
    this.titlePage.textContent = `Page #(${this.paginator.numPage})`;
  }
}
