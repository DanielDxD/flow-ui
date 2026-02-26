import { View } from "../core/View";

export class TextField extends View {
    private title: string;
    private value: string;
    private onValueChange: (newValue: string) => void;
    private placeholder: string;
    private type: "text" | "password" | "email" = "text";

    public constructor(title: string, value: string, onValueChange: (newValue: string) => void) {
        super();
        this.title = title;
        this.value = value;
        this.onValueChange = onValueChange;
        this.placeholder = title;

        this._styles.display = "flex";
        this._styles.flexDirection = "column";
        this._styles.gap = "4px";
    }

    public setPlaceholder(placeholder: string): this {
        this.placeholder = placeholder;
        return this;
    }

    public setType(type: "text" | "password" | "email"): this {
        this.type = type;
        return this;
    }

    public render(): HTMLElement {
        const container = document.createElement("div");

        const label = document.createElement("label");
        label.textContent = this.title;
        label.style.fontSize = "14px";
        label.style.fontWeight = "500";
        label.style.color = "#4b5563";

        const input = document.createElement("input");
        input.id = `input-${this.title.toLowerCase().replace(/\s+/g, "-")}`;
        input.type = this.type;
        input.value = this.value;
        input.placeholder = this.placeholder;

        input.style.padding = "8px 12px";
        input.style.borderRadius = "6px";
        input.style.border = "1px solid #d1d5db";
        input.style.fontSize = "16px";
        input.style.outline = "none";

        input.addEventListener("input", (e) => {
            const target = e.target as HTMLInputElement;
            this.onValueChange(target.value);
        });

        input.addEventListener("focus", () => {
            input.style.borderColor = "#3b82f6";
            input.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.2)";
        });

        input.addEventListener("blur", () => {
            input.style.borderColor = "#d1d5db";
            input.style.boxShadow = "none";
        });

        container.appendChild(label);
        container.appendChild(input);

        return container;
    }
}
