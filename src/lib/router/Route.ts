import { View } from "../core/View";

/**
 * Defines a mapping between a URL path and a View builder.
 */
export class Route {
    public path: string;
    public builder: () => View;

    public constructor(path: string, builder: () => View) {
        this.path = path;
        this.builder = builder;
    }
}
