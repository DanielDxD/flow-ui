import { View } from "../core/View";
import { SelectOption } from "./SelectField";

export class RadioInput<T extends string | number> extends View {
    private title: string;
    private selection: T;
    private options: SelectOption<T>[];
    private onValueChange: (newValue: T) => void;

    public constructor(
        title: string,
        selection: T,
        options: SelectOption<T>[],
        onValueChange: (newValue: T) => void
    ) {
        super();
        this.title = title;
        this.selection = selection;
        this.options = options;
        this.onValueChange = onValueChange;

        this._styles.display = "flex";
        this._styles.flexDirection = "column";
        this._styles.gap = "8px";
    }

    public render(): HTMLElement {
        const container = document.createElement("div");

        const label = document.createElement("label");
        label.textContent = this.title;
        label.style.fontSize = "14px";
        label.style.fontWeight = "600";
        label.style.color = "#374151";
        label.style.marginBottom = "4px";
        container.appendChild(label);

        const groupKey = `radio-group-${Math.random().toString(36).substr(2, 9)}`;

        const optionsContainer = document.createElement("div");
        optionsContainer.style.display = "flex";
        optionsContainer.style.flexDirection = "column";
        optionsContainer.style.gap = "8px";

        for (const option of this.options) {
            const item = document.createElement("label");
            item.style.display = "flex";
            item.style.alignItems = "center";
            item.style.gap = "8px";
            item.style.cursor = "pointer";
            item.style.fontSize = "15px";

            const radio = document.createElement("input");
            radio.id = `radio-${this.title.toLowerCase().replace(/\s+/g, "-")}-${String(option.value).toLowerCase()}`;
            radio.type = "radio";
            radio.name = groupKey;
            radio.value = String(option.value);
            radio.checked = option.value === this.selection;
            radio.style.cursor = "pointer";

            radio.addEventListener("change", () => {
                const val = (typeof this.selection === "number" ? Number(option.value) : option.value) as T;
                this.onValueChange(val);
            });

            const text = document.createElement("span");
            text.textContent = option.label;

            item.appendChild(radio);
            item.appendChild(text);
            optionsContainer.appendChild(item);
        }

        container.appendChild(optionsContainer);

        return container;
    }
}
