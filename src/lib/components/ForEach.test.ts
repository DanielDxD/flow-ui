import { describe, expect, it, vi } from "vitest";
import { View } from "../core/View";
import { ForEach } from "./ForEach";

class MockItemView extends View {
    public id: number;
    public renderCount = 0;

    public constructor(id: number) {
        super();
        this.id = id;
    }

    public render() {
        this.renderCount++;
        const el = document.createElement("div");
        el.id = `item-${this.id}`;
        el.textContent = `Item ${this.id}`;
        return el;
    }
}

describe("ForEach", () => {
    it("should render a list of items", () => {
        const items = [1, 2, 3];
        const forEach = new ForEach(items, (id) => new MockItemView(id));

        const el = forEach.build();
        expect(el.children.length).toBe(3);
        expect(el.children[0].id).toBe("item-1");
    });

    it("should reuse View instances when keys are provided", () => {
        const items = [1, 2];
        const builder = vi.fn((id) => new MockItemView(id));

        const forEach = new ForEach(items, builder, (id) => id);

        // First render
        const elInitial = forEach.build();
        document.body.appendChild(elInitial);

        expect(builder).toHaveBeenCalledTimes(2);

        // Update items (simulate state change by personing a different array to a new ForEach or updating internal state)
        // In ForEach.ts, render() uses this.items. So we update this.items and call rebuild()
        (forEach as unknown as { items: number[] }).items = [2, 1]; // Reordered
        (forEach as unknown as { rebuild: () => void }).rebuild();

        // Builder should NOT have been called again for the same IDs
        expect(builder).toHaveBeenCalledTimes(2);

        const el = forEach.element!;
        // With Fragment (display: contents), the children are direct descendants of the container
        expect(el.children[0].id).toBe("item-2");
        expect(el.children[1].id).toBe("item-1");
    });

    it("should create new Views for new items", () => {
        const items = [1];
        const builder = vi.fn((id) => new MockItemView(id));
        const forEach = new ForEach(items, builder, (id) => id);

        const elInitial = forEach.build();
        document.body.appendChild(elInitial);

        expect(builder).toHaveBeenCalledTimes(1);

        (forEach as unknown as { items: number[] }).items = [1, 2];
        (forEach as unknown as { rebuild: () => void }).rebuild();

        expect(builder).toHaveBeenCalledTimes(2); // One new call for id 2
    });
});
