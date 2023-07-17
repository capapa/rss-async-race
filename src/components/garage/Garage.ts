import FormView from "src/components/garage/FormView";
import Race from "src/components/garage/Race";
import Api from "src/components/Api";
import { createHtmlElement } from "src/helpers";

export default class {
  constructor() {
    const wrapper = createHtmlElement(document.body, "section", "garage");
    new FormView(wrapper);
    const race = new Race(wrapper);
    const api = new Api();
    race.showCars(api);
  }
}
