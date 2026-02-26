export type Subscriber<T> = (value: T) => void;

/**
 * Wraps an object in a deep Proxy so mutations on nested properties
 * automatically call the provided `notify` callback.
 */

function makeReactive<T extends object>(value: T, notify: () => void): T {
    return new Proxy(value, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set(target: any, prop: string | symbol, newVal: any): boolean {
            const oldVal = target[prop];
            // Recursively wrap nested objects
            target[prop] = (typeof newVal === "object" && newVal !== null)
                ? makeReactive(newVal, notify)
                : newVal;
            // Only notify if the value actually changed
            if (!Object.is(oldVal, newVal)) {
                notify();
            }
            return true;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        get(target: any, prop: string | symbol): any {
            const val = target[prop];
            // Recursively wrap nested objects at read time
            if (typeof val === "object" && val !== null && !val.__reactive) {
                return makeReactive(val, notify);
            }
            return val;
        }
    });
}

export class State<T> {
    private _value: T;
    private subscribers: Set<Subscriber<T>> = new Set();

    public constructor(initialValue: T) {
        this._value = this.wrap(initialValue);
    }

    private wrap(value: T): T {
        if (typeof value === "object" && value !== null) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return makeReactive(value as any, () => this.notify()) as T;
        }
        return value;
    }

    public get value(): T {
        return this._value;
    }

    public set value(newValue: T) {
        const wrapped = this.wrap(newValue);
        if (this._value !== wrapped) {
            this._value = wrapped;
            this.notify();
        }
    }

    public subscribe(callback: Subscriber<T>): () => void {
        this.subscribers.add(callback);
        return () => {
            this.subscribers.delete(callback);
        };
    }

    public notify(): void {
        for (const subscriber of this.subscribers) {
            subscriber(this._value);
        }
    }
}
