import { StorageState } from "./StorageState";

function createStorageDecorator(key: string, storage: Storage) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (target: any, propertyKey: string): void {
        const privateKey = `_${propertyKey}`;

        Object.defineProperty(target, propertyKey, {
            get() {
                if (this[privateKey]) {
                    return this[privateKey].value;
                }
                return undefined;
            },
            set(newValue) {
                if (!this[privateKey]) {
                    const storageInstance = new StorageState(key, newValue, storage);
                    this[privateKey] = storageInstance;

                    if (typeof this._registerState === "function") {
                        this._registerState(storageInstance);
                    }
                } else {
                    this[privateKey].value = newValue;
                }
            },
            enumerable: true,
            configurable: true
        });
    };
}

export function AppStorage(key: string) {
    return createStorageDecorator(key, localStorage);
}

export function SessionStorage(key: string) {
    return createStorageDecorator(key, sessionStorage);
}
