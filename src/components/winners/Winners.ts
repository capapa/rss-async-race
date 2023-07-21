import { createHtmlElement } from "src/helpers";
import { Order, SortWinners } from "src/enum";
import { ICar, IWinner } from "src/interfeces";
import ApiWinners from "src/components/api/Winners";
import ApiGarage from "src/components/api/Garage";
import Pagination from "src/components/pagination/Pagination";
import svgCarStr from "src/components/garage/track/car.svg";

export default class {
  private tableWinners: HTMLElement;
  private title: HTMLElement;
  private titlePage: HTMLElement;
  private svgCar: Element;

  private sort: SortWinners;
  private order: Order;

  private api: ApiWinners;
  private apiGarage: ApiGarage;
  private paginator: Pagination;

  constructor() {
    this.sort = SortWinners.Id;
    this.order = Order.Asc;

    const wrapper = createHtmlElement(document.body, "section", "winners");

    this.title = createHtmlElement(wrapper, "h2", "", "Winners (10)");
    this.titlePage = createHtmlElement(wrapper, "h4", "", "Page #1");
    this.tableWinners = createHtmlElement(wrapper, "div", "table-winners");
    this.svgCar = document.createElement("svg");

    this.paginator = new Pagination(wrapper, this.showTable.bind(this));
    this.api = new ApiWinners();
    this.apiGarage = new ApiGarage();
  }

  init() {
    this.svgCar.innerHTML = svgCarStr;
    this.svgCar = this.svgCar.children[0];
    this.paginator.init();

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

  async renderWinners(winners: IWinner[]) {
    this.setNumPage();
    this.tableWinners.innerHTML = "";
    this.addRowHeader();
    const cars = await Promise.all(winners.map(({ id }) => this.apiGarage.getCar(id)));
    winners.forEach((winner: IWinner, i) => this.addRow(winner, cars[i]));
  }

  addRowHeader() {
    ["Id", "Car", "Name", "Wins", "Best time (seconds)"].forEach((name) => {
      const item = createHtmlElement(this.tableWinners, "div", "table-winners-header");

      if (["Id", "Wins", "Best time (seconds)"].includes(name)) {
        const anchor = createHtmlElement(this.tableWinners, "a", "table-winners-order", name) as HTMLAnchorElement;
        item.append(anchor);

        anchor.href = "#";
        anchor.dataset.name = name;
        if (name.includes("time")) anchor.dataset.name = "time";

        anchor.onclick = (e: Event) => {
          e.preventDefault();

          const name = ((e.target as HTMLElement).dataset.name as string).toLowerCase();
          if (this.sort === name) {
            this.order = this.order === Order.Asc ? Order.Desc : Order.Asc;
          } else {
            this.sort = name as SortWinners;
          }

          this.showTable();
        };
      } else {
        item.textContent = name;
      }
    });
  }

  addRow(winner: IWinner, car: ICar) {
    const img = this.svgCar.cloneNode(true) as HTMLElement;
    img.style.fill = car.color;

    createHtmlElement(this.tableWinners, "div", "", winner.id.toString());
    const divImg = createHtmlElement(this.tableWinners, "div");
    createHtmlElement(this.tableWinners, "div", "", car.name);
    createHtmlElement(this.tableWinners, "div", "", winner.wins.toString());
    createHtmlElement(this.tableWinners, "div", "", winner.time.toString());

    divImg.append(img);
  }

  setTitle(): void {
    this.title.textContent = `Winners (${this.paginator.countElements})`;
  }

  setNumPage(): void {
    this.titlePage.textContent = `Page #(${this.paginator.numPage})`;
  }
}
