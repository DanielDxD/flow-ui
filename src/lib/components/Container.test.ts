import { describe, expect, it } from "vitest";
import { View } from "../core/View";
import { Container } from "./Container";

class MockChild extends View {
    public render() {
        const el = document.createElement("span");
        el.textContent = "Child";
        return el;
    }
}

describe("Container", () => {
    it("should render its children", () => {
        const child1 = new MockChild();
        const child2 = new MockChild();
        const container = new Container([child1, child2]);

        const el = container.build();
        expect(el.children.length).toBe(2);
        expect(el.children[0].tagName).toBe("SPAN");
    });

    it("should handle a single child", () => {
        const child = new MockChild();
        const container = new Container(child);

        const el = container.build();
        expect(el.children.length).toBe(1);
    });
});
