import { createHtmlElement } from "src/helpers";
import Pagination from "src/components/pagination/Pagination";
import Track from "src/components/garage/track/Track";
import { ICar } from "src/interfeces";
import ApiGarage from "src/components/api/Garage";

export default class {
  private api: ApiGarage;

  private title: HTMLElement;
  private titlePage: HTMLElement;
  private wrapperTrack: HTMLElement;

  private paginator: Pagination;

  constructor(garage: HTMLElement) {
    const wrapper = createHtmlElement(garage, "section", "race");

    this.title = createHtmlElement(wrapper, "h2", "", "Garage (100)");
    this.titlePage = createHtmlElement(wrapper, "h4", "", "Page #1");
    this.wrapperTrack = createHtmlElement(wrapper, "div", "tracks");

    // new Track(this.wrapperTrack, "TESLA", "#0FFAF0");
    // new Track(this.wrapperTrack, "LADA", "#FF00A0");

    this.paginator = new Pagination(wrapper, this.showRace.bind(this));

    this.api = new ApiGarage();
    this.showRace();
  }

  async showRace(): Promise<void> {
    const carsPromise = await this.api.getCars(this.paginator.numPage, this.paginator.limitPage);
    if (this.paginator.countElements !== carsPromise.count) {
      this.paginator.setParam(carsPromise.count);
      this.setTitle();
    }
    this.renderCars(carsPromise.cars);
  }

  renderCars(cars: ICar[]): void {
    this.titlePage.textContent = `Page #${this.paginator.numPage}`;
    this.wrapperTrack.innerHTML = "";
    cars.forEach((car: ICar) => this.renderCar(car));
  }

  renderCar(car: ICar): void {
    new Track(this.wrapperTrack, car.name, car.color);
  }

  setTitle(): void {
    this.title.textContent = `Garage (${this.paginator.countElements})`;
  }

  setNumPage(): void {
    this.titlePage.textContent = `Page #(${this.paginator.numPage})`;
  }
}
