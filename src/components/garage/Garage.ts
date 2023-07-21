import Form from "src/components/garage/Form";
import Race from "src/components/garage/Race";
import { createHtmlElement } from "src/helpers";

export default class {
  form: Form;
  race: Race;

  constructor() {
    const wrapper = createHtmlElement(document.body, "section", "garage");
    this.form = new Form(wrapper);
    this.race = new Race(wrapper, this.form);
  }

  init() {
    this.form.init();
    this.race.init();
  }
}
