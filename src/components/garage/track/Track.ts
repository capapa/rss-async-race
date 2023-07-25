import { createHtmlElement } from "src/utils/helpers";
import svgCar from "src/components/garage/track/car.svg";
import { ICar, IEngine } from "src/constants/interfeces";
import ApiCarEvents from "src/components/api/CarEvents";

export default class Track {
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
  private cbFinish: (track: this) => void;

  public car: ICar;
  public finishTime: number;

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

    this.cbFinish = (): void => {};
    this.finishTime = 0;
    this.car = { id, name, color };
    this.engine = { status: "stopped", velocity: 0, distance: 0 };
  }

  public init(cbSelect: (track: this) => void, cbRemove: (id: number) => void, cbFinish: (track: this) => void): void {
    this.initSvg();
    this.imgFinish.src = "dist/finish.jpg";
    this.btnB.disabled = true;

    this.btnSelect.onclick = (): void => cbSelect(this);
    this.btnRemove.onclick = (): void => cbRemove(this.car.id);

    this.btnA.onclick = (): Promise<void> => this.setCarDrive();
    this.btnB.onclick = (): Promise<void> => this.setCarInit();

    this.cbFinish = cbFinish;
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

  public setColor(value: string): void {
    this.car.color = value;
    this.imgCar.style.fill = value;
  }

  public async setCarDrive(raceStarted: boolean = false): Promise<void> {
    this.finishTime = 0;
    this.engine.status = "started";
    this.btnA.disabled = true;
    const response = await this.apiCarEvents.setStatusEngine(this.car.id, this.engine.status);
    this.engine.distance = response.distance;
    this.engine.velocity = response.velocity;

    this.engine.status = "drive";
    const duration = response.distance / response.velocity;
    this.startAnimation(duration);

    this.btnB.disabled = raceStarted;
    const responseDrive = await this.apiCarEvents.setStatusEngineDrive(this.car.id);
    if (!responseDrive.success) this.engine.status = "stopped";
  }

  public async setCarInit(): Promise<void> {
    await this.apiCarEvents.setStatusEngine(this.car.id, "stopped");
    this.engine.status = "stopped";
    this.wrapperImgCar.style.transform = "";
    this.btnA.disabled = false;
    this.btnB.disabled = true;
  }

  private startAnimation(duration: number): void {
    let startTimestamp = 0;
    let currentX = 0;

    const framesPerSecond = 1000 / 60;
    const finalDistanceFromRigth = 150;
    const finalLeft = document.body.clientWidth - finalDistanceFromRigth;
    const framesCount = duration / framesPerSecond;
    const shift = finalLeft / framesCount;

    const step = (timestamp: number): void => {
      if (!startTimestamp) startTimestamp = timestamp;
      currentX += shift;

      const elapsed = timestamp - startTimestamp;
      if (this.engine.status === "drive") this.wrapperImgCar.style.transform = `translateX(${currentX}px)`;

      if (currentX < finalLeft && this.engine.status === "drive") {
        requestAnimationFrame(step);
      } else if (currentX >= finalLeft) {
        this.finishTime = elapsed / 1000;
        this.cbFinish(this);
      }
    };

    requestAnimationFrame(step);
  }
}
