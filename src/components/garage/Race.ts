import { ICar } from "src/interfeces";
import { createHtmlElement, getRandomColor, getRandomName } from "src/helpers";
import ApiGarage from "src/components/api/Garage";
import ApiWinners from "src/components/api/Winners";
import Pagination from "src/components/pagination/Pagination";
import Track from "src/components/garage/track/Track";
import Form from "src/components/garage/Form";

export default class {
  private title: HTMLElement;
  private titlePage: HTMLElement;
  private wrapperTrack: HTMLElement;

  private form: Form;
  private api: ApiGarage;
  private apiWinners: ApiWinners;
  private paginator: Pagination;
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
    this.paginator = new Pagination(wrapper, this.showRace.bind(this));
  }

  public init(): void {
    this.paginator.init();
    this.form.setCb(this.createCar.bind(this), this.updateCar.bind(this));

    this.form.btnRace.onclick = () => this.race();
    this.form.btnReset.onclick = () => this.reset();
    this.form.btnGenerate.onclick = () => this.generate();

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
    this.tracks.forEach((track) => {
      track.setCarDrive();
    });
    this.form.btnRace.disabled = true;
    this.form.btnReset.disabled = true;
  }

  private reset(): void {
    this.tracks.forEach((track) => {
      track.setCarInit();
    });
    this.form.btnRace.disabled = false;
  }

  private async generate(): Promise<void> {
    const car = { id: 0, name: "", color: "" };
    for (let i = 0; i < 10; i += 1) {
      car.name = getRandomName();
      car.color = getRandomColor();
      await this.api.createCar(car);
    }
    this.showRace();
  }

  private async callFinish(track: Track): Promise<void> {
    if (this.raceStarted && !this.timeMin) {
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
