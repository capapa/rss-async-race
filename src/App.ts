import Garage from "src/components/garage/Garage";
import Winners from "src/components/winners/Winners";

export default class App {
  winners: Winners;
  garage: Garage;

  constructor() {
    this.garage = new Garage();
    this.winners = new Winners();
  }

  init() {
    this.garage.init();
    this.winners.init();
  }
}
