import { DomChild } from "../../dom/DomNode.js";
import Store from "../../store/Store.js";
import Component from "../Component.js";
import Tab from "./Tab.js";

export default class Tabs extends Component {
  public children: Tab[] = [];
  private store: Store;

  constructor(
    id: string,
    tabs: { id: string; label: DomChild | DomChild[] }[],
  ) {
    super("ul.tabs");
    this.addAllowedEvents("select");
    this.store = new Store(`tabs-${id}`);

    for (const t of tabs) {
      const tab = new Tab(t.id, t.label);
      tab.onDom("click", () => this.select(t.id));
      this.append(tab);
    }
  }

  public init() {
    if (this.store.get("selected")) {
      this.select(this.store.get("selected")!);
    } else {
      const firstId = this.children[0]?._id;
      if (firstId) {
        this.select(firstId);
      }
    }
  }

  public select(id: string) {
    for (const tab of this.children) {
      tab.active = tab._id === id;
    }
    this.store.set("selected", id, true);
    this.fireEvent("select", id);
  }
}