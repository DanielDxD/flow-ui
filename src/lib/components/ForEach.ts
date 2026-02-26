import { View } from "../core/View";
import { Fragment } from "./Fragment";

/**
 * A component that renders a list of items using a template builder.
 *
 * @example
 * new ForEach(this.items, (item) => new Text(item))
 */
export class ForEach<T> extends View {
    private items: T[];
    private builder: (item: T, index: number) => View;

    public constructor(items: T[], builder: (item: T, index: number) => View) {
        super();
        this.items = items;
        this.builder = builder;
    }

    public render(): View {
        const children = this.items.map((item, index) => this.builder(item, index));
        return new Fragment(children);
    }
}
