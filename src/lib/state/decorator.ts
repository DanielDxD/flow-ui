
import { State } from "./State";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AppState<T>(target: any, propertyKey: string): void {
    // Define a hidden property key to store the actual State instance
    const privateKey = `_${propertyKey}`;

    Object.defineProperty(target, propertyKey, {
        get() {
            // If the State instance exists, return its inner value so it looks like a primitive
            if (this[privateKey]) {
                return this[privateKey].value;
            }
            return undefined;
        },
        set(newValue: T) {
            // First time initialization (when the class property is instantiated)
            if (!this[privateKey]) {
                const stateInstance = new State(newValue);
                this[privateKey] = stateInstance;

                // If this is a View, register it to re-render on state change
                // We'll add an internal method to View: _registerState
                if (typeof this._registerState === "function") {
                    this._registerState(stateInstance);
                }
            } else {
                // Subsequent updates -> update the State instance's value, which triggers subscribers
                this[privateKey].value = newValue;
            }
        },
        enumerable: true,
        configurable: true
    });
}
