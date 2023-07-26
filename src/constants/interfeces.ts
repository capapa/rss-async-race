import { EngineStatus } from "src/constants/types";

export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface ICars {
  cars: ICar[];
  count: number;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export interface IWinners {
  winners: IWinner[];
  count: number;
}

export interface IEngine {
  status: EngineStatus;
  velocity: number;
  distance: number;
}
