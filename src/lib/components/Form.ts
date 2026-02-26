import { View } from "../core/View";
import { Container } from "./Container";

export class Form extends Container {
    private onSubmit?: () => void;

    public constructor(children: View | View[], onSubmit?: () => void) {
        super(children);
        this.onSubmit = onSubmit;

        this._styles.display = "flex";
        this._styles.flexDirection = "column";
        this._styles.gap = "16px";
    }

    public render(): HTMLElement {
        const el = document.createElement("form");

        el.addEventListener("submit", (e) => {
            e.preventDefault();
            this.onSubmit?.();
        });

        for (const child of this.children) {
            el.appendChild(child.build());
        }

        return el;
    }
}
