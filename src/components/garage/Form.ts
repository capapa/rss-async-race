import { createHtmlElement } from "src/utils/helpers";
import Track from "src/components/garage/track/Track";
import { ICar } from "src/constants/interfeces";

export default class {
  private inputNameCreate: HTMLInputElement;
  private inputColorCreate: HTMLInputElement;
  private inputNameUpdate: HTMLInputElement;
  private inputColorUpdate: HTMLInputElement;

  private btnCreate: HTMLButtonElement;
  private btnUpdate: HTMLButtonElement;
  public btnRace: HTMLButtonElement;
  public btnReset: HTMLButtonElement;
  public btnGenerate: HTMLButtonElement;

  private track: Track | undefined;

  constructor(garage: HTMLElement) {
    const wrapper = createHtmlElement(garage, "section", "form-car");

    const rowCreate = createHtmlElement(wrapper, "div", "form-row");

    this.inputNameCreate = createHtmlElement(rowCreate, "input", "form__input") as HTMLInputElement;
    this.inputColorCreate = createHtmlElement(rowCreate, "input", "form__inpur__color") as HTMLInputElement;
    this.inputColorCreate.type = "color";

    this.btnCreate = createHtmlElement(rowCreate, "button", "btn", "Create car") as HTMLButtonElement;

    const rowUpdate = createHtmlElement(wrapper, "div", "form-row");

    this.inputNameUpdate = createHtmlElement(rowUpdate, "input", "form__input") as HTMLInputElement;
    this.inputColorUpdate = createHtmlElement(rowUpdate, "input", "form__inpur__color") as HTMLInputElement;
    this.inputColorUpdate.type = "color";

    this.btnUpdate = createHtmlElement(rowUpdate, "button", "btn", "Update car") as HTMLButtonElement;

    const rowBtn = createHtmlElement(wrapper, "div", "form-row");
    this.btnRace = createHtmlElement(rowBtn, "button", "btn", "Race") as HTMLButtonElement;
    this.btnReset = createHtmlElement(rowBtn, "button", "btn", "Reset") as HTMLButtonElement;
    this.btnGenerate = createHtmlElement(rowBtn, "button", "btn", "Generate") as HTMLButtonElement;
  }

  public init(): void {
    this.btnUpdate.disabled = true;
  }

  public setCb(cbCreateCar: (car: ICar) => void, cbUpdateCar: (car: ICar) => void): void {
    this.btnCreate.onclick = (): void => this.createCar(cbCreateCar);
    this.btnUpdate.onclick = (): void => this.updateTrack(cbUpdateCar);
  }

  private createCar(cbCreateCar: (car: ICar) => void): void {
    const car = { id: 0, name: "", color: "" };
    car.name = this.inputNameCreate.value;
    car.color = this.inputColorCreate.value;
    cbCreateCar(car);
    this.inputNameCreate.value = "";
    this.inputColorCreate.value = "#000000";
  }

  public selectTrack(track: Track): void {
    this.btnUpdate.disabled = false;
    this.track = track;
    this.inputNameUpdate.value = track.car.name;
    this.inputColorUpdate.value = track.car.color;
  }

  public updateTrack(cbCreateCar: (car: ICar) => void): void {
    if (this.track) {
      this.track.setName(this.inputNameUpdate.value);
      this.track.setColor(this.inputColorUpdate.value);
      cbCreateCar(this.track.car);
    }
    this.inputNameUpdate.value = "";
    this.inputColorUpdate.value = "#000000";
    this.track = undefined;
    this.btnUpdate.disabled = true;
  }
}
