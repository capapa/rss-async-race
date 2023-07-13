import { IStateGame } from "src/interfeces";

export default class MyStorage {
  private keyState: string;
  private defalutState: IStateGame;

  constructor(defalutState: IStateGame) {
    this.keyState = "stateGame";
    this.defalutState = defalutState;
  }

  public saveState(state: IStateGame): void {
    const value: string = JSON.stringify(state);
    localStorage.setItem(this.keyState, value);
  }

  public loadState(): IStateGame {
    const value = localStorage.getItem(this.keyState);
    if (value) {
      return JSON.parse(value) as IStateGame;
    }
    return this.defalutState;
  }
}
