import { Button } from "../lib/components/Button";
import { HStack } from "../lib/components/HStack";
import { Text } from "../lib/components/Text";
import { View } from "../lib/core/View";
import { AppState, ObservedObject } from "../lib/state/decorator";

class CounterButtonViewModel {
    @AppState public count: number;

    public constructor(initialCount = 0) {
        this.count = initialCount;
    }

    public increment() {
        this.count++;
    }

    public decrement() {
        this.count--;
    }
}
export class CounterButton extends View {
    @ObservedObject private viewModel: CounterButtonViewModel;

    public constructor(initialCount = 0) {
        super();
        this.viewModel = new CounterButtonViewModel(initialCount);
    }

    public render(): View {
        return new HStack([
            new Button("-", () => {
                this.viewModel.decrement();
            })
                .padding("10px 20px")
                .fontSize(20)
                .backgroundColor("#f0f0f0")
                .cornerRadius(8),

            new Text(`${this.viewModel.count}`)
                .fontSize(24)
                .fontWeight("bold")
                .padding("0 16px"),

            new Button("+", () => {
                this.viewModel.increment();
            })
                .padding("10px 20px")
                .fontSize(20)
                .backgroundColor("#3f2574")
                .color("#fff")
                .cornerRadius(8),
        ])
            .alignItems("center")
            .padding(16)
            .backgroundColor("#f8f7f1")
            .cornerRadius(12);
    }
}
