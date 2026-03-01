import { describe, expect, it } from "vitest";
import { View } from "../core/View";
import { AppState } from "./decorator";

class MockView extends View {
    @AppState public count = 0;

    public render() {
        const el = document.createElement("div");
        el.textContent = `Count: ${this.count}`;
        return el;
    }
}

describe("@AppState Decorator", () => {
    it("should make a property reactive", () => {
        const view = new MockView();
        expect(view.count).toBe(0);

        view.count = 10;
        expect(view.count).toBe(10);
    });

    it("should trigger rebuild when state changes", () => {
        const view = new MockView();
        const element = view.build();
        expect(element.textContent).toBe("Count: 0");

        const parent = document.createElement("div");
        parent.appendChild(element);

        view.count = 5;
        expect(parent.firstChild?.textContent).toBe("Count: 5");
    });
});
