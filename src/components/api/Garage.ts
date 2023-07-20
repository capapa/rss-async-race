import { URL } from "src/const";
import { Method, Path } from "src/enum";
import { ICar, ICars } from "src/interfeces";

export default class {
  private path: string;

  constructor() {
    this.path = `${URL}/${Path.Garage}`;
  }

  async getCar(id: number): Promise<ICar> {
    const response = await fetch(`${this.path}/${id}`);
    return await response.json();
  }

  async getCars(page: number, limit: number): Promise<ICars> {
    const response = await fetch(`${this.path}?_page=${page}&_limit${limit}`);
    const count = response.headers.get("X-Total-Count") ?? 0;
    const cars = await response.json();
    return {
      cars,
      count: Number(count),
    };
  }

  async createCar(car: ICar): Promise<ICar> {
    const response = await fetch(`${this.path}`, {
      method: Method.POST,
      body: JSON.stringify(car),
      headers: {
        "Content-type": "application/json",
      },
    });
    return await response.json();
  }

  async updateCar(car: ICar): Promise<ICar> {
    const response = await fetch(`${this.path}/${car.id}`, {
      method: Method.PUT,
      body: JSON.stringify(car),
      headers: {
        "Content-type": "application/json",
      },
    });
    return await response.json();
  }

  async deleteCar(car: ICar): Promise<{}> {
    const response = await fetch(`${this.path}/${car.id}`, {
      method: Method.DELETE,
      headers: {
        "Content-type": "application/json",
      },
    });
    return await response.json();
  }
}
