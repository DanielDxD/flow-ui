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
    private keySelector?: (item: T, index: number) => string | number;
    private viewCache: Map<string | number, View> = new Map();

    public constructor(
        items: T[],
        builder: (item: T, index: number) => View,
        keySelector?: (item: T, index: number) => string | number
    ) {
        super();
        this.items = items;
        this.builder = builder;
        this.keySelector = keySelector;
    }

    public render(): View {
        const nextCache = new Map<string | number, View>();

        const children = this.items.map((item, index) => {
            const key = this.keySelector ? this.keySelector(item, index) : index;

            // Try to reuse view from previous render
            let view = this.viewCache.get(key);

            if (!view) {
                // Not in cache, create new one
                view = this.builder(item, index);
                if (this.keySelector) {
                    view.key(key);
                }
            }

            nextCache.set(key, view);
            return view;
        });

        // Update cache for next render
        this.viewCache = nextCache;

        return new Fragment(children);
    }
}
