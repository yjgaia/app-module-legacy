import { DomChild } from "../dom/DomNode.js";
import Component from "./Component.js";
export default class AppNavBar extends Component {
    private store;
    constructor(options: {
        id: string;
        logo: DomChild;
        menu: {
            id: string;
            icon: DomChild;
            title: string;
        }[];
    });
    init(id?: string): this;
}
//# sourceMappingURL=AppNavBar.d.ts.map