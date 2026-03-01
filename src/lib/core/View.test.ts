import { beforeEach, describe, expect, it } from "vitest";
import { View } from "./View";

class SimpleView extends View {
    public render() {
        return document.createElement("div");
    }
}

describe("View", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
    });

    it("should build and return an HTMLEelement", () => {
        const view = new SimpleView();
        const el = view.build();
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it("should apply styles via modifiers", () => {
        const view = new SimpleView()
            .padding(10)
            .margin("20px")
            .backgroundColor("red")
            .color("blue");

        const el = view.build();
        expect(el.style.padding).toBe("10px");
        expect(el.style.margin).toBe("20px");
        expect(el.style.backgroundColor).toBe("red");
        expect(el.style.color).toBe("blue");
    });

    it("should apply classes via modifiers", () => {
        const view = new SimpleView().cssClass("my-class");
        const el = view.build();
        expect(el.classList.contains("my-class")).toBe(true);
    });

    it("should handle ID-based focus restoration during rebuild", () => {
        class FocusView extends View {
            public render() {
                const input = document.createElement("input");
                input.id = "test-input";
                return input;
            }
        }

        const view = new FocusView();
        const el = view.build();
        document.body.appendChild(el);

        el.focus();
        expect(document.activeElement).toBe(el);

        // Manually trigger rebuild (simulating state change)
        // Since rebuild is private, we'll use a public method that triggers it or simulate the state registration
        (view as unknown as { rebuild: () => void }).rebuild();

        // After rebuild, the element is new but the ID should have been used to restore focus
        const newEl = document.getElementById("test-input");
        expect(newEl).not.toBe(el);
        expect(document.activeElement).toBe(newEl);
    });
});
