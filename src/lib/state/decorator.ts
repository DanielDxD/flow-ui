/* eslint-disable @typescript-eslint/no-explicit-any */
import { State } from "./State";

const STATES_KEY = "__states";


export function AppState<T>(target: any, propertyKey: string): void {
    const privateKey = `_${propertyKey}`;

    Object.defineProperty(target, propertyKey, {
        get() {
            if (this[privateKey]) {
                return this[privateKey].value;
            }
            return undefined;
        },
        set(newValue: T) {
            if (!this[privateKey]) {
                const stateInstance = new State(newValue);
                this[privateKey] = stateInstance;

                // Track all State instances on this object
                if (!this[STATES_KEY]) {
                    this[STATES_KEY] = new Set<State<unknown>>();
                }
                this[STATES_KEY].add(stateInstance);

                // If this is a View, register it to re-render on state change
                if (typeof this._registerState === "function") {
                    this._registerState(stateInstance);
                }
            } else {
                this[privateKey].value = newValue;
            }
        },
        enumerable: true,
        configurable: true
    });
}

/**
 * Decorator for ViewModels or objects that contain @AppState properties.
 * When used on a View's property, it automatically subscribes the View 
 * to all @AppState properties within the observed object.
 */

export function ObservedObject(target: any, propertyKey: string): void {
    const privateKey = `_${propertyKey}`;

    Object.defineProperty(target, propertyKey, {
        get() {
            return this[privateKey];
        },
        set(newValue: any) {
            this[privateKey] = newValue;

            // When a new object is assigned, if it has @AppState states,
            // and the target is a View, register all those states.
            if (newValue && newValue[STATES_KEY] && typeof this._registerState === "function") {
                const states = newValue[STATES_KEY] as Set<State<any>>;
                for (const state of states) {
                    this._registerState(state);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
}
