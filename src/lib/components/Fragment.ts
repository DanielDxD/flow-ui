import { View } from "../core/View";
import { Container } from "./Container";

/**
 * A container that doesn't add structural styling, used to group multiple views.
 * To minimize DOM impact, it uses display: contents.
 */
export class Fragment extends Container {
    public constructor(children: View | View[]) {
        super(children);
        this._styles.display = "contents";
    }
}
