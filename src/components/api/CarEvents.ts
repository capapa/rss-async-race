import { URL } from "src/constants/const";
import { Method, Path } from "src/components/api/enum";
import { IEngine } from "src/constants/interfeces";
import { EngineStatus } from "src/constants/types";

export default class {
  private path: string;

  constructor() {
    this.path = `${URL}/${Path.Engine}`;
  }

  public async setStatusEngine(id: number, status: EngineStatus): Promise<IEngine> {
    const response = await fetch(`${this.path}?id=${id}&status=${status}`, {
      method: Method.PATCH,
    });
    return response.json();
  }

  public async setStatusEngineDrive(id: number): Promise<{ success: boolean }> {
    const response = await fetch(`${this.path}?id=${id}&status=drive`, {
      method: Method.PATCH,
    });
    if (response.status < 200 || response.status > 299) return { success: false };
    return response.json();
  }
}
