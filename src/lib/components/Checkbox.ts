import { View } from "../core/View";

export class Checkbox extends View {
    protected title: string;
    protected isOn: boolean;
    protected onValueChange: (newValue: boolean) => void;

    public constructor(title: string, isOn: boolean, onValueChange: (newValue: boolean) => void) {
        super();
        this.title = title;
        this.isOn = isOn;
        this.onValueChange = onValueChange;

        this._styles.display = "flex";
        this._styles.alignItems = "center";
        this._styles.gap = "8px";
        this._styles.cursor = "pointer";
    }

    public render(): HTMLElement {
        const container = document.createElement("div");

        const input = document.createElement("input");
        input.id = `checkbox-${this.title.toLowerCase().replace(/\s+/g, "-")}`;
        input.type = "checkbox";
        input.checked = this.isOn;
        input.style.cursor = "pointer";
        input.style.width = "18px";
        input.style.height = "18px";

        input.addEventListener("change", (e) => {
            const target = e.target as HTMLInputElement;
            this.onValueChange(target.checked);
        });

        const label = document.createElement("label");
        label.textContent = this.title;
        label.style.cursor = "pointer";
        label.style.fontSize = "16px";
        label.style.color = "#374151";

        container.appendChild(input);
        container.appendChild(label);

        container.addEventListener("click", () => {
            input.click();
        });

        // Prevent double toggle if label is clicked (since it triggers input.click and input also triggers change)
        input.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        return container;
    }
}
