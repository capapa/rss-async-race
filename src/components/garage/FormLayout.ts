import { createHtmlElement } from "src/helpers";

export default class {
  constructor() {
    const wrapper = createHtmlElement(document.body, "section", "form-car");

    const rowCreate = createHtmlElement(wrapper, "div", "form-row");

    const inputNameCreate = createHtmlElement(rowCreate, "input", "form__input") as HTMLInputElement;
    inputNameCreate.type = "text";

    const inputColorCreate = createHtmlElement(rowCreate, "input", "form__inpur__color") as HTMLInputElement;
    inputColorCreate.type = "color";

    const btnCreate = createHtmlElement(rowCreate, "button", "btn", "Create car");

    const rowUpdate = createHtmlElement(wrapper, "div", "form-row");

    const inputNameUpdate = createHtmlElement(rowUpdate, "input", "form__input") as HTMLInputElement;
    inputNameCreate.type = "text";

    const inputColorUpdate = createHtmlElement(rowUpdate, "input", "form__inpur__color") as HTMLInputElement;
    inputColorUpdate.type = "color";

    const btnUpdate = createHtmlElement(rowUpdate, "button", "btn", "Update car");

    const rowBtn = createHtmlElement(wrapper, "div", "form-row");
    createHtmlElement(rowBtn, "button", "btn", "Race");
    createHtmlElement(rowBtn, "button", "btn", "Reset");
    createHtmlElement(rowBtn, "button", "btn", "Generate");
  }
}
