import { v4 as uuidv4 } from "uuid";
import el from "../dom/el.js";
import RetroComponent from "./RetroComponent.js";
export default class RetroCheckbox extends RetroComponent {
    input;
    constructor(options) {
        super(".checkbox");
        const id = uuidv4();
        this.append(this.input = el("input", { id, type: "checkbox" }, {
            change: () => this.fireEvent("change"),
        }), el("label", { for: id }, options.label));
    }
    get checked() {
        return this.input.domElement.checked;
    }
}
//# sourceMappingURL=RetroCheckbox.js.map