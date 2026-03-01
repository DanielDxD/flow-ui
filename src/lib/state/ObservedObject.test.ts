import { describe, expect, it } from "vitest";
import { View } from "../core/View";
import { AppState, ObservedObject } from "./decorator";

class CounterViewModel {
    @AppState public count = 0;
    public title = "Static";

    public increment() {
        this.count++;
    }
}

class ObservedView extends View {
    @ObservedObject public vm = new CounterViewModel();
    public renderCount = 0;

    public render() {
        this.renderCount++;
        const el = document.createElement("div");
        el.textContent = `${this.vm.title}: ${this.vm.count}`;
        return el;
    }
}

describe("@ObservedObject Decorator", () => {
    it("should trigger re-render when @AppState property in ObservedObject changes", () => {
        const view = new ObservedView();
        const el = view.build();
        expect(el.textContent).toBe("Static: 0");
        expect(view.renderCount).toBe(1);

        // Simulate being in DOM for rebuild
        const parent = document.createElement("div");
        parent.appendChild(el);

        view.vm.count = 1;
        // After state update, rebuild should have been triggered
        expect(parent.firstChild?.textContent).toBe("Static: 1");
        expect(view.renderCount).toBe(2);
    });

    it("should NOT trigger re-render when non-decorated property in ObservedObject changes", () => {
        const view = new ObservedView();
        const el = view.build();
        expect(view.renderCount).toBe(1);

        const parent = document.createElement("div");
        parent.appendChild(el);

        view.vm.title = "Changed";
        // Title is not @AppState, so no rebuild
        expect(view.renderCount).toBe(1);
        expect(parent.firstChild?.textContent).toBe("Static: 0");
    });

    it("should work with methods that update state", () => {
        const view = new ObservedView();
        const el = view.build();

        const parent = document.createElement("div");
        parent.appendChild(el);

        view.vm.increment();
        expect(parent.firstChild?.textContent).toBe("Static: 1");
        expect(view.renderCount).toBe(2);
    });

    it("should handle new object assignment", () => {
        const view = new ObservedView();
        const el = view.build();

        const parent = document.createElement("div");
        parent.appendChild(el);

        const newVm = new CounterViewModel();
        newVm.count = 10;
        newVm.title = "New";

        view.vm = newVm;
        // Assigning a new VM registers its states.
        // Changing the new VM's state now triggers a rebuild:
        newVm.count = 11;
        expect(parent.firstChild?.textContent).toBe("New: 11");
    });
});
