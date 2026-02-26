import { State } from "../state/State";

export abstract class View {
    protected _element: HTMLElement | null = null;
    protected _styles: Partial<CSSStyleDeclaration> = {};
    protected _classes: Set<string> = new Set();
    protected _events: Record<string, EventListener> = {};

    // Internal state tracking
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _states: Set<State<any>> = new Set();
    private _unsubscribers: Array<() => void> = [];

    // Lifecycle
    private _onAppearHandler: (() => void) | null = null;
    private _onDisappearHandler: (() => void) | null = null;
    private _lifecycleObserver: MutationObserver | null = null;
    private _wasInDOM: boolean = false;
    private _hasAppeared: boolean = false;

    /**
     * The core rendering logic. Must be implemented by specific components.
     * Some components might compose other views, some might return raw HTMLElement.
     */
    public abstract render(): HTMLElement | View;

    /**
     * Renders the View and applies the chained styles and events
     */
    public build(): HTMLElement {
        this._lifecycleObserver?.disconnect();
        this._lifecycleObserver = null;

        const rendered = this.render();
        if (rendered instanceof View) {
            this._element = rendered.build();
        } else {
            this._element = rendered;
        }
        this.applyStyles();
        this.applyClasses();
        this.applyEvents();
        this._setupLifecycleObserver();
        return this._element;
    }

    /**
     * Internal method called by @State decorator to register a state dependency
     */
    public _registerState<T>(state: State<T>): void {
        if (!this._states.has(state)) {
            this._states.add(state);
            const unsubscribe = state.subscribe(() => this.rebuild());
            this._unsubscribers.push(unsubscribe);
        }
    }

    /**
     * Minimal re-render logic. Swaps the internal DOM node in-place.
     */
    private rebuild(): void {
        if (!this._element || !this._element.parentNode) {
            // If the element isn't in the DOM yet, just rebuild it normally
            this.build();
            return;
        }

        // --- Save Focus State ---
        const activeEl = document.activeElement as HTMLElement;
        const activeId = activeEl?.id;
        let selectionStart: number | null = null;
        let selectionEnd: number | null = null;

        if (activeEl instanceof HTMLInputElement || activeEl instanceof HTMLTextAreaElement) {
            selectionStart = activeEl.selectionStart;
            selectionEnd = activeEl.selectionEnd;
        }

        const oldElement = this._element;
        const newElement = this.build(); // Rebuilds the UI with new state

        // Replace the element in the actual DOM
        if (oldElement.parentNode && oldElement !== newElement) {
            oldElement.parentNode.replaceChild(newElement, oldElement);
        }

        // --- Restore Focus State ---
        if (activeId) {
            const elToFocus = document.getElementById(activeId);
            if (elToFocus) {
                elToFocus.focus();
                if (elToFocus instanceof HTMLInputElement || elToFocus instanceof HTMLTextAreaElement) {
                    if (selectionStart !== null && selectionEnd !== null) {
                        elToFocus.setSelectionRange(selectionStart, selectionEnd);
                    }
                }
            }
        }
    }

    private applyStyles(): void {
        if (!this._element) return;
        for (const [key, value] of Object.entries(this._styles)) {
            if (value !== undefined) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (this._element.style as any)[key] = value;
            }
        }
    }

    private applyClasses(): void {
        if (!this._element) return;
        this._element.classList.add(...Array.from(this._classes));
    }

    private applyEvents(): void {
        if (!this._element) return;
        for (const [event, listener] of Object.entries(this._events)) {
            this._element.addEventListener(event, listener);
        }
    }

    public get element(): HTMLElement | null {
        return this._element;
    }

    // --- Lifecycle Modifiers ---

    /**
     * Called when the component is inserted into the DOM.
     */
    public onAppear(handler: () => void): this {
        this._onAppearHandler = handler;
        return this;
    }

    /**
     * Called when the component is removed from the DOM.
     */
    public onDisappear(handler: () => void): this {
        this._onDisappearHandler = handler;
        return this;
    }

    private _setupLifecycleObserver(): void {
        if (!this._element) return;
        if (!this._onAppearHandler && !this._onDisappearHandler) return;

        const el = this._element;
        this._wasInDOM = document.contains(el);

        this._lifecycleObserver = new MutationObserver(() => {
            const inDOM = document.contains(el);
            if (inDOM && !this._wasInDOM) {
                this._wasInDOM = true;
                if (!this._hasAppeared) {
                    this._hasAppeared = true;
                    this._onAppearHandler?.();
                }
            } else if (!inDOM && this._wasInDOM) {
                this._wasInDOM = false;
                this._hasAppeared = false;
                this._onDisappearHandler?.();
            }
        });

        this._lifecycleObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    // --- Core Modifiers ---

    public padding(value: number | string): this {
        this._styles.padding = typeof value === "number" ? `${value}px` : value;
        return this;
    }

    public margin(value: number | string): this {
        this._styles.margin = typeof value === "number" ? `${value}px` : value;
        return this;
    }

    public width(value: number | string): this {
        this._styles.width = typeof value === "number" ? `${value}px` : value;
        return this;
    }

    public height(value: number | string): this {
        this._styles.height = typeof value === "number" ? `${value}px` : value;
        return this;
    }

    public fillMaxWidth(): this {
        this._styles.width = "100%";
        return this;
    }

    public fillMaxHeight(): this {
        this._styles.height = "100%";
        return this;
    }

    public fillMaxSize(): this {
        this._styles.width = "100%";
        this._styles.height = "100%";
        return this;
    }

    public backgroundColor(color: string): this {
        this._styles.backgroundColor = color;
        return this;
    }

    public color(color: string): this {
        this._styles.color = color;
        return this;
    }

    public border(value: string): this {
        this._styles.border = value;
        return this;
    }

    public cornerRadius(value: number | string): this {
        this._styles.borderRadius = typeof value === "number" ? `${value}px` : value;
        return this;
    }

    public fontSize(size: number | string): this {
        this._styles.fontSize = typeof size === "number" ? `${size}px` : size;
        return this;
    }

    public fontWeight(weight: string | number): this {
        this._styles.fontWeight = weight.toString();
        return this;
    }

    public cssClass(className: string): this {
        this._classes.add(className);
        return this;
    }

    // --- Event Modifiers ---

    public onTap(handler: (e: MouseEvent) => void): this {
        this._events["click"] = handler as EventListener;
        return this;
    }
}
