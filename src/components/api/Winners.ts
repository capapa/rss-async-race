import { URL } from "src/constants/const";
import { Method, Path } from "src/components/api/enum";
import { Order, SortWinners } from "src/constants/enum";
import { IWinner, IWinners } from "src/constants/interfeces";

export default class {
  private path: string;

  constructor() {
    this.path = `${URL}/${Path.Winners}`;
  }

  public async getWinners(page: number, limit: number, sort: SortWinners, order: Order): Promise<IWinners> {
    const response = await fetch(`${this.path}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
    const count = response.headers.get("X-Total-Count") ?? 0;
    const winners = await response.json();
    return {
      winners,
      count: Number(count),
    };
  }

  public async getWinner(id: number): Promise<IWinner> {
    const response = await fetch(`${this.path}/${id}`);
    if (response.status < 200 || response.status > 299) return { id, wins: 0, time: 0 };
    return response.json();
  }

  public async createWinner(winner: IWinner): Promise<IWinner> {
    const response = await fetch(`${this.path}`, {
      method: Method.POST,
      body: JSON.stringify(winner),
      headers: {
        "Content-type": "application/json",
      },
    });
    return response.json();
  }

  public async updateWinner(winner: IWinner): Promise<IWinner> {
    const response = await fetch(`${this.path}/${winner.id}`, {
      method: Method.PUT,
      body: JSON.stringify(winner),
      headers: {
        "Content-type": "application/json",
      },
    });
    return response.json();
  }

  public async deleteWinner(id: number): Promise<IWinner> {
    const response = await fetch(`${this.path}/${id}`, {
      method: Method.DELETE,
      headers: {
        "Content-type": "application/json",
      },
    });
    return response.json();
  }
}
