import { createHtmlElement } from "src/helpers";
//import svgCar from "src/components/garage/track/car.svg";
import TrackView from "src/components/garage/track/Track.html";

export default class {
  private spanNameCar: HTMLElement;
  private imgCar: SVGElement;

  constructor(parent: HTMLElement, name: string, color: string) {
    const trackContainer = createHtmlElement(parent, "div", "track-container");
    trackContainer.innerHTML = TrackView;

    this.spanNameCar = trackContainer.querySelector("span") as HTMLElement;
    this.imgCar = trackContainer.querySelector("svg") as SVGElement;
    this.setColor(color);
    this.setName(name);

    // const trackContainer = createHtmlElement(parent, "div", "track-container");

    // const controlsTrack = createHtmlElement(trackContainer, "div", "track__controls");
    // const btnSelect = createHtmlElement(controlsTrack, "button", "btn", "Select");
    // const btnRemove = createHtmlElement(controlsTrack, "button", "btn", "Remove");
    // this.spanNameCar = createHtmlElement(controlsTrack, "span", "", name);

    // const wrapperTrack = createHtmlElement(trackContainer, "div", "track");
    // const btnA = createHtmlElement(wrapperTrack, "button", "btn", "A");
    // const btnB = createHtmlElement(wrapperTrack, "button", "btn", "B");

    // this.imgCar = this.getSvg("#FFAA00");
    // wrapperTrack.append(this.imgCar);

    // const imgFinish = createHtmlElement(wrapperTrack, "img", "track__finish") as HTMLImageElement;
    // imgFinish.src = "dist/finish.jpg";
  }

  // getSvg(color: string): HTMLElement {
  //   const svgWrapper = document.createElement("div");
  //   svgWrapper.innerHTML = svgCar;
  //   const svg = svgWrapper.firstChild as HTMLElement;
  //   svg.classList.add("track__car");
  //   svg.style.fill = color;
  //   //this.imgCar.classList.add("drive");
  //   return svg;
  // }

  setName(name: string): void {
    this.spanNameCar.textContent = name;
  }

  setColor(color: string): void {
    this.imgCar.style.fill = color;
  }
}
