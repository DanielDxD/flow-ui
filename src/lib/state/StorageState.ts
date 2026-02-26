import { State } from "./State";

export class StorageState<T> extends State<T> {
    private key: string;
    private storage: Storage;

    public constructor(key: string, defaultValue: T, storage: Storage) {
        // Try to load initial value from storage
        const storedValue = storage.getItem(key);
        let initialValue = defaultValue;

        if (storedValue !== null) {
            try {
                initialValue = JSON.parse(storedValue);
            } catch (e) {
                console.error(`Error parsing stored value for key "${key}":`, e);
                initialValue = defaultValue;
            }
        }

        super(initialValue);
        this.key = key;
        this.storage = storage;

        // Ensure initial sync if it didn't exist in storage
        if (storedValue === null) {
            this.save();
        }
    }

    public override notify(): void {
        this.save();
        super.notify();
    }

    private save(): void {
        try {
            const valueToStore = JSON.stringify(this.value);
            this.storage.setItem(this.key, valueToStore);
        } catch (e) {
            console.error(`Error saving value to storage for key "${this.key}":`, e);
        }
    }
}
