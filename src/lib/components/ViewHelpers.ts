import { View } from "../core/View";

/**
 * Renders a list of items into a flat array of Views using a mapping function.
 * Analogous to SwiftUI's ForEach.
 *
 * @example
 * new VStack(ForEach(["A", "B", "C"], (item) => new Text(item)))
 */
export function ForEach<T>(
    items: T[],
    builder: (item: T, index: number) => View
): View[] {
    return items.map((item, index) => builder(item, index));
}

/**
 * Returns the `then` View if condition is true, otherwise `otherwise` (or nothing).
 * Analogous to SwiftUI's `if` inside a view body.
 *
 * @example
 * ...If(this.isLoggedIn, new Text("Welcome!"), new Text("Please log in"))
 */
export function If(
    condition: boolean,
    then: View,
    otherwise?: View
): View[] {
    if (condition) return [then];
    if (otherwise) return [otherwise];
    return [];
}
