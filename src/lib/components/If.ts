import { View } from "../core/View";
import { Fragment } from "./Fragment";

/**
 * A component that conditionally renders one of two views.
 *
 * @example
 * new If(this.isLoggedIn, new Text("Welcome"), new Text("Log In"))
 */
export class If extends View {
    private condition: boolean;
    private thenView: View;
    private otherwiseView?: View;

    public constructor(condition: boolean, thenView: View, otherwiseView?: View) {
        super();
        this.condition = condition;
        this.thenView = thenView;
        this.otherwiseView = otherwiseView;
    }

    public render(): View | HTMLElement {
        if (this.condition) {
            return this.thenView;
        } else if (this.otherwiseView) {
            return this.otherwiseView;
        }
        // Return an empty Fragment if no condition is met
        return new Fragment([]);
    }
}
