import { View } from "../core/View";

export class Button extends View {
    private content: string | View;

    public constructor(content: string | View, onClick?: (e: MouseEvent) => void) {
        super();
        this.content = content;

        // Default button styles for SwiftUI-like appearance
        this._styles.display = "inline-flex";
        this._styles.alignItems = "center";
        this._styles.justifyContent = "center";
        this._styles.cursor = "pointer";
        this._styles.border = "none";
        this._styles.backgroundColor = "transparent";

        if (onClick) {
            this.onTap(onClick);
        }
    }

    public render(): HTMLElement {
        const el = document.createElement("button");

        if (typeof this.content === "string") {
            el.textContent = this.content;
        } else {
            el.appendChild(this.content.build());
        }

        return el;
    }

    // Button specific modifiers could go here
    public disabled(isDisabled: boolean): this {
        if (isDisabled) {
            this._element?.setAttribute("disabled", "true");
            this._styles.opacity = "0.5";
            this._styles.cursor = "not-allowed";
        } else {
            this._element?.removeAttribute("disabled");
            this._styles.opacity = "1";
            this._styles.cursor = "pointer";
        }
        return this;
    }
}
