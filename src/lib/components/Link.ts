import { View } from "../core/View";
import { Router } from "../router/Router";

/**
 * A component that renders a link for internal navigation.
 */
export class Link extends View {
    private to: string;
    private label: string | View;

    public constructor(to: string, label: string | View) {
        super();
        this.to = to;
        this.label = label;
    }

    public render(): HTMLElement {
        const a = document.createElement("a");
        a.href = this.to;

        if (typeof this.label === "string") {
            a.textContent = this.label;
        } else {
            a.appendChild(this.label.build());
        }

        a.style.textDecoration = "none";
        a.style.color = "inherit";
        a.style.cursor = "pointer";

        a.addEventListener("click", (e) => {
            e.preventDefault();
            Router.navigate(this.to);
        });

        return a;
    }
}
