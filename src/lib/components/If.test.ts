import { describe, expect, it } from "vitest";
import { View } from "../core/View";
import { If } from "./If";

class MockView extends View {
    private label: string;
    public constructor(label: string) {
        super();
        this.label = label;
    }
    public render() {
        const el = document.createElement("div");
        el.textContent = this.label;
        return el;
    }
}

describe("If", () => {
    it("should render the 'then' view if condition is true", () => {
        const thenView = new MockView("True");
        const otherwiseView = new MockView("False");
        const ifComp = new If(true, thenView, otherwiseView);

        const el = ifComp.build();
        expect(el.textContent).toBe("True");
    });

    it("should render the 'otherwise' view if condition is false", () => {
        const thenView = new MockView("True");
        const otherwiseView = new MockView("False");
        const ifComp = new If(false, thenView, otherwiseView);

        const el = ifComp.build();
        expect(el.textContent).toBe("False");
    });

    it("should render an empty Fragment if false and no otherwise view provided", () => {
        const thenView = new MockView("True");
        const ifComp = new If(false, thenView);

        const el = ifComp.build();
        expect(el.innerHTML).toBe(""); // Fragment (display: contents) child list check
        expect(el.style.display).toBe("contents");
    });
});
