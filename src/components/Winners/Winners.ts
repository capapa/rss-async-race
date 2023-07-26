import { createHtmlElement } from "src/utils/helpers";
import { Order, SortWinners } from "src/constants/enum";
import { ICar, IWinner } from "src/src/constants/interfeces";
import ApiGarage from "src/components/api/Garage";
import ApiWinners from "src/components/api/Winners";
import Pagination from "src/components/Pagination/Pagination";
import svgCarStr from "src/components/garage/track/car.svg";

export default class Winners {
  public wrapper: HTMLElement;
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

    this.wrapper = createHtmlElement(document.body, "section", "winners");

    this.title = createHtmlElement(this.wrapper, "h2", "", "Winners (10)");
    this.titlePage = createHtmlElement(this.wrapper, "h4", "", "Page #1");
    this.tableWinners = createHtmlElement(this.wrapper, "div", "table-winners");
    this.svgCar = document.createElement("svg");

    this.paginator = new Pagination(this.wrapper, this.showTable.bind(this));
    this.api = new ApiWinners();
    this.apiGarage = new ApiGarage();
  }

  public init(): void {
    this.svgCar.innerHTML = svgCarStr;
    this.svgCar = this.svgCar.children.item(0) as SVGElement;
    this.paginator.init();
    this.wrapper.style.display = "none";
  }

  public async showTable(): Promise<void> {
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

  private async renderWinners(winners: IWinner[]): Promise<void> {
    this.setNumPage();
    this.tableWinners.innerHTML = "";
    this.addRowHeader();
    const cars = await Promise.all(winners.map(({ id }) => this.apiGarage.getCar(id)));
    winners.forEach((winner: IWinner, i) => this.addRow(i + 1, winner, cars[i]));
  }

  private addRowHeader(): void {
    ["number", "Car", "Name", "Wins", "Best time (seconds)"].forEach((name) => {
      const item = createHtmlElement(this.tableWinners, "div", "table-winners-header");

      if (["Wins", "Best time (seconds)"].includes(name)) {
        const anchor = createHtmlElement(this.tableWinners, "a", "table-winners-order", name) as HTMLAnchorElement;
        item.append(anchor);

        anchor.href = "#";
        anchor.dataset.name = name;
        if (name.includes("time")) anchor.dataset.name = "time";

        anchor.onclick = (e: Event): void => {
          e.preventDefault();

          const nameCol = ((e.target as HTMLElement).dataset.name as string).toLowerCase();
          if (this.sort === nameCol) {
            this.order = this.order === Order.Asc ? Order.Desc : Order.Asc;
          } else {
            this.sort = nameCol as SortWinners;
          }

          this.showTable();
        };
      } else {
        item.textContent = name;
      }
    });
  }

  private addRow(i: number, winner: IWinner, car: ICar): void {
    const img = this.svgCar.cloneNode(true) as HTMLElement;
    img.style.fill = car.color;
    img.style.height = "40px";

    createHtmlElement(this.tableWinners, "div", "", String(i));
    const divImg = createHtmlElement(this.tableWinners, "div");
    createHtmlElement(this.tableWinners, "div", "", car.name);
    createHtmlElement(this.tableWinners, "div", "", String(winner.wins));
    createHtmlElement(this.tableWinners, "div", "", String(winner.time.toFixed(3)));

    divImg.append(img);
  }

  private setTitle(): void {
    this.title.textContent = `Winners (${this.paginator.countElements})`;
  }

  private setNumPage(): void {
    this.titlePage.textContent = `Page #(${this.paginator.numPage})`;
  }
}
