import { View } from "../core/View";
import { Container } from "./Container";

export class VStack extends Container {
    public constructor(children: View | View[]) {
        super(children);
        this._styles.display = "flex";
        this._styles.flexDirection = "column";
    }

    public spacing(value: number | string): this {
        this._styles.gap = typeof value === "number" ? `${value}px` : value;
        return this;
    }

    public alignItems(alignment: "flex-start" | "flex-end" | "center" | "baseline" | "stretch"): this {
        this._styles.alignItems = alignment;
        return this;
    }

    public justifyContent(content: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"): this {
        this._styles.justifyContent = content;
        return this;
    }
}
