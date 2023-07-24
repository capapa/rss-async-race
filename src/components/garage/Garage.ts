import { createHtmlElement } from "src/utils/helpers";
import Form from "src/components/garage/Form";
import Race from "src/components/garage/Race";

export default class {
  public wrapper: HTMLElement;

  private form: Form;
  private race: Race;

  constructor() {
    this.wrapper = createHtmlElement(document.body, "section", "garage");
    this.form = new Form(this.wrapper);
    this.race = new Race(this.wrapper, this.form);
  }

  public init(): void {
    this.form.init();
    this.race.init();
  }
}
