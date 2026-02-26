import { Container } from "./lib/components/Container";
import { Text } from "./lib/components/Text";
import { View } from "./lib/core/View";

export { bootstrap, render } from "./lib/core/render";

export class MainView extends View {
    public render(): View {
        return new Container(
            new Text("Hello World")
        );
    }
}
