import Garage from "src/components/garage/Garage";
import Winners from "src/components/winners/Winners";

export default class App {
  constructor() {
    new Garage();
    new Winners();
  }
}
