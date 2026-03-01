import { View } from "../core/View";
import { ForEach as ForEachView } from "./ForEach";

/**
 * A helper that returns a ForEach component.
 * Analogous to SwiftUI's ForEach.
 *
 * @example
 * new VStack([
 *   ForEach(["A", "B", "C"], (item) => new Text(item))
 * ])
 */
export function ForEach<T>(
    items: T[],
    builder: (item: T, index: number) => View,
    keySelector?: (item: T, index: number) => string | number
): ForEachView<T> {
    return new ForEachView<T>(items, builder, keySelector);
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
