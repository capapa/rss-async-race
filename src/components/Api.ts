import { URL } from "src/const";
import { PATH } from "src/enum";
import { ICar, ICars } from "src/interfeces";

export default class {
  async getCar(id: number): Promise<ICar> {
    const response = await fetch(`${URL}/${PATH.Garage}/${id}`);
    return await response.json();
  }

  async getCars(page: number, limit: number): Promise<ICars> {
    const response = await fetch(`${URL}/${PATH.Garage}?_page=${page}&_limit${limit}`);
    const count = response.headers.get("X-Total-Count") ?? 0;
    return {
      cars: await response.json(),
      count: Number(count),
    };
  }
}
