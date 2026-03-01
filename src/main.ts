import { CounterButton } from "./components/CounterButton";
import { View } from "./lib/core/View";

export { bootstrap, render } from "./lib/core/render";

export class MainView extends View {
    public render(): View {
        return new CounterButton(0);
    }
}
