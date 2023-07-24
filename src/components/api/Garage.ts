import { URL } from "src/constants/const";
import { Method, Path } from "src/components/api/enum";
import { ICar, ICars } from "src/constants/interfeces";

export default class {
  private path: string;

  constructor() {
    this.path = `${URL}/${Path.Garage}`;
  }

  public async getCar(id: number): Promise<ICar> {
    const response = await fetch(`${this.path}/${id}`);
    return response.json();
  }

  public async getCars(page: number, limit: number): Promise<ICars> {
    const response = await fetch(`${this.path}?_page=${page}&_limit=${limit}`);
    const count = response.headers.get("X-Total-Count") ?? 0;
    const cars = await response.json();
    return {
      cars,
      count: Number(count),
    };
  }

  public async createCar(car: ICar): Promise<ICar> {
    const response = await fetch(`${this.path}`, {
      method: Method.POST,
      body: JSON.stringify(car),
      headers: {
        "Content-type": "application/json",
      },
    });
    return response.json();
  }

  public async updateCar(car: ICar): Promise<ICar> {
    const response = await fetch(`${this.path}/${car.id}`, {
      method: Method.PUT,
      body: JSON.stringify(car),
      headers: {
        "Content-type": "application/json",
      },
    });
    return response.json();
  }

  public async deleteCar(id: number): Promise<Record<string, never>> {
    const response = await fetch(`${this.path}/${id}`, {
      method: Method.DELETE,
      headers: {
        "Content-type": "application/json",
      },
    });
    return response.json();
  }
}
