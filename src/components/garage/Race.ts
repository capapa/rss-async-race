import { ICar } from "src/constants/interfeces";
import { createHtmlElement, getRandomColor, getRandomName } from "src/utils/helpers";
import ApiGarage from "src/components/api/Garage";
import ApiWinners from "src/components/api/Winners";
import Pagination from "src/components/Pagination/Pagination";
import Track from "src/components/garage/track/Track";
import Form from "src/components/garage/Form";
import Popup from "src/components/Popup/Popup";

export default class Race {
  private title: HTMLElement;
  private titlePage: HTMLElement;
  private wrapperTrack: HTMLElement;

  private form: Form;
  private api: ApiGarage;
  private apiWinners: ApiWinners;
  private paginator: Pagination;
  private popup: Popup;
  private tracks: Track[];

  private raceStarted: boolean;
  private timeMin: number;

  constructor(garage: HTMLElement, form: Form) {
    const wrapper = createHtmlElement(garage, "section", "race");

    this.title = createHtmlElement(wrapper, "h2", "", "Garage (100)");
    this.titlePage = createHtmlElement(wrapper, "h4", "", "Page #1");
    this.wrapperTrack = createHtmlElement(wrapper, "div", "tracks");

    this.raceStarted = false;
    this.timeMin = 0;
    this.tracks = [];
    this.form = form;
    this.api = new ApiGarage();
    this.apiWinners = new ApiWinners();
    this.paginator = new Pagination(wrapper, this.showRace.bind(this), 7);
    this.popup = new Popup(wrapper);
  }

  public init(): void {
    this.paginator.init();
    this.popup.init();
    this.form.setCb(this.createCar.bind(this), this.updateCar.bind(this));

    this.form.btnRace.onclick = (): void => this.race();
    this.form.btnReset.onclick = (): Promise<void> => this.reset();
    this.form.btnGenerate.onclick = (): void => this.generate();

    this.showRace();
  }

  private async showRace(): Promise<void> {
    const carsPromise = await this.api.getCars(this.paginator.numPage, this.paginator.limitPage);
    if (this.paginator.countElements !== carsPromise.count) {
      this.paginator.setParam(carsPromise.count);
      this.setTitle();
    }
    this.renderTracks(carsPromise.cars);
  }

  private renderTracks(cars: ICar[]): void {
    this.tracks = [];
    this.setNumPage();
    this.wrapperTrack.innerHTML = "";
    cars.forEach((car: ICar) => this.renderTrack(car));
  }

  private renderTrack(car: ICar): void {
    const track = new Track(this.wrapperTrack, car.id, car.name, car.color);
    track.init(this.form.selectTrack.bind(this.form), this.removeCar.bind(this), this.callFinish.bind(this));
    this.tracks.push(track);
  }

  private setTitle(): void {
    this.title.textContent = `Garage (${this.paginator.countElements})`;
  }

  private setNumPage(): void {
    this.titlePage.textContent = `Page #(${this.paginator.numPage})`;
  }

  private async createCar(car: ICar): Promise<void> {
    await this.api.createCar(car);
    this.showRace();
  }

  private async updateCar(car: ICar): Promise<void> {
    await this.api.updateCar(car);
    this.showRace();
  }

  private async removeCar(id: number): Promise<void> {
    await this.api.deleteCar(id);
    await this.apiWinners.deleteWinner(id);
    this.showRace();
  }

  private race(): void {
    this.raceStarted = true;
    this.timeMin = 0;
    const raceStarted = true;
    this.tracks.forEach((track) => {
      track.setCarDrive(raceStarted);
    });
    this.form.btnRace.disabled = true;
    this.form.btnReset.disabled = true;
    this.paginator.disabled = true;
  }

  private async reset(): Promise<void> {
    this.form.btnReset.disabled = true;
    await Promise.all(this.tracks.map((track) => track.setCarInit()));
    this.form.btnRace.disabled = false;
    this.paginator.disabled = false;
    this.popup.hide();
  }

  private generate(): void {
    const car = { id: 0, name: "", color: "" };
    for (let i = 0; i < 100; i += 1) {
      car.name = getRandomName();
      car.color = getRandomColor();
      this.api.createCar(car);
    }
    this.showRace();
  }

  private async callFinish(track: Track): Promise<void> {
    if (this.raceStarted && !this.timeMin) {
      this.form.btnReset.disabled = false;
      this.popup.show(track.car.name, track.finishTime);
      this.timeMin = track.finishTime;
      const winner = await this.apiWinners.getWinner(track.car.id);
      const isNotExists = !winner.wins;
      winner.wins += 1;
      if (!winner.time || winner.time > this.timeMin) winner.time = this.timeMin;
      if (isNotExists) {
        await this.apiWinners.createWinner(winner);
      } else {
        await this.apiWinners.updateWinner(winner);
      }
    }
  }
}
