import { View } from "../core/View";

export class Container extends View {
    protected children: View[];

    public constructor(children: View | View[]) {
        super();
        this.children = Array.isArray(children) ? children : [children];
    }

    public render(): HTMLElement {
        const el = document.createElement("div");
        for (const child of this.children) {
            el.appendChild(child.build());
        }
        return el;
    }
}
