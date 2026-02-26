import { View } from "../core/View";

export interface SelectOption<T> {
    label: string;
    value: T;
}

export class SelectField<T extends string | number> extends View {
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
        this._styles.gap = "4px";
    }

    public render(): HTMLElement {
        const container = document.createElement("div");

        const label = document.createElement("label");
        label.textContent = this.title;
        label.style.fontSize = "14px";
        label.style.fontWeight = "500";
        label.style.color = "#4b5563";

        const select = document.createElement("select");
        select.id = `select-${this.title.toLowerCase().replace(/\s+/g, "-")}`;
        select.style.padding = "8px 12px";
        select.style.borderRadius = "6px";
        select.style.border = "1px solid #d1d5db";
        select.style.fontSize = "16px";
        select.style.backgroundColor = "white";
        select.style.outline = "none";
        select.style.cursor = "pointer";

        for (const option of this.options) {
            const el = document.createElement("option");
            el.value = String(option.value);
            el.textContent = option.label;
            el.selected = option.value === this.selection;
            select.appendChild(el);
        }

        select.addEventListener("change", (e) => {
            const target = e.target as HTMLSelectElement;
            const val = target.value;
            // Handle numeric values if the current selection is a number
            const finalVal = (typeof this.selection === "number" ? Number(val) : val) as T;
            this.onValueChange(finalVal);
        });

        select.addEventListener("focus", () => {
            select.style.borderColor = "#3b82f6";
            select.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.2)";
        });

        select.addEventListener("blur", () => {
            select.style.borderColor = "#d1d5db";
            select.style.boxShadow = "none";
        });

        container.appendChild(label);
        container.appendChild(select);

        return container;
    }
}
