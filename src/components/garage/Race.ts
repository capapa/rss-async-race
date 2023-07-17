import { createHtmlElement } from "src/helpers";
import Pagination from "src/components/pagination/Pagination";
import Track from "./track/Track";

export default class {
  private title: HTMLElement;
  private titlePage: HTMLElement;
  private wrapperTrack: HTMLElement;
  // private car: HTMLElement;
  // private speed: number;

  constructor() {
    const wrapper = createHtmlElement(document.body, "section", "race");

    this.title = createHtmlElement(wrapper, "h2", "", "Garage (100)");
    this.titlePage = createHtmlElement(wrapper, "h4", "", "Page #1");
    this.wrapperTrack = createHtmlElement(wrapper, "div", "tracks");

    new Track(this.wrapperTrack, "TESLA", "#FF0000");
    new Track(this.wrapperTrack, "LADA", "#FF0000");

    new Pagination(wrapper);
  }
}
