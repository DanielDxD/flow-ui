import { describe, expect, it, vi } from "vitest";
import { State } from "./State";

describe("State", () => {
    it("should initialize with the given value", () => {
        const state = new State(10);
        expect(state.value).toBe(10);
    });

    it("should notify subscribers when value changes", () => {
        const state = new State(10);
        const subscriber = vi.fn();
        state.subscribe(subscriber);

        state.value = 20;
        expect(subscriber).toHaveBeenCalledWith(20);
        expect(state.value).toBe(20);
    });

    it("should handle deep reactivity for objects", () => {
        const state = new State({ a: 1, b: { c: 2 } });
        const subscriber = vi.fn();
        state.subscribe(subscriber);

        state.value.b.c = 3;
        expect(subscriber).toHaveBeenCalled();
        expect(state.value.b.c).toBe(3);
    });

    it("should handle deep reactivity for arrays", () => {
        const state = new State([1, 2, 3]);
        const subscriber = vi.fn();
        state.subscribe(subscriber);

        state.value.push(4);
        expect(subscriber).toHaveBeenCalled();
        expect(state.value).toContain(4);
    });

    it("should not notify if value is the same", () => {
        const state = new State(10);
        const subscriber = vi.fn();
        state.subscribe(subscriber);

        state.value = 10;
        expect(subscriber).not.toHaveBeenCalled();
    });

    it("should unsubscribe correctly", () => {
        const state = new State(10);
        const subscriber = vi.fn();
        const unsubscribe = state.subscribe(subscriber);

        unsubscribe();
        state.value = 20;
        expect(subscriber).not.toHaveBeenCalled();
    });
});
