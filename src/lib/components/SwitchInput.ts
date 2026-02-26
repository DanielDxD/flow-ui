import { Checkbox } from "./Checkbox";

export class SwitchInput extends Checkbox {
    public render(): HTMLElement {
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.justifyContent = "space-between";
        container.style.width = "100%";
        container.style.padding = "4px 0";

        const label = document.createElement("span");
        label.textContent = this.title;
        label.style.fontSize = "16px";
        label.style.color = "#374151";

        const switchTrack = document.createElement("div");
        switchTrack.style.width = "48px";
        switchTrack.style.height = "24px";
        switchTrack.style.borderRadius = "12px";
        switchTrack.style.backgroundColor = this.isOn ? "#3b82f6" : "#d1d5db";
        switchTrack.style.position = "relative";
        switchTrack.style.transition = "background-color 0.2s";
        switchTrack.style.cursor = "pointer";

        const switchThumb = document.createElement("div");
        switchThumb.style.width = "20px";
        switchThumb.style.height = "20px";
        switchThumb.style.borderRadius = "50%";
        switchThumb.style.backgroundColor = "white";
        switchThumb.style.position = "absolute";
        switchThumb.style.top = "2px";
        switchThumb.style.left = this.isOn ? "26px" : "2px";
        switchThumb.style.transition = "left 0.2s";
        switchThumb.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";

        switchTrack.appendChild(switchThumb);

        switchTrack.addEventListener("click", () => {
            this.onValueChange(!this.isOn);
        });

        container.appendChild(label);
        container.appendChild(switchTrack);

        return container;
    }
}
