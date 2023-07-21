import { createElement, createHtmlElement } from "src/helpers";
import svgCar from "src/components/garage/track/car.svg";
import { ICar, IEngine } from "src/interfeces";
import ApiCarEvents from "src/components/api/CarEvents";
//import TrackView from "src/components/garage/track/Track.html";

export default class {
  private wrapperTrack: HTMLElement;
  private spanNameCar: HTMLElement;
  private wrapperImgCar: HTMLElement;
  private imgCar: HTMLElement;
  private imgFinish: HTMLImageElement;
  private btnSelect: HTMLButtonElement;
  private btnRemove: HTMLButtonElement;
  private btnA: HTMLButtonElement;
  private btnB: HTMLButtonElement;

  private engine: IEngine;
  private apiCarEvents: ApiCarEvents;

  public car: ICar;

  constructor(parent: HTMLElement, id: number, name: string, color: string) {
    const trackContainer = createHtmlElement(parent, "div", "track-container");

    const controlsTrack = createHtmlElement(trackContainer, "div", "track__controls");
    this.btnSelect = createHtmlElement(controlsTrack, "button", "btn", "Select") as HTMLButtonElement;
    this.btnRemove = createHtmlElement(controlsTrack, "button", "btn", "Remove") as HTMLButtonElement;
    this.spanNameCar = createHtmlElement(controlsTrack, "span", "", name);

    this.wrapperTrack = createHtmlElement(trackContainer, "div", "track");
    this.btnA = createHtmlElement(this.wrapperTrack, "button", "btn", "A") as HTMLButtonElement;
    this.btnB = createHtmlElement(this.wrapperTrack, "button", "btn", "B") as HTMLButtonElement;

    this.wrapperImgCar = createHtmlElement(this.wrapperTrack, "div", "track__car");
    this.imgCar = document.createElement("svg");
    this.imgFinish = createHtmlElement(this.wrapperTrack, "img", "track__finish") as HTMLImageElement;

    this.apiCarEvents = new ApiCarEvents();

    this.car = { id, name, color };
    this.engine = { status: "stopped", velocity: 0, distance: 0 };
  }

  public init(cbSelect: (track: this) => void, cbRemove: (id: number) => void) {
    this.initSvg();
    this.imgFinish.src = "dist/finish.jpg";
    this.btnB.disabled = true;

    this.btnSelect.onclick = () => cbSelect(this);
    this.btnRemove.onclick = () => cbRemove(this.car.id);

    this.btnA.onclick = () => this.setCarDrive();
    this.btnB.onclick = () => this.setCarInit();
  }

  private initSvg(): void {
    this.wrapperImgCar.innerHTML = svgCar;
    this.imgCar = this.wrapperImgCar.children[0] as HTMLElement;
    this.setColor(this.car.color);
  }

  public setName(value: string): void {
    this.car.name = value;
    this.spanNameCar.textContent = value;
  }

  public setColor(value: string) {
    this.car.color = value;
    this.imgCar.style.fill = value;
  }

  public async setCarDrive() {
    if (this.engine.status !== "stopped") return;
    this.btnA.disabled = true;
    this.btnB.disabled = false;

    this.engine.status = "started";
    const response = await this.apiCarEvents.setStatusEngine(this.car.id, this.engine.status);
    this.engine.distance = response.distance;
    this.engine.velocity = response.velocity;

    this.engine.status = "drive";
    const time = response.distance / response.velocity;
    this.startAnimation(time);

    const responseDrive = await this.apiCarEvents.setStatusEngineDrive(this.car.id);
    if (!responseDrive.success) this.engine.status = "stopped";
  }

  public async setCarInit() {
    if (this.engine.status !== "stopped") {
      await this.apiCarEvents.setStatusEngine(this.car.id, "stopped");
      this.engine.status = "stopped";
    }
    this.wrapperImgCar.style.transform = "";
    this.btnA.disabled = false;
    this.btnB.disabled = true;
  }

  private startAnimation(time: number) {
    let startTimestamp = 0;
    let currentX = 0;
    const finalLeft = document.body.clientWidth - 150;
    const framesCount = (time / 1000) * 60;
    const shift = finalLeft / framesCount;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      currentX += shift;

      const elapsed = timestamp - startTimestamp;
      this.wrapperImgCar.style.transform = `translateX(${currentX}px)`;

      if (currentX < finalLeft && this.engine.status === "drive") {
        requestAnimationFrame(step);
      } else {
        if (this.btnB.disabled) this.wrapperImgCar.style.transform = "";
        if (this.engine.status !== "stopped") this.engine.status = "stopped";
      }
    };

    requestAnimationFrame(step);
  }
}
