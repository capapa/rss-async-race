import Garage from "src/components/garage/Garage";
import Winners from "src/components/Winners/Winners";
import Header from "src/components/Header/Header";

export default class App {
  private header: Header;
  private winners: Winners;
  private garage: Garage;

  constructor() {
    this.header = new Header();
    this.garage = new Garage();
    this.winners = new Winners();
  }

  public init(): void {
    this.header.init();
    this.garage.init();
    this.winners.init();

    this.header.btnGarage.onclick = (): void => {
      this.garage.wrapper.style.display = "block";
      this.winners.wrapper.style.display = "none";
    };
    this.header.btnWinners.onclick = (): void => {
      this.garage.wrapper.style.display = "none";
      this.winners.wrapper.style.display = "block";
      this.winners.showTable();
    };
  }
}
