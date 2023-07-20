import FormView from "src/components/garage/FormView";
import Race from "src/components/garage/Race";
import { createHtmlElement } from "src/helpers";

export default class {
  race: Race;
  constructor() {
    const wrapper = createHtmlElement(document.body, "section", "garage");
    const form = new FormView(wrapper);
    this.race = new Race(wrapper);
  }

  init() {
    this.race.init();
  }
}
