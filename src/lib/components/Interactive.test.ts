import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";
import { TextField } from "./TextField";

describe("Interactive Components", () => {
    describe("Button", () => {
        it("should render a button with text", () => {
            const btn = new Button("Click me");
            const el = btn.build();
            expect(el.tagName).toBe("BUTTON");
            expect(el.textContent).toBe("Click me");
        });

        it("should call onClick handler", async () => {
            const handler = vi.fn();
            const btn = new Button("Click me", handler);
            const el = btn.build();
            el.click();
            expect(handler).toHaveBeenCalled();
        });
    });

    describe("TextField", () => {
        it("should render an input with placeholder", () => {
            const field = new TextField("Search", "initial", () => { });
            const container = field.build();
            const el = container.querySelector("input") as HTMLInputElement;
            expect(el).toBeDefined();
            expect(el.tagName).toBe("INPUT");
            expect(el.placeholder).toBe("Search");
            expect(el.value).toBe("initial");
        });

        it("should call onValueChange when input changes", () => {
            const handler = vi.fn();
            const field = new TextField("Search", "", handler);
            const container = field.build();
            const el = container.querySelector("input") as HTMLInputElement;

            el.value = "new value";
            el.dispatchEvent(new Event("input"));

            expect(handler).toHaveBeenCalledWith("new value");
        });
    });
});
