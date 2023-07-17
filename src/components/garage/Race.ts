import { createHtmlElement } from "src/helpers";
import Pagination from "src/components/pagination/Pagination";
import Track from "src/components/garage/track/Track";
import { ICar, ICars } from "src/interfeces";
import Api from "../Api";

export default class {
  private title: HTMLElement;
  private titlePage: HTMLElement;
  private wrapperTrack: HTMLElement;

  constructor(garage: HTMLElement) {
    const wrapper = createHtmlElement(garage, "section", "race");

    this.title = createHtmlElement(wrapper, "h2", "", "Garage (100)");
    this.titlePage = createHtmlElement(wrapper, "h4", "", "Page #1");
    this.wrapperTrack = createHtmlElement(wrapper, "div", "tracks");

    // new Track(this.wrapperTrack, "TESLA", "#0FFAF0");
    // new Track(this.wrapperTrack, "LADA", "#FF00A0");

    new Pagination(wrapper);
  }

  async showCars(api: Api) {
    const carsPromise = await api.getCars(1, 10);
    this.renderCars(carsPromise.cars);
  }

  renderCars(cars: ICar[]) {
    cars.forEach((car: ICar) => this.renderCar(car));
  }

  renderCar(car: ICar) {
    new Track(this.wrapperTrack, car.name, car.color);
  }
}
