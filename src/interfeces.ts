import { StateLevel } from "src/types";

export interface IStateGame {
  stateLevels: StateLevel[];
}

export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface ICars {
  cars: ICar[];
  count: number;
}
