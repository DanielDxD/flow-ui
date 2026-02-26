import { View } from "../core/View";
import { TextRole } from "../enums/role";

export class Text extends View {
    private content: string;
    private role: TextRole;

    public constructor(content: string, role: TextRole = TextRole.Text) {
        super();
        this.content = content;
        this.role = role;
    }

    public render(): HTMLElement {
        const el = document.createElement(this.role);
        el.textContent = this.content;
        return el;
    }

    // Text specific modifiers
    public textAlignment(alignment: "left" | "center" | "right" | "justify"): this {
        this._styles.textAlign = alignment;
        return this;
    }
}
